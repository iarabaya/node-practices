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

const getEmployee = (id, callback) =>{
  return new Promise( ( resolve, reject ) =>{ 
    const employee = employeeList.find((e)=> e.id === id)?.name;
    ( employee ) ? resolve(employee) : reject(`The employee with id ${id} doesn't exist`);
  });
}

const getSalary = () => {
  return new Promise (( resolve, reject ) =>{
    const salary = salaryList.find( e => e.id === id )?.salary;
    ( salary ) ? resolve(salary) : reject(`The salary of employee with id ${id} is not registered`);
  })
}

const getUserInfo = async ( id ) =>{
  try {
    const employee = await getEmployee(id);
    const salary = await getSalary(id);
    return `the salary of employee ${employee} is ${salary}`;    
  } catch (error) {
    return error;
  }
}

const id = 1;

getUserInfo( id )
  .then( msg => {
    console.log('TODO BIEN')
    console.log( msg )
  })
  .catch( err => {
    console.log('TODO MAL')
    console.log( err )
  });