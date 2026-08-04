import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function EmployeeForm() {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        dob: '',
        email: '',
        contact_number: '',
        skill_type: '',
        experience_years: 0,
        country: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const resetForm = () => {
        setFormData({
            first_name: '',
            last_name: '',
            gender: '',
            dob: '',
            email: '',
            contact_number: '',
            skill_type: '',
            experience_years: 0,
            country: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        fetch('/api/employees', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })      
        .then(async (res) => 
            {
                let dataJs = await res.json();
                
                if(!res.ok)
                {
                    throw new Error(dataJs.message);
                }

                return dataJs;
            })
        .then(data => {
            console.log(data);
            alert(data['message']);        
            resetForm();
            setIsSubmitting(false);
            navigate('/employees');
        })
        .catch(err => {
            alert(err.message);
            console.log('Error:', err);
            setIsSubmitting(false);
        });
    };

    return (
        <div className='row'>
            <div className='col-md-6 mx-auto mt-4'>
                <div className='container'>
                    <h2 className='display-6'>Add Employee</h2>
                    {/* <form onSubmit={handleSubmit}>
                        <div className="row mb-3">

                            <div className="col-md-6">
                                <label className="form-label">First Name</label>
                                <input
                                    className="form-control"
                                    name="first_name"
                                    value={formData.first_name}
                                    placeholder="First Name"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Last Name</label>
                                <input
                                    className="form-control"
                                    name="last_name"
                                    value={formData.last_name}
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select
                                    className="form-select"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input
                                    className="form-control"
                                    name="dob"
                                    type="date"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-12">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-md-6">
                                <label className="form-label">Contact Number</label>
                                <input
                                    className="form-control"
                                    name="contact_number"
                                    value={formData.contact_number}
                                    placeholder="Contact Number"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Skill Type</label>
                                <input
                                    className="form-control"
                                    name="skill_type"
                                    value={formData.skill_type}
                                    placeholder="Skill Type"
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-md-6">
                                <label className="form-label">Experience Years</label>
                                <input
                                    className="form-control"
                                    name="experience_years"
                                    type="number"
                                    value={formData.experience_years}
                                    placeholder="Experience Years"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Country</label>
                                <input
                                    className="form-control"
                                    name="country"
                                    value={formData.country}
                                    placeholder="Country"
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="d-flex justify-content-end">

                            {isSubmitting ? (
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled
                                >
                                    Adding...
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Add Employee
                                </button>
                            )}

                        </div>
                    </form> */}

                    {/* <!-- Form Card --> */}
                    {/* <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-outline-variant overflow-hidden"> */}
                        <div className="p-lg md:p-xl">
                            {/* <!-- Form Card --> */}
                            <div className="card">
                                <div className="card-body">
                                    <form id="addEmployeeForm" onSubmit={handleSubmit}>
                                        <div className="row g-4">
                                            {/* <!-- First Name --> */}
                                            <div className="col-12 col-md-6">
                                                <label className="form-label">First Name</label>
                                                <input className="form-control" 
                                                        placeholder="Enter first name" 
                                                        required 
                                                        type="text" 
                                                        name="first_name"
                                                        value={formData.first_name}
                                                        onChange={handleChange}
                                                />
                                            </div>
                                            {/* <!-- Last Name --> */}
                                            <div className="col-12 col-md-6">
                                            <label className="form-label">Last Name</label>
                                            <input className="form-control" 
                                                    placeholder="Enter last name" 
                                                    required 
                                                    type="text"
                                                    name="last_name"
                                                    value={formData.last_name}
                                                    onChange={handleChange}
                                            />                                                                            
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="form-label">Gender</label>
                                                <select
                                                    className="form-select"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            {/* <!-- Date of Birth --> */}
                                            <div className="col-12 col-md-6">
                                            <label className="form-label">Date of Birth</label>
                                            <input className="form-control" 
                                                    required
                                                    name="dob"
                                                    type="date"
                                                    value={formData.dob}
                                                    onChange={handleChange}
                                            />
                                            </div>
                                            {/* <!-- Email Address --> */}
                                            <div className="col-12">
                                            <label className="form-label">Email Address</label>
                                            <input className="form-control" 
                                                    placeholder="e.g. employee@company.com" 
                                                    required    
                                                    type="email"                                                    
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                            />
                                            </div>
                                            {/* <!-- Contact Number --> */}
                                            <div className="col-12 col-md-6">
                                            <label className="form-label">Contact Number</label>
                                            <input className="form-control" 
                                                    placeholder="+1 (000) 000-0000"
                                                    required 
                                                    type="number"
                                                    name="contact_number"
                                                    value={formData.contact_number}
                                                    onChange={handleChange}
                                            />
                                            </div>
                                            {/* <!-- Skill Type --> */}
                                            <div className="col-12 col-md-6">
                                            <label className="form-label">Skill Type</label>
                                            <input className="form-control" 
                                                    placeholder="e.g. Software Engineering" 
                                                    required
                                                    type="text"                                                                    
                                                    name="skill_type"
                                                    value={formData.skill_type}
                                                    onChange={handleChange}
                                            />
                                            </div>
                                            {/* <!-- Experience Years --> */}
                                            <div className="col-12 col-md-6">
                                            <label className="form-label">Experience Years</label>
                                            <input className="form-control" 
                                                    min="0" 
                                                    placeholder="0"
                                                    required
                                                    type="number"
                                                    name="experience_years"
                                                    value={formData.experience_years}
                                                    onChange={handleChange}
                                            />
                                            </div>
                                            {/* <!-- Country --> */}
                                            <div className="col-12 col-md-6">
                                            <label className="form-label">Country</label>
                                            <input className="form-control"  
                                                    type="text"
                                                    required
                                                    name="country"
                                                    value={formData.country}
                                                    placeholder="Country"
                                                    onChange={handleChange}
                                            />
                                            </div>
                                            {/* <!-- Guidance Note --> */}
                                            <div className="alert-info mt-4" role="alert">
                                                <span className="material-symbols-outlined text-primary-container" style={{ fontSize: "20px" }}>info</span>
                                                <div>
                                                    Please ensure all mandatory information is accurate. Employee records are synchronized with payroll and administrative directories upon submission.
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">

                                                {isSubmitting ? (
                                                    <button
                                                        className="btn btn-primary"
                                                        type="submit"
                                                        disabled
                                                    >
                                                        Adding...
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary"
                                                        type="submit"
                                                    >
                                                        Add Employee
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>  
                    {/* </div> */}
                </div>   
            </div> 
         </div>  
    );
}

export default EmployeeForm;