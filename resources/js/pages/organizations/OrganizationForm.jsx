import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function OrganizationForm(){

    const [formData, setFormData] = useState({
            organizationName: '',
            industryType: '',
            establishedDate: '',
            GSTNo: '',
            countryName: '',
            address: '',
            cityName: '',
            stateName: '',
        });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});               //spread operator -> '...formData' (3 dot '.' followed by smallercase [f] only 'formData')
    };

    const resetForm = ()=> {
        setFormData({
            organizationName: '',
            industryType: '',
            establishedDate: '',
            GSTNo: '',
            countryName: '',
            address: '',
            cityName: '',
            stateName: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        fetch('/api/organizations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then( async (res) => 
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
            setIsSubmitting(false);
            alert(data.message)
            resetForm();            
        })
        .catch(err => { 
            console.log('Error:', err);
            alert(err.message)
            setIsSubmitting(false);
        });        
    };

    return(
        <div className="container py-2">    
            <div
                className="card shadow-lg border-0 rounded-4 mx-auto"
                style={{ maxWidth: "1000px", maxHeight:"50%" }}
            >

                <div className="card-body p-4">

                    {/* Title */}
                    <div className="mb-4">
                        <h2 className="fw-bold text-dark">
                        Organization Registration
                        </h2>

                        <p className="text-muted">
                        Enter organization details to create a new organization profile.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* Org Name */}
                        <div className="row mb-3">

                            <div className="col-md-12">
                                <label className="form-label">Organization Name</label>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder="Enter organization name"  
                                    value={formData.organizationName} 
                                    name="organizationName" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>

                        </div>

                        {/* Industry Type | Establisher At */}
                        <div className="row mb-3">

                            <div className="col-md-6">
                                <label className="form-label">Industry Type</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter industry type" 
                                    value={formData.industryType} 
                                    name="industryType" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Established At</label>
                                <input 
                                    type="datetime-local" 
                                    className="form-control" 
                                    value={formData.establishedDate} 
                                    name="establishedDate" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                     
                        </div>

                        {/* GST No. | Country */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">GST Number</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter GST number" 
                                    value={formData.GSTNo} 
                                    name="GSTNo" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>


                            <div className="col-md-6">
                                <label className="form-label">Country</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter country" 
                                    value={formData.countryName} 
                                    name="countryName" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>

                        </div>

                        {/* Address */}
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <textarea
                                rows="3" 
                                className="form-control" 
                                placeholder="Enter organization address" 
                                value={formData.address} name="address" 
                                onChange={handleChange} 
                                required>
                            </textarea>
                        </div>

                        {/* City | State */}
                        <div className="row mb-4">

                            <div className="col-md-6">
                                <label className="form-label">City</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter city" 
                                    value={formData.cityName} 
                                    name="cityName" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">State</label>
                                <input type="text" className="form-control" placeholder="Enter state" value={formData.stateName} name="stateName" onChange={handleChange} required />
                            </div>

                        </div>

                        {/* Reset | Submit */}
                        <div className="d-flex justify-content-end gap-3">

                            <button type="reset" className="btn btn-outline-secondary px-4" onClick={resetForm}>
                                Reset
                            </button>
                            {isSubmitting
                            ? 
                                <button type="submit" className="btn btn-primary px-4 disabled" name="submit">
                                    Createing.... 
                                </button>
                            
                            :
                                <button type="submit" className="btn btn-primary px-4" name="submit">
                                    Create Organization
                                </button>
                            }


                        </div>

                    </form>
                </div>
            </div>
        </div>

        
        
    );
}

export default OrganizationForm