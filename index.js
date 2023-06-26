const inquirer = require('inquirer');
const {spawn} = require('child_process');

const ques = [
  {
    type: 'list',
    name: 'selectedExecuteTool',
    message: 'choose one tool you want to execute',
    choices: ['paintDirectoryStructure']
  }
];

inquirer.prompt(ques).then((res) => {
  spawn('node', [`./toolPlugins/${res.selectedExecuteTool}.js`], {
    stdio: 'inherit',
  });
}).catch(err => console.log(err))