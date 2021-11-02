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

  loadTodosFromArray( todos = [] ){
    todos.forEach( todo => { 
      this._list[todo.id] = todo;
    });
  }

  createTodo( desc = ''){
    const todo = new Todo( desc );
    this._list[todo.id] = todo;
  }


  completeList(){
    this.arrList.forEach( (todo, i) =>{
      const index = i + 1;
      todo.completed ?
      console.log(`${index} ${todo.description} :: Completed`.green) : console.log(`${index} ${todo.description} :: Unfinished`.red);
    })
  }
}

module.exports = Todos;