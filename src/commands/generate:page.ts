import { GluegunToolbox } from 'gluegun'

interface Result {
  name: string
  typescript: boolean
}

module.exports = {
  name: 'generate:page',
  description: 'Create new page ReactJS or React Native',
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
        message: 'What is the name of the page?'
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Do you want to create the page using typescript?'
      }
    ])

    const { name, typescript } = result

    if (!name) {
      error('Page name must be specified')
      return
    }

    const spinner = spin('Creating page...')
    spinner.start()

    await template.generate({
      template: typescript ? 'component-typescript.js.ejs' : 'component.js.ejs',
      target: typescript
        ? `src/pages/${name}/index.tsx`
        : `src/pages/${name}/index.js`,
      props: { name }
    })

    const packageJson = await filesystem.read('package.json', 'json')
    const isReactNative = !!packageJson.dependencies['react-native']

    const styleTemplate = isReactNative
      ? 'styles-rn.js.ejs'
      : 'styles-react.js.ejs'

    await template.generate({
      template: styleTemplate,
      target: typescript
        ? `src/pages/${name}/styles.ts`
        : `src/pages/${name}/styles.js`
    })

    spinner.succeed('Page successfully created inside src/pages')

    success('\n🔥  Happy hacking!')
  }
}
