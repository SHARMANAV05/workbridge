import React, {useState, useEffect} from "react";
import '../../../css/OrganizationList.css';

function OrganizationList(){
    const [organizations, setOrganizations] = useState([]);
    const [editOrganization, setEditOrganization] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (id) => {
        if(window.confirm('Are you sure to Delete this Organization ?'))
        {
            fetch(`/api/organizations/${id}` , {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({is_active: 0})
            })
            .then( async res => {
               let dataJs = await res.json();
               if(!res.ok){
                throw new Error(dataJs.message); 
               }
               return(dataJs);
            })
            .then(data => {
                console.log(data);
                setOrganizations(
                    organizations.filter(org => org.id !== id)
                )
                alert(data['message']);
                console.log(data['message']);
            })
            .catch(err => {
                alert('Failed to Delete ! Try Again');
                console.log('Error', err);
            });
        }
    }

    const handleEdit = (org) => {
        setEditOrganization(org);        
        alert('Edit Organization');
        console.log('state', org);
        setShowModal(true);
    }

    const handleUpdate = (editOrganization) =>{
        if(window.confirm('Sure with changes ? Ready to initiate Update . . . . . ')){
            fetch(`/api/organizations/${editOrganization.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(editOrganization)
            })
            .then(res => res.json())
            .then(data => {
                console.log('from Controller', data);
            });
            setShowModal(false);
            alert('Update inititated');
        }
        
    }

    const createContact = (orgId) =>{
        if(window.confirm('Want to create a New Contact ☎ ?'))
        {
            window.open(`/organizations/contacts/create?orgId=${orgId}`, '_blank');
        }
    }

        const createContract = () =>{
        if(window.confirm('Want to create a New Contract 📃 ?'))
        {
            window.open('/contracts/create', '_blank');
        }
    }

    useEffect(() => {
        fetch(`/api/organizations`)
            .then(res => res.json())
            .then(data => setOrganizations(data));
    }, []);

    return(
        <>
            {showModal && (
                <>
                    <div className="custom-backdrop"></div>
                    <div 
                        className="modal show-mt" 
                        style={{ display: "block" }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title-org"
                    >
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <header className="modal-header">
                                    <h1 className="modal-title" id="modal-title-org">
                                        Edit Organization
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close modal"
                                        onClick={() => setShowModal(false)}                                      
                                    ></button>
                                </header>
                                
                                <main className="modal-body">
                                    <form className="org-edit-form">

                                        {/* Org Name */}
                                        <div className="row mb-3">

                                            <div className="col-md-12">
                                                <label className="form-label">Organization Name</label>
                                                <input type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter organization name"  
                                                    value={editOrganization?.name} 
                                                    name="organizationName" 
                                                    onChange={(e) => setEditOrganization({
                                                        ...editOrganization, name: e.target.value
                                                    })} 
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
                                                    value={editOrganization?.industry_type} 
                                                    name="industryType" 
                                                    onChange={(e) => setEditOrganization({
                                                        ...editOrganization, industry_type: e.target.value
                                                    })}  
                                                    required 
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Established At</label>
                                                <input 
                                                    type="datetime-local" 
                                                    className="form-control" 
                                                    value={editOrganization?.established_at} 
                                                    name="establishedDate" 
                                                    onChange={(e) => setEditOrganization({
                                                        ...editOrganization, established_at: e.target.value
                                                    })}
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
                                                    value={editOrganization?.gst_number} 
                                                    name="GSTNo" 
                                                    onChange={(e) => setEditOrganization({
                                                        ...editOrganization, gst_number: e.target.value
                                                    })} 
                                                    required 
                                                />
                                            </div>


                                            <div className="col-md-6">
                                                <label className="form-label">Country</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter country" 
                                                    value={editOrganization?.country} 
                                                    name="countryName" 
                                                    onChange={(e) => setEditOrganization({
                                                        ...editOrganization, country: e.target.value
                                                    })} 
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
                                                value={editOrganization?.address} 
                                                name="address" 
                                                onChange={(e) => setEditOrganization({
                                                        ...editOrganization, address: e.target.value
                                                    })}
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
                                                    value={editOrganization?.city} 
                                                    name="cityName" 
                                                    onChange={(e) => setEditOrganization({
                                                        ...editOrganization, city: e.target.value
                                                    })}
                                                    required 
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">State</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter state" 
                                                    value={editOrganization?.state} 
                                                    name="stateName" 
                                                    onChange={(e) => setEditOrganization({
                                                        ...editOrganization, state: e.target.value
                                                    })} 
                                                    required 
                                                />
                                            </div>

                                        </div>                                                                        

                                    </form>
                                                                        
                                </main>

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
                                        onClick={() => handleUpdate(editOrganization)}
                                    >
                                        Update
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="organization-table-container">
                <div className="row d-flex">
                    <div className="col-10">
                        <h2 className="table-title">Organizations</h2>
                    </div>
                    <div className="col-2">
                        <button className="border-0 bg-transparent p-0" title="Employee-Organization Contract">
                            <a onClick={() => createContract()}  className="btn btn-outline-dark"> Create Contract</a>
                        </button>
                    </div>
                </div>
                <p className="table-count">Total: {organizations.length}</p>
                <div className="table-responsive">                
                        <table className="table table-borderless table-striped table-hover">
                            <thead className="table-dark">
                                <tr className="text-center">
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Industry</th>
                                    <th>Country</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {organizations.map(org =>(
                                    <tr key={org.id} className="text-center">
                                        <td>{org.org_id}</td>
                                        <td>{org.name}</td>
                                        <td>{org.industry_type}</td>
                                        <td>{org.country}</td>
                                        <td>
                                            <div className="action-group">
                                                <button 
                                                    className="action-btn btn" 
                                                    onClick={() => createContact(org.id)} 
                                                    title="Create Organization Contact"
                                                >
                                                    <span> <a className="material-symbols-outlined">contacts</a></span>
                                                </button>
                                                <span className="action-divider text-muted">|</span>                                             
                                                <button 
                                                    className="action-btn edit-btn"
                                                    onClick={() => handleEdit(org)} 
                                                    title="Edit Organization"
                                                >
                                                    <span className="material-symbols-outlined">edit</span>                                                
                                                </button>
                                                <span className="action-divider text-muted">|</span> 
                                                <button 
                                                    className="action-btn delete-btn" 
                                                    onClick={() => handleDelete(org.id)} 
                                                    title="Delete Organization"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>                                            
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </div>
        </>
    );
}

export default OrganizationList;

