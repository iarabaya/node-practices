const employeeList = [
  {
    id: 1,
    name: 'Iara'
  },
  {
    id: 2,
    name: 'Mai'
  },
  {
    id: 3,
    name: 'Luis'
  }
];

const salaryList = [
  {
    id: 1,
    salary: 1000
  },
  {
    id: 2,
    salary: 1500
  }
];

// const getEmployee = (id, callback) =>{
//   const employee = employeeList.find((e)=> e.id === id)?.name;

//   if( employee ){
//     callback(null, employee);
//   }else{
//     callback(`Employee with id ${ id } doesn't exist`);
//   }
// }

// if( employee ){
 //   resolve(employee);
 // } else{
  //  reject(`The employee with id ${id} doesn't exist`);
 // }

const getEmployee = (id, callback) =>{
  return new Promise( ( resolve, reject ) =>{ 
    const employee = employeeList.find((e)=> e.id === id)?.name;
    ( employee ) ? resolve(employee) : reject(`The employee with id ${id} doesn't exist`);

  } );
}

const getSalary = () => {
  return new Promise (( resolve, reject ) =>{
    const salary = salaryList.find( e => e.id === id )?.salary;
    ( salary ) ? resolve(salary) : reject(`The salary of employee with id ${id} is not registered`);
  })
}


const id = 1;
let nombre;

//promesas en cadena
getEmployee(id)
  .then( employee => {
    nombre = employee;
    return getSalary( id )
  })
  .then( salary => console.log(`The employee ${nombre} has a salary of ${salary}`))
  .catch(err => console.log(err));

//promesas separadas
// getEmpleado(id)
//   .then(employee => console.log( employee ))
//   .catch( err => console.log(err));

// getSalary(id)
//   .then( salary => console.log(salary))
//   .catch( err => console.log(err));

//en cadena no recomendado
// getEmpleado(id)
//   .then( employee =>{
//     getSalary(id)
//       .then( salary => {
//         console.log( `the employee ${employee} has a salary of ${salary}`);
//       }).catch( err => console.log(err));
//   }
// ).catch( err => console.log(err));