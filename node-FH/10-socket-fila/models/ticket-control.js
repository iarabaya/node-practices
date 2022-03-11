const path = require('path');
const fs = require('fs');

class Ticket{
  constructor(number, desk){
    this.number = number,
    this.desk = desk
  }

}
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

  nextTicket(){
    this.last += 1;
    const ticket =  new Ticket(this.last, null);
    this.tickets.push( ticket );

    this.saveDB();
    return 'Ticket ' + ticket.number;
  }

  attendTicket( desktop ){
    //without tickets
    if( this.tickets.length === 0){
      return null;
    }

    const ticket = this.tickets.shift(); //this.tickets[0];
    ticket.desktop = desktop;

    this.last4.unshift( ticket );

    if( this.last4.length > 4 ){
      this.last4.splice(-1,1);
    }

    this.saveDB();
    return ticket;

  }



}


module.exports = TicketControl;