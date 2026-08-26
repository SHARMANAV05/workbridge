import { useState, useEffect } from "react";
import '../../../css/OrganizationContacts.css';
import Select from "react-select";

function OrganizationContact() {

    const [Contacts, setContacts] = useState([]);
    const [organizationsData, setOrganizationsData] = useState([]);
    const [selectedOrganizations, setSelectedOrganizations] = useState(null);
    const orgOptions = organizationsData.map(orgData =>({                                        
                                        value: orgData.id,
                                        label: orgData.name                                        
                                    }));
    const [isSubmitting, setisSubmitting] = useState(false);
    // const contactCodeValue = "CONTR202608-01";                               //contact code not needed 

    const [formData, setFormData] = useState({
        organizationId: '',
        primaryStatus: 0,
        activeStatus: 1,
        // contactCode: contactCodeValue,
        first_name: '',
        last_name: '',
        designation: '',
        emailCont: '',
        contactNum: '',
    });

    
    const handleChange = (e) => {
    // console.log(e.target);
    const value =  e.target.type === "checkbox" ? (e.target.checked ? 1 : 0) : e.target.value;

    
    // console.log("Name:", e.target.name);
    // console.log("Type:", e.target.type);
    // console.log("Value:", value);
    // console.log("Checked:", e.target.checked);
    
    
        setFormData ({ ...formData, [e.target.name] : value});
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setisSubmitting(true);
        fetch(`/api/organizations-contacts`,{
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }, 
                    body: JSON.stringify(formData)
                })
                .then( async (res) =>{
                    let dataJs = await res.json();
                    if(!res.ok){
                        throw new Error(dataJs.message);
                    }
                    return(dataJs);
                })
                .then(data => {
                    // console.log('This is the Submitted Data', formData);
                    console.log(data);
                    alert(data.message);
                    resetForm();
                    setisSubmitting(false);
                })
                .catch( err => {
                    console.log('Error : ', err);
                    alert(err.message);
                    setisSubmitting(false);
                });
    };

    const resetForm = () => {
        setFormData({   
            organizationId: '',
            primaryStatus: 0,
            activeStatus: 1,
            first_name: '',
            last_name: '',
            designation: '',
            emailCont: '',
            contactNum: '',    
        });
        setSelectedOrganizations(null);

        
    }

    useEffect(()=>{
        fetch(`/api/organizations`)
            .then(res => res.json())
            .then(data => setOrganizationsData(data));

        fetch(`/api/organizations-contacts`)
        .then(res => res.json())
        .then(data => setContacts(data));
        console.log('Data Loading');

    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const orgId = params.get('orgId');


        if(orgId && orgOptions.length > 0){
            const selectedOrg = orgOptions.find(
                option => String(option.value) === String(orgId)
            );
        
            if(selectedOrg){
                setSelectedOrganizations(selectedOrg);

                setFormData({
                    ...formData,
                    organizationId: selectedOrg.value
                });
            }
        
        
        
        }
    }, [organizationsData]);


    return (
        <>
            <div className="container py-4">

                {/* ==========================
                    Page Header
                ========================== */}

                <div className="mb-4">
                    <h2 className="fw-bold mb-1">
                        Organization Contact Management
                    </h2>

                    <p className="text-muted mb-0">
                        Manage organization contacts responsible for communication,
                        contracts and negotiations.
                    </p>
                </div>

                {/* ==========================
                    Information Alert
                ========================== */}

                <div className="alert alert-primary d-flex align-items-start shadow-sm mb-4">

                    <span className="material-symbols-outlined me-3">
                        info
                    </span>

                    <div>
                        <strong>Primary Contact</strong>

                        <br />

                        The Primary Contact is the main representative of the
                        organization who will receive contract, invoice and official
                        communication.
                    </div>

                </div>

                {/* ==========================
                    Contact Form Card
                ========================== */}

                <div className="card shadow-sm border-0">

                    <div className="card-header bg-white py-3">

                        <h5 className="mb-0 d-flex align-items-center">

                            <span className="material-symbols-outlined text-primary me-2">
                                person_add
                            </span>

                            Contact Information

                        </h5>

                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">

                            <div className="row g-4 align-items-center">

                                {/* Organization */}

                                <div className="col-lg-6 ">

                                    <label className="form-label" htmlFor="organizationName">
                                        Organization <span className="text-danger">*</span>
                                    </label>

                                    <Select                                     
                                        id="organizationName" 
                                        name="organizationName"
                                        required                         
                                        defaultValue=""
                                        options={orgOptions}                                    
                                        onChange={(option) =>{setSelectedOrganizations(option); setFormData({ ...formData, organizationId: option.value})}}
                                        placeholder="Select Organization"
                                        isSearchable={true}            
                                        value={selectedOrganizations}
                                        maxMenuHeight={200}                                
                                    />

                                </div>

                                {/* Primary Contact */}

                                <div className=" offset-1 col-lg-2">

                                    <label className="form-label d-block" htmlFor="primaryStatus">
                                        Primary Contact
                                    </label>

                                    <div className="form-check form-switch">

                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={formData.primaryStatus === 1}
                                            name="primaryStatus"
                                            onChange={handleChange}
                                            id="primaryStatus"
                                        />

                                        <label className="form-check-label">

                                            Yes

                                        </label>

                                    </div>

                                </div>

                                {/* Active Status */}

                                <div className="offset-1 col-lg-2">

                                    <label className="form-label d-block" htmlFor="activeStatus">
                                        Active Status
                                    </label>

                                    <div className="form-check form-switch">

                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={formData.activeStatus === 1}
                                            name="activeStatus"
                                            onChange={handleChange}
                                            id="activeStatus"
                                        />

                                        <label className="form-check-label">

                                            Active

                                        </label>

                                    </div>

                                </div>
                            </div>

                            <div className="row g-4 mt-1">
                                {/* Contact Code */}

                                {/* <div className="col-lg-4">

                                    <label className="form-label" htmlFor="contactCode">
                                        Contact Code
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control disabled"                                                              
                                        readOnly
                                        value={formData.contactCode}
                                        name="contactCode"
                                        onChange={handleChange}
                                        id="contactCode"
                                    />

                                </div> */}

                                {/* Contact Name */}

                                <div className="col-lg-4">

                                    <label className="form-label" htmlFor="first_name">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        placeholder="John"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        id="first_name"
                                    />

                                </div>

                                <div className="col-lg-4">

                                    <label className="form-label" htmlFor="last_name">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        placeholder="Doe"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        id="last_name"
                                    />

                                </div>

                                {/* Designation */}

                                <div className="col-lg-4">

                                    <label className="form-label" htmlFor="designation">
                                        Designation
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        placeholder="Operations Manager"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        id="designation"
                                        
                                    />

                                </div>

                                {/* Email */}

                                <div className="col-lg-4">

                                    <label className="form-label">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        required
                                        className="form-control"
                                        value={formData.emailCont}
                                        name="emailCont"
                                        id="emailCont"
                                        onChange={handleChange}
                                        placeholder="john@email.com"
                                    />

                                </div>

                                {/* Contact Number */}

                                <div className="col-lg-4">

                                    <label className="form-label" htmlFor="contactNum">
                                        Contact Number
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        value={formData.contactNum}
                                        name="contactNum"
                                        id="contactNum"
                                        onChange={handleChange}
                                        placeholder="+91 9876543210"
                                    />

                                </div>

                                

                            </div>

                        </div>

                        {/* ==========================
                            Buttons
                        ========================== */}

                        <div className="card-footer bg-white">

                            <div className="d-flex justify-content-end gap-2">

                                <button className="btn btn-outline-secondary">

                                    Cancel

                                </button>

                                <button type="reset" className="btn btn-outline-dark" onClick={resetForm}>

                                    Reset

                                </button>
                                {isSubmitting
                                ? 
                                    <button type="submit" className="btn btn-primary px-4 disabled" name="submit">
                                        Saving.... 
                                    </button>
                                
                                :
                                    <button type="submit" className="btn btn-primary px-4" name="submit">
                                        Save Contact
                                    </button>
                                }

                            </div>

                        </div>
                    </form>
                </div>

            </div>



            {/* ======================================================
                CONTACT REGISTRY
            ====================================================== */}

            <div className="card shadow-sm border-0 mt-4">

                {/* Card Header */}

                {/* <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">

                    <h5 className="mb-0 fw-semibold">
                        Contact Registry
                    </h5>
                    <p className="table-count">({Contacts.length})</p>
                    <div>

                        <button className="btn btn-light me-2">

                            <span className="material-symbols-outlined">
                                search
                            </span>

                        </button>

                        <button className="btn btn-light">

                            <span className="material-symbols-outlined">
                                filter_list
                            </span>

                        </button>

                    </div>

                </div>  */}

                <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">

                    {/* Title + Count */}
                    <div className="d-flex align-items-center gap-2">

                        <h5 className="mb-0 fw-semibold">
                            Contact Registry
                        </h5>

                        <span className="badge rounded-pill text-bg-light border fw-semibold px-2 py-1">
                            {Contacts.length}
                        </span>

                    </div>

                    {/* Actions */}
                    <div className="d-flex align-items-center gap-2">

                        <button className="btn btn-light">

                            <span className="material-symbols-outlined">
                                search
                            </span>

                        </button>

                        <button className="btn btn-light">

                            <span className="material-symbols-outlined">
                                filter_list
                            </span>

                        </button>

                    </div>

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

                                            <button className="btn btn-sm btn-outline-primary">

                                                <span className="material-symbols-outlined">
                                                    visibility
                                                </span>

                                            </button>

                                            <button className="btn btn-sm btn-outline-warning">

                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>

                                            </button>

                                            <button className="btn btn-sm btn-outline-danger">

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

                {/* Pagination */}

                {/* <div className="card-footer bg-white d-flex justify-content-between align-items-center">

                    <small className="text-muted">
                        Showing 3 of 124 contacts
                    </small>

                    <nav>

                        <ul className="pagination pagination-sm mb-0">

                            <li className="page-item">

                                <button className="page-link">

                                    &laquo;

                                </button>

                            </li>

                            <li className="page-item active">

                                <button className="page-link">

                                    1

                                </button>

                            </li>

                            <li className="page-item">

                                <button className="page-link">

                                    2

                                </button>

                            </li>

                            <li className="page-item">

                                <button className="page-link">

                                    3

                                </button>

                            </li>

                            <li className="page-item">

                                <button className="page-link">

                                    &raquo;

                                </button>

                            </li>

                        </ul>

                    </nav>

                </div> */}

            </div>

        </>
    );
}

export default OrganizationContact;
