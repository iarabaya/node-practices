const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Search city`
      },
      {
        value: 2,
        name: `${'2.'.green} Search history`
      },
      {
        value: 0,
        name: `${'0.'.green} Exit`
      }
    ]
  }
]

const inquirerMenu = async () =>{
  console.clear();
  console.log('======================'.yellow);
  console.log('   Select an option   '.yellow);
  console.log('======================'.yellow);

  const { option } = await inquirer.prompt(questions);
  return option
}

const pause = async () => {
  const question = [
    {
      type:'input',
      name: 'enter',
      message: `Press ${'Enter'.green} to continue\n`
    }
  ];

  console.log('\n');
  await inquirer.prompt(question);
}

const confirm = async ( message ) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
}

const readInput = async ( message ) =>{
  const question =[
    {
      type: 'input',
      name: 'desc',
      message,
      validate ( value ){
        if( value.length === 0){
          return 'Por favor ingrese un valor'
        }
        return true;
      }
    }
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listPlaces = async ( places = [] ) => {
  const choices = places.map( (place, i) =>{
    const idx = `${ i+1 }.`.green;
    return{
      value: place.id,
      name: `${idx} ${place.name}`
    }
  });

  choices.unshift({
    value: '0',
    name:`${'0.'.green} Cancel`
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select a place',
      choices
    }
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
}

const showChecklist = async ( todos = [] ) => {

  const choices = todos.map( (todo, i) => {
    const idx = `${i + 1}.`;
    return {
      value: todo.id,
      name: `${idx.green} ${todo.description}`,
      checked: (todo.completed) ? true : false
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selections',
      choices //: choices
    }
  ]

  const { ids } = await inquirer.prompt(question);

  return ids;
}

module.exports = {
  inquirerMenu,
  pause,
  confirm,
  readInput,
  listPlaces,
  showChecklist
}

