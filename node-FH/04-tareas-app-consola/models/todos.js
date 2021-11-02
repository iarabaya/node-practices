const Todo = require('./todo');

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

  createTodo( desc = ''){
    const todo = new Todo( desc );
    this._list[todo.id] = todo;
  }
}

module.exports = Todos;