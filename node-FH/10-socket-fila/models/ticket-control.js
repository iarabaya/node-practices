const path = require('path');
const fs = require('fs');

class TicketControl {

  constructor(){
    this.last = 0;
    this.date = new Date().getDate();
    this.tickets = [];
    this.last4 = [];

    this.init();
  }

  get toJson(){
    return {
      last : this.last,
      date: this.date,
      tickets: this.tickets,
      last4: this.last4
    }
  }

  init(){
    const { last, date, tickets, last4} = require('../database/data.json');
    if( date === this.hoy ){
      this.tickets  = tickets;
      this.last = last;
      this.last4 = last4;

    }else{
      //its another day
      this.saveDB();
    }
  }

  saveDB(){

    const dbPath = path.join( __dirname,'../db/data.json' );
    fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );

  }


}


module.exports = TicketControl;