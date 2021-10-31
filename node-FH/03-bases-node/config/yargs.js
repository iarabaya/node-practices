const argv = require('yargs')
              .options({
                'b':{
                  alias: 'base',
                  type: 'number',
                  describe: 'A base number for multiplication table',
                  demandOption: true
                  },
                'l': {
                  alias: 'list',
                  type: 'boolean',
                  default: false,
                  describe: 'Show table in console'
                },
                'h':{
                  alias: 'hasta',
                  type: 'number',
                  default: 10,
                  describe: 'Number limit of the table'
                }
              })
              .check( (argv, options) =>{
                if(isNaN(argv.b)){
                  throw 'The base has to be a number'
                }
                  return true
              }).argv;

module.exports = argv;