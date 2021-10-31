const fs = require("fs");
const colors = require('colors');

const createFile = async ( base, list = false, limit = 10 ) =>{

  try {
    
    let output = '';
    let consola = '';
    
    for (let i = 1; i <= limit ; i++) {
      output += `${base} X ${i} = ${base * i}\n`;
      consola += `${base} ${'x'.green } ${i} ${'='.yellow} ${base * i}\n`;
    }
    if( list ){
      console.log('============='.blue);
      console.log('Tabla del ', base);
      console.log('============='.blue);
      console.log(consola);
    }
    
    fs.writeFileSync(`./output/tabla-${base}.txt`, output);
    // console.log(`tabla-${base}.txt created.`);    

    return `tabla-${base}.txt`.green;
    
  } catch (err) {
    throw err;
  }

}

  // fs.writeFile(`tabla-${base}.txt`, output, (err) => {
  //   if (err) throw err;
  //   console.log(`tabla-${base}.txt created.`);
  // })

// createFile: createFile
module.exports = {
  createFile
}