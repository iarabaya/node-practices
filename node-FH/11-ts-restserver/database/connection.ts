import { Sequelize } from 'sequelize';

const database = new Sequelize('node','root','', { host: 'localhost', dialect: 'mysql' } );

export default database;