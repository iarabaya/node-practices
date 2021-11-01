const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: '1. Create to-do'
      },
      {
        value: '2',
        name:'2. List all to-dos'
      },
      {
        value: '3',
        name:'3. List completed to-dos'
      },
      {
        value: '4',
        name:'4. List unfinished to-dos'
      },
      {
        value: '5',
        name:'5. Complete to-do(s)'
      },
      {
        value: '6',
        name:'6. Delete to-dos'
      },
      {
        value: '0',
        name:'0. Exit'
      },
    ]
  }
]

const inquirerMenu = async() =>{
  console.clear();
  console.log('========================='.green);
  console.log('  Seleccione una opción'.yellow);
  console.log('=========================\n'.green);


  const { option } = await inquirer.prompt(questions);

  return option
}

const pause = async () =>{
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.green} to continue\n`
    }
  ];
  console.log('\n');
  await inquirer.prompt(question);
}

const readInput = async ( message ) =>{
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate( value ){
        if ( value.length === 0 ){
          return 'Por favor ingrese un valor'
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

module.exports = {
  inquirerMenu,
  pause,
  readInput
}