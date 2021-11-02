require('colors');

const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Todos = require('./models/todos');
// const Todo = require('./models/todo');
// const { showMenu , pause } = require('./helpers/messages-model');

const main = async() => {

  let opt = '';
  const todos = new Todos();
  const todosDB = readDB();

  if( todosDB ){ // load todos
    todos.loadTodosFromArray( todosDB );
  }

  do {
    // prints menu and options
   opt = await inquirerMenu();

   switch (opt) {
     case '1':
       //create option
       const description = await readInput('Description:');
       todos.createTodo(description);
       break;

     case '2':
       //list options
       todos.completeList()
       break;
   }
   
   saveDB( todos.arrList );
   await pause();
   
  } while( opt !== '0' );
  
}

main();

/*
const todo = new Todo('ir de compras');
todos._list[todo.id] = todo;
console.log (todos);
*/
