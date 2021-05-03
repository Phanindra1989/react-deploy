import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import swal from "sweetalert";
import Child from "./child.js";
import DatePicker from "react-datepicker";
import * as yup from 'yup';
import {useFormik} from 'formik'






import "react-datepicker/dist/react-datepicker.css";

const DatePickerFunction = () =>
{
  const [selectedDate, setSelectedDate] = useState(null);

const [employee,setEmployeeData] = useState({Name : "Phani", Salary : "100"});

function UpdateState(e)
{
  setEmployeeData({...employee,[e.target.name] : e.target.value});
}
  return (
    <div>

<table>
  <tr>
    <td>
      Employee Name :
    </td>
    <td><input type="text" name="Name" value={employee.Name} onChange={UpdateState}></input></td>
  </tr>
  <tr>
    <td>
      Employee Salary :
    </td>
    <td><input type="text" name="Salary" value={employee.Salary} onChange={UpdateState}></input></td>
  </tr>
  <tr>
    <td>Employee Name : {employee.Name} Employee Salary : {employee.Salary}</td> 
    <td><Salary salary={employee.Salary} onSalaryChange={UpdateState}></Salary></td>
  </tr>
</table>

        {/* <DatePicker
           selected={ selectedDate }
           onChange={ date => setSelectedDate(date) }         
         /> */}
</div>
  );
}

const Salary =({onSalaryChange,salary}) =>
{
  return(
<div>

    <p>
      Employee Salary :
    
    <input type="text" name="Salary" value={salary} onChange={onSalaryChange}></input></p>
  
</div>

  )
}
  

class DemoApp extends Component
{
 constructor(props)
 {
   super(props);
   this.state = {
    empName : '',
    empDetails : '',
    isPermanent : true,
    empType : 1,
    eName : '',
    eType : 2,
    startDate: new Date(),
    employees : []
   }  
 }

 UpdateState = (e) =>
 {
   this.setState({[e.target.name] : e.target.value });
 }

 onButtonClick = () =>
 {
   this.setState({ eName: this.state.empName });
   swal(this.state.empName);
 }

 handleEvent = (e) =>
 {
   this.setState({ empType: e.target.value }, () => {swal(this.state.empType);});
   
 }

 DeleteFieldValue = () =>
 {
   this.setState({ eName: '', empName : '' });   
 }

 ddlChange = (e) =>
 {
  this.setState({ eType: e.target.value }, () => {swal(this.state.eType);});
 }

 handleChange(date) {
  this.setState({
  startDate: date
  })
}

SaveEmployeeInfo = () => {
  let employeeInfo = {
    Id:this.refs.Id.value,
    Name:this.refs.Name.value
  };

fetch('http://localhost:63975/api/Employee',{
method:'POST',
headers : {'Content-type' : 'application/json'},
body: JSON.stringify(employeeInfo)

})
}


  
componentDidMount(){
  fetch('http://localhost:63975/api/Employee')
  .then(response => response.json())
  .then(json => this.setState({employees : json}))
}

 render()
 {
  const {employees,empName} = this.state;
   return (
     <table>
       <tr>
         <td>Emp Name : </td>
         <td><input type="textarea" value={empName} name = "empName" onChange={this.UpdateState}></input></td>
         <td><span>{this.state.eName}</span></td>
         <td><textarea></textarea></td>
         <td><input type='radio' name="empType" value="1" onChange={this.handleEvent} checked={this.state.empType == "1"}></input> Yes
             <input type='radio' name="empType" value="2" onChange={this.handleEvent}></input> No
         </td>
         <td><select value={this.state.eType} onChange={this.ddlChange}>
           <option value="1">Permanent</option>
           <option value="2">Contract</option>
           </select></td>
       </tr>
       <tr><td><button onClick={this.onButtonClick}>Show Employee Name</button></td>
       <td><button onClick={this.DeleteFieldValue}>Delete Employee Name</button></td>
        <td>
        <DatePickerFunction></DatePickerFunction>
          </td> 
         </tr>
    
     <table>
       <thead>
         <th>Id</th>
         <th>Name</th>
       </thead>
       <tbody>
{employees.map(emp=>(

  <tr>
    <td>{emp.Id}</td>
    <td>{emp.Name}</td>
  </tr>
))}
       </tbody>
     </table>

     <table>
       <tr>
         <td>Id :</td>
         <td><input type ='text' ref='Id'></input></td>
       </tr>
       <tr>
         <td>Name :</td>
         <td><input type ='text' ref='Name'></input></td>
       </tr>
       <tr><td><button onClick={this.SaveEmployeeInfo}>Click me</button></td></tr>
     </table>
     </table>
      
   );
 }

}

const element = <DatePickerFunction></DatePickerFunction>

ReactDOM.render(element,document.getElementById("root"))