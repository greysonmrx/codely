import { GluegunToolbox } from 'gluegun'
import * as simplegit from 'simple-git/promise'

interface Result {
  types: Array<string>
  name: string
}

module.exports = {
  name: 'init',
  description: 'Create new project with node, reactjs and/or react native',
  run: async (toolbox: GluegunToolbox) => {
    const {
      prompt,
      print: { success, error, info, spin }
    } = toolbox

    const result: Result = await prompt.ask([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the project?'
      },
      {
        type: 'multiselect',
        name: 'types',
        message: 'What do you want to code? (Press space to check)',
        choices: ['Server', 'Web', 'Mobile']
      }
    ])

    const { types, name } = result

    if (types.length === 0) {
      error('You need to select at least one option')
      return
    }

    if (!name) {
      error('Enter a valid name')
      return
    }

    const repositories: Object = {
      Server: 'https://github.com/greysonmrx/node-structure',
      Web: 'https://github.com/greysonmrx/react-structure',
      Mobile: 'https://github.com/greysonmrx/react-native-structure'
    }

    const Git = simplegit()

    const spinner = spin(`Cloning repositories...\n`)
    spinner.start()

    types.map(async (type, index) => {
      try {
        await Git.clone(`${repositories[type]}`, `./${name}/${type}`)

        if (index === types.length - 1) {
          spinner.succeed('All repositories have been successfully cloned')
          info(`Getting started:\n`)
          info(`  cd ${name}`)
          info(`    cd Server && yarn && yarn dev\n`)
          info(`    cd Web && yarn && yarn start\n`)
          info(`    cd Mobile && yarn && npx react-native run-android`)
          success('\n🔥  Happy hacking!')
        }
        return
      } catch (err) {
        spinner.fail('\nCould not create the project')
        return
      }
    })
  }
}
