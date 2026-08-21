import React, { useState, useEffect } from 'react';
import '../../../css/EmployeeList.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Delete ->
    const handleDelete = (id) => {
        if(window.confirm("Are you sure ?"))
        {
            fetch(`/api/employees/${id}` , {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({is_active: 0})
            }) 
            .then(res => res.json())
            .then(data => {
                // console.log(id);
                console.log(data);
                setEmployees(
                    employees.filter(emp => emp.id !== id)
                )
                alert(data['message']+' with name '+data['name']);
            })
            .catch(err => {
                console.log('Failed to Delete');
                console.log('Error:', err);
            });           
        }
    }

    // Edit ->
    const handleEdit = (emp) => {
        setSelectedEmployees(emp);
        setShowModal(true);
        // console.log(selectedEmployees);
        // console.log('emp:', emp);
        // console.log('state:', selectedEmployees);        
        // alert("edit button clicked");
    }

    const handleUpdate = (selectedEmployees) => {
        if(window.confirm('Confirm New Updates !'))
        {
            // useEffect(() => {
                 fetch(`/api/employees/${selectedEmployees.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept' : 'application/json'
                    },
                    body: JSON.stringify(selectedEmployees)
                 })
                .then(res => res.json())
                .then(data => {
                // console.log('updatedEmp', selectedEmployees);
                // console.log(data);
                setShowModal(false);
                alert(data['message']);
                fetch('/api/employees')
                .then(res => res.json())
                .then(data => setEmployees(data));
                })
                .catch(err => {
                    console.log('Falied to Update');
                    console.log('Error:', err);
                });
        }        
    }

    useEffect(() => {
        fetch('/api/employees')
            .then(res => res.json())
            .then(data => setEmployees(data));
    }, []);


        return (
        <div className='container mt-4'>
            {showModal && (
                <>
                    <div className="custom-backdrop"></div>
                    <div className="modal show mt-5" style={{ display: "block" }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">

                                <header className="modal-header">
                                    <h1 className="modal-title" id="modal-title-org">
                                        Edit Employee
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close modal"
                                        onClick={() => setShowModal(false)}                                      
                                    ></button>
                                </header>

                                <div className="modal-body">
                                    <form>

                                        <div className="row mb-3">

                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="first_name">
                                                    First Name
                                                </label>

                                                <input
                                                    className="form-control"
                                                    id="first_name"
                                                    name="first_name"
                                                    type="text"
                                                    value={selectedEmployees?.first_name}
                                                    onChange={(e) => setSelectedEmployees({
                                                        ...selectedEmployees, first_name: e.target.value
                                                    })}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="last_name">
                                                    Last Name
                                                </label>

                                                <input
                                                    className="form-control"
                                                    id="last_name"
                                                    name="last_name"
                                                    type="text"
                                                    value={selectedEmployees?.last_name}
                                                    onChange={(e) => setSelectedEmployees({
                                                        ...selectedEmployees, last_name: e.target.value
                                                    })}
                                                />
                                            </div>

                                        </div>

                                        <div className="row mb-3">

                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="gender">
                                                    Gender
                                                </label>

                                                <select
                                                    className="form-select"
                                                    name="gender"
                                                    id="gender"
                                                    value={selectedEmployees?.gender}
                                                    onChange={(e) => setSelectedEmployees({
                                                        ...selectedEmployees, gender: e.target.value
                                                    })}
                                                >
                                                    <option disabled>Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="dob">
                                                    Date of Birth
                                                </label>

                                                <input
                                                    className="form-control"
                                                    id="dob"
                                                    name="dob"
                                                    type="date"
                                                    value={selectedEmployees?.dob}
                                                    onChange={(e) => setSelectedEmployees({
                                                        ...selectedEmployees, dob: e.target.value
                                                    })}
                                                />
                                            </div>

                                        </div>

                                        <div className="row mb-3">

                                            <div className="col-12">
                                                <label className="form-label" htmlFor="email">
                                                    Email
                                                </label>

                                                <input
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    value={selectedEmployees?.email}
                                                    onChange={(e) => setSelectedEmployees({
                                                        ...selectedEmployees, email: e.target.value
                                                    })}
                                                />
                                            </div>

                                        </div>

                                        <div className="row mb-3">

                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="contact_number">
                                                    Contact Number
                                                </label>

                                                <input
                                                    className="form-control"
                                                    id="contact_number"
                                                    name="contact_number"
                                                    type="contact"
                                                    value={selectedEmployees?.contact_number}
                                                    onChange={(e) => setSelectedEmployees({
                                                        ...selectedEmployees, contact_number: e.target.value
                                                    })}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="skill_type">
                                                    Skill Type
                                                </label>

                                                <input
                                                    className="form-control"
                                                    id="skill_type"
                                                    name="skill_type"
                                                    type="contact"
                                                    value={selectedEmployees?.skill_type}
                                                    onChange={(e) => setSelectedEmployees({
                                                        ...selectedEmployees, skill_type: e.target.value
                                                    })}
                                                />
                                            </div>

                                        </div>

                                        <div className="row mb-3">

                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="experience_years">
                                                    Experience Years
                                                </label>

                                                <input
                                                    className="form-control"
                                                    id="experience_years"
                                                    name="experience_years"
                                                    type="contact"
                                                    value={selectedEmployees?.experience_years}
                                                    onChange={(e) => setSelectedEmployees({
                                                        ...selectedEmployees, experience_years: e.target.value
                                                    })}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="country">
                                                    Country
                                                </label>

                                                <input
                                                    className="form-control"
                                                    id="country"
                                                    name="country"
                                                    type="contact"
                                                    value={selectedEmployees?.country}
                                                    onChange={(e) => setSelectedEmployees({
                                                        ...selectedEmployees, country: e.target.value
                                                    })}
                                                />
                                            </div>

                                        </div>

                                    </form>
                                </div>

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleUpdate(selectedEmployees)}
                                    >
                                        Update
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className={showModal ? "employee-content blur-background" : "employee-content"}></div>
            <h2 className='mb-3'>Employees</h2>
            <p>Total: {employees.length}</p>
            <table className='table employee-table' style={{ tableLayout: 'auto'}}>
                <thead className='table-dark'>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Email</th>
                    <th>Skill</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp, index) => {

                    // console.log(emp);

                    return (
                        <tr key={emp.id}>
                            <td className='text-center w-auto'>{index + 1}</td>
                            <td className=' w-auto'>{emp.first_name} {emp.last_name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.skill_type}</td>

                            
                            {/* <td className="text-end">
                                <div className="d-flex justify-content-end align-items-center gap-1">
                                    <button 
                                        className="action-btn text-warning"
                                        onClick={() => handleEdit(emp)}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>                                        
                                    </button>

                                    <span className="action-divider">|</span> 

                                    <button 
                                        className="action-btn text-danger"
                                        onClick={() => handleDelete(emp.id)}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>                                        
                                    </button>
                                </div>
                            </td>                             */}

                            <td>
                                <div className="action-group">
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => handleEdit(emp)}
                                        title="Edit Employee"
                                    >
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </button>
                                        <span className="action-divider">|</span> 
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(emp.id)}
                                        title="Delete Employee"
                                    >
                                        <span className="material-symbols-outlined">
                                            delete
                                        </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );

                })}
            </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;












// __________________________________________________________

// main.jsx
// ↓
// App.jsx
// ↓
// EmployeeList()
// ↓
// useState()
// ↓
// functions created
// ↓
// return() renders UI
// ↓
// useEffect()
// ↓
// fetch()
// ↓
// Laravel Route
// ↓
// Controller
// ↓
// Database
// ↓
// JSON response
// ↓
// setEmployees()
// ↓
// React rerenders
// ↓
// map() displays rows