const Todo = require('./todo');
require('colors');

/* model example todo list
_listado: {
  'uuid-asdasd-q12312-asda-eqwe': {
    id: 'uuid-asdasd-q12312-asda-eqwe',
    description: 'asdasda'
    completed: '123123'
  }
}*/

class Todos {

  _list = {};


  get arrList () {
    const list = [];

    Object.keys(this._list).forEach( key => {
      list.push( this._list[key]);
    })

    return list;
  }

  constructor(){
    this._list = {};
  }

  deleteTodo( id = '' ){
    if( this._list[id] ){
      delete this._list[id]
    }
  }

  loadTodosFromArray( todos = [] ){
    todos.forEach( todo => { 
      this._list[todo.id] = todo;
    });
  }

  createTodo( desc = ''){
    const todo = new Todo( desc );
    this._list[todo.id] = todo;
  }


  showCompleteTodoList(){
    this.arrList.forEach( (todo, i) =>{
      const index = `${i + 1}`.green;
      const { description, completed } = todo;
      const state = (completed) ? 'Completed'.green : 'Pending'.red;

      console.log(`${index} ${description} :: ${ state }`)
    })
  }

  showTodoListByState( completed = true ){
    const todosList = completed ? this.arrList.filter(todo => todo.completed ) : this.arrList.filter(todo => todo.completed === null);

    todosList.forEach( (todo, i) =>{
      const index = `${i + 1}.`.green;
      const { description, completed } = todo;
      const state = (completed) ? `${'Completed'.green} in ${todo.completed}` : 'Pending'.red;

      console.log(`${index} ${description} :: ${ state }`);
    })
  }
}

module.exports = Todos;