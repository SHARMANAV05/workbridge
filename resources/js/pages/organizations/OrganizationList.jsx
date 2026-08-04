import React, {useState, useEffect} from "react";
import '../../../css/OrganizationList.css';

function OrganizationList(){
    const [organizations, setOrganizations] = useState([]);

    const handleDelete = (id) =>{
        if(window.confirm('Are you sure to Delete this Organization ?'))
        {
            fetch(`/api/organizations/${id}` , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({is_active: 0})
            })
            .then(res => res.json())
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

    const createContact = () =>{
        if(window.confirm('Want to create a New Contact ?'))
        {
            window.open('/organizations/contacts/create', '_blank');
        }
    }

        const createContract = () =>{
        if(window.confirm('Want to create a New Contract ?'))
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
        <div className="employee-table-container">
            <div className="row d-flex">
                <div className="col-10">
                    <h2 className="table-title">Organizations</h2>
                </div>
                <div className="col-2">
                    <button className="border-0 bg-transparent p-0" title="Create Organization Contact"><a onClick={() => createContract()}  className="btn btn-outline-dark"> Create Contract</a></button>
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
                                                onClick={() => createContact()} 
                                                title="Create Organization Contact"
                                            >
                                                <span> <a className="material-symbols-outlined">contacts</a></span>
                                            </button>
                                            <span className="action-divider">|</span>                                             
                                            <button 
                                                className="action-btn edit-btn" 
                                                onClick={() => handleEdit(org)} 
                                                title="Edit Organization"
                                            >
                                                <span className="material-symbols-outlined">edit</span>                                                
                                            </button>
                                            <span className="action-divider">|</span> 
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
    );
}

export default OrganizationList;

