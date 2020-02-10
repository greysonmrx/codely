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
      print: { success, error, info }
    } = toolbox

    const Git = simplegit()

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

    const repositories = {
      'Server': 'https://github.com/greysonmrx/node-structure',
      'Web': 'https://github.com/greysonmrx/react-structure',
      'Mobile': 'https://github.com/greysonmrx/react-native-structure'
    }

    types.map(async type => {
      try {
        info(`Cloning ${type} repository...`);
      
        await Git.clone(
          `${repositories[type]}`,
          `./${name}/${type}`
        )
  
        success(`${type} repository successfully cloned!`)
        return;
      } catch(err) {
        error('Could not create the project')
        return;
      }      
    })   
  }
}
