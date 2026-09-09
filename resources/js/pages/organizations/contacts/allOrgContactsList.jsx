import { set } from "lodash";
import React,{ useState, useEffect} from "react";

function allOrgContactsList(){

    
    const [Contacts, setContacts] = useState([]);
    useEffect(()=> {
        fetch('/api/organizations-contacts')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setContacts(data);
        });
    }, []);

    return(
        <>
            <div>
                <h1>Contacts</h1>
                    <span className="badge rounded-pill text-bg-light border fw-semibold px-2 py-1">
                       Total: {Contacts.length}
                    </span>
            </div>    
        
                            {/* Responsive Table */}

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">

                            <tr>

                                <th>#</th>

                                <th>Organization</th>

                                <th>Contact Name</th>

                                <th>Designation</th>

                                <th>Email</th>

                                <th>Primary</th>

                                <th>Status</th>

                                <th className="text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead> 

                        <tbody>

                            {/* Row 1 */}

                            
                            {Contacts.map((cntOrg, index) => (
                                <tr key={index}>
                                    <td>{cntOrg.id}</td>
                                    <td>{cntOrg.organization.name}</td>
                                    <td>{cntOrg.contact_name}</td>
                                    <td>{cntOrg.designation}</td>
                                    <td>{cntOrg.email}</td>
                                    <td>
                                        <span className={cntOrg.is_primary === 1 ? 'badge bg-primary' : 'badge bg-secondary'}>
                                            {cntOrg.is_primary === 1 ? 'Primary' : 'Secondary'}
                                        </span>                                    
                                    </td>
                                    <td>
                                        <span className={cntOrg.is_active === 1 ? 'badge bg-success' : 'badge bg-secondary'}>
                                            {cntOrg.is_active === 1 ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">

                                            <button className="btn btn-sm btn-outline-primary" title="Calling History">

                                                <span className="material-symbols-outlined">
                                                    visibility
                                                </span>

                                            </button>

                                            <button className="btn btn-sm btn-outline-warning" title="Update Contact Info">

                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>

                                            </button>

                                            <button className="btn btn-sm btn-outline-danger" title="Delete Contact">

                                                <span className="material-symbols-outlined">
                                                    delete
                                                </span>

                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                           
                        </tbody>

                    </table>
                </div>

        
        
        
        </>
    )
}

export default allOrgContactsList;