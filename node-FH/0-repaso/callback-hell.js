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

const getEmployee = ( id, callback ) => {
  const employee = employeeList.find((e) => e.id === id)?.name
  if( employee ){
    callback(null, employee);
  }else{
    callback(`Employee with id ${ id } doesn't exist`);
  }
  
};

const getSalary = (id, callback) =>{
  const salary = salaryList.find((e) => e.id === id)?.salary;
  if(salary){
    callback(null, salary);
  }else{
    callback(`That salary doesn't exist`);
  }
}


const id = 3;

getEmployee(id, (err, employee)=>{
  if (err){
    console.log('ERROR!')
    return console.log(err);
  }
  // console.log('Employee exists!');
  // console.log(employee.name);
  
  getSalary(id, (err, salary)=>{
    if(err){
      return console.log(err);
    }
    console.log(`The employee ${employee} has a salary of ${salary}`);
  })

});



