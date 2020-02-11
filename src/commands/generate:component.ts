import { GluegunToolbox } from 'gluegun'

interface Result {
  name: string,
  typescript: boolean
}

module.exports = {
  name: 'generate:component',
  description: 'Create new component ReactJS or React Native',
  run: async (toolbox: GluegunToolbox) => {
    const {
      template,
      prompt,
      filesystem,
      print: { success, error, spin }
    } = toolbox

    const result: Result = await prompt.ask([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?'
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Do you want to create the component using typescript?'
      }
    ])

    const { name, typescript } = result

    if (!name) {
      error('Component name must be specified')
      return
    }

    const spinner = spin('Creating component...')
    spinner.start()

    await template.generate({
      template: typescript 
                  ? 'component-typescript.js.ejs' 
                  : 'component.js.ejs',
      target: typescript 
                  ? `src/components/${name}/index.tsx`
                  : `src/components/${name}/index.js`,
      props: { name }
    })

    const packageJson = await filesystem.read('package.json', 'json')
    const isReactNative = !!packageJson.dependencies['react-native'];

    const styleTemplate = isReactNative
      ? 'styles-rn.js.ejs'
      : 'styles-react.js.ejs'

    await template.generate({
      template: styleTemplate,
      target: typescript 
                  ? `src/components/${name}/styles.ts`
                  : `src/components/${name}/styles.js`,
    })

    spinner.succeed('Component successfully created inside src/components')

    success('\n🔥  Happy hacking!')
  }
}
