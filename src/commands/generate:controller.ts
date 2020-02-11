import { GluegunToolbox } from 'gluegun'

interface Result {
  name: string
  methods: Array<string>
  es6: boolean
  typescript: boolean
}

module.exports = {
  name: 'generate:controller',
  description: 'Create new controller express',
  run: async (toolbox: GluegunToolbox) => {
    const {
      template,
      prompt,
      print: { success, error, spin }
    } = toolbox

    const result: Result = await prompt.ask([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the controller?'
      },
      {
        type: 'multiselect',
        name: 'methods',
        message: 'What methods do you want to use?',
        choices: ['index', 'show', 'store', 'update', 'destroy']
      },
      {
        type: 'confirm',
        name: 'es6',
        message:
          'Does your project use the JavaScript modules type (import/export)?'
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Do you want to create the controller using typescript?'
      }
    ])

    const { name, methods, es6, typescript } = result

    if (!name) {
      error('Controller name must be specified')
      return
    }

    const spinner = spin('Creating controller...')
    spinner.start()

    await template.generate({
      template: typescript
        ? 'controller-typescript.js.ejs'
        : 'controller.js.ejs',
      target: typescript
        ? `src/app/controllers/${name}.ts`
        : `src/app/controllers/${name}.js`,
      props: { name, es6, methods }
    })

    spinner.succeed(
      'Controller successfully created inside src/app/controllers'
    )

    success('\n🔥  Happy hacking!')
  }
}
