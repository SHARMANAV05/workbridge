import { useEffect, useState } from "react";
import "../../../css/ContractsForm.css";
import Select from 'react-select';

function CreateContract() {

    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [totalDays,setTotalDays] = useState(180);
    const [organizationsData, setOrganizationsData] = useState([]);
    const [employeesData, setEmployeesData] = useState([]);
    const [selectedOrganizations, setSelectedOrganizations] = useState(null);
    const [selectedEmployees, setselectedEmployees] = useState(null);
    const orgOptions = organizationsData.map(orgData =>({                                        
                                        value: orgData.id,
                                        label: orgData.name                                        
                                    }));

    const empOptions = employeesData.map(empData =>({
                                        value: empData.id,
                                        label: empData.first_name + ' ' + empData.last_name                                 
                                    }))

    const updateDays = (start,end)=>{

        if(start && end){

            const startObj = new Date(start);
            const endObj = new Date(end);

            const diff = Math.ceil(
                (endObj-startObj)/(1000*60*60*24)
            );

            setTotalDays(diff>0 ? diff : 0);
        }

    };

    const handleStartDate=(e)=>{

        const value=e.target.value;

        setStartDate(value);

        updateDays(value,endDate);

    }

    const handleEndDate=(e)=>{

        const value=e.target.value;

        setEndDate(value);

        updateDays(startDate,value);

    }

    useEffect(()=>{
        fetch(`/api/organizations`)
            .then(res => res.json())
            .then(data => setOrganizationsData(data));

        fetch(`/api/employees`)
            .then(res => res.json())
            .then(data => setEmployeesData(data));
        
        console.log('Data Loading');
    }, []);

    return (
        <main id="main-content">


        <div className="container-fluid p-4 mb-5 pb-5">
            <div
                className="max-width-xxl mx-auto"
                style={{ maxWidth: "1200px" }}
            >

                {/* Breadcrumb */}

                <div className="mb-4">

                    <nav aria-label="breadcrumb">

                        <ol className="breadcrumb mb-1">

                            <li className="breadcrumb-item">

                                <a
                                    href="#"
                                    className="text-decoration-none text-muted"
                                >
                                    Contracts
                                </a>

                            </li>

                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Create New
                            </li>

                        </ol>

                    </nav>

                    <h2 className="fw-bold text-primary">
                        Create Contract
                    </h2>

                    <p className="text-muted">
                        Draft a new service agreement for  internal or external placement.
                    </p>

                </div>

                <form>

                    {/* ===========================
                        Contract Information
                    =========================== */}

                    <div className="card p-4">

                        <div className="d-flex align-items-center mb-4">

                            <span className="material-symbols-outlined text-secondary me-2">
                                info
                            </span>

                            <h5 className="mb-0 fw-bold text-primary">
                                Contract Information
                            </h5>

                        </div>

                        <div className="row g-3">

                            <div className="col-md-4">

                                <label className="form-label" htmlFor ="contract_code">
                                    Contract Code
                                </label>
                                <input
                                    id="contract_code" 
                                    name="contract_code" 
                                    type="text"
                                    className="form-control read-only-field"
                                    value="CON-2024-0089"
                                    readOnly
                                />

                            </div>

                            <div className="col-md-4">

                                <label className="form-label" htmlFor ="organization_name" >
                                    Organization
                                </label>

                                <Select                                     
                                    id="organization_name" 
                                    name="organization_name"
                                    defaultValue=""
                                    options={orgOptions}
                                    value={selectedOrganizations}
                                    onChange={(option) => setSelectedOrganizations(option)}
                                    placeholder="Select Organization"
                                    isSearchable={true}
                                    maxMenuHeight={200}
                                    />                             

                            </div>

                            <div className="col-md-4">

                                <label 
                                    className="form-label" 
                                    htmlFor ="organization_contact">
                                    Organization Contact
                                </label>

                                <select 
                                    className="form-select" 
                                    id="organization_contact" 
                                    name="organization_contact"
                                >

                                    <option value="">
                                        Select Contact...
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-4">

                                <label 
                                    className="form-label" 
                                    htmlFor ="employee" 
                                    >
                                    Employee
                                </label>

                                <Select
                                    id="employee"
                                    name="employee"                                    
                                    defaultValue=""
                                    options={empOptions}
                                    value={selectedEmployees}
                                    onChange={(option) => setselectedEmployees(option)}
                                    placeholder="Select Employee"
                                    isSearchable={true}
                                    maxMenuHeight={200}
                                />                                

                            </div>

                            <div className="col-md-8">

                                <label 
                                    className="form-label"
                                    htmlFor ="contract_skill"
                                >
                                    Contract Skill / Role
                                </label>

                                <input                                    
                                    id="contract_skill" 
                                    name="contract_skill"
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Senior Frontend Engineer"
                                />

                            </div>

                        </div>

                    </div>

                    {/* ===========================
                        Duration Card
                    =========================== */}

                    <div className="card p-4">

                        <div className="d-flex align-items-center mb-4">

                            <span className="material-symbols-outlined text-secondary me-2">
                                calendar_today
                            </span>

                            <h5 className="mb-0 fw-bold text-primary">
                                Duration & Invoice
                            </h5>

                        </div>

                        <div className="row g-3">

                            <div className="col-md-3">

                                <label 
                                    className="form-label"  
                                    htmlFor ="start_date" 
                                >
                                    Start Date
                                </label>

                                <input
                                    id="start_date" 
                                    name="start_date"
                                    type="date"
                                    className="form-control"
                                    value={startDate}
                                    onChange={handleStartDate}
                                />

                            </div>

                            <div className="col-md-3">

                                <label 
                                    className="form-label"
                                    htmlFor ="end_date"
                                >
                                    End Date
                                </label>

                                <input
                                    id="end_date" 
                                    name="end_date"                                    
                                    type="date"
                                    className="form-control"
                                    value={endDate}
                                    onChange={handleEndDate}
                                />

                            </div>

                            <div className="col-md-3">

                                <label 
                                    className="form-label" 
                                    htmlFor ="totalContractDays"
                                >
                                    Total Contract Days
                                </label>

                                <input
                                    id="totalContractDays" 
                                    name="totalContractDays"                                   
                                    type="number"
                                    className="form-control read-only-field"
                                    value={totalDays}
                                    readOnly
                                />

                            </div>

                            <div className="col-md-3">

                                <label 
                                    className="form-label"
                                    htmlFor ="invoice_type"
                                >
                                    Invoice Type
                                </label>

                                <select 
                                    className="form-select"                                     
                                    id="invoice_type" 
                                    name="invoice_type"
                                >

                                    <option value="monthly">
                                        Monthly Recurring
                                    </option>

                                    <option value="fixed">
                                        Fixed Price
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>
                                {/* ===========================
                        Financial Section
                    =========================== */}

                    <div className="row">

                        <div className="col-lg-8">

                            <div className="card p-4 h-100">

                                <div className="d-flex align-items-center mb-4">

                                    <span className="material-symbols-outlined text-secondary me-2">
                                        payments
                                    </span>

                                    <h5 className="mb-0 fw-bold text-primary">
                                        Financial Details
                                    </h5>

                                </div>

                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <label 
                                            className="form-label" 
                                            htmlFor ="billing_rate"
                                        >
                                            Billing Rate ($)
                                        </label>

                                        <input
                                            id="billing_rate" 
                                            name="billing_rate"                                            
                                            type="number"
                                            className="form-control"
                                            placeholder="0.00"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label 
                                            className="form-label" 
                                            htmlFor ="employee_wage"
                                        >
                                            Employee Wage ($)
                                        </label>

                                        <input                                            
                                            id="employee_wage" 
                                            name="employee_wage"
                                            type="number"
                                            className="form-control"
                                            placeholder="0.00"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label 
                                            className="form-label"
                                            htmlFor ="org_service_charge_perc"
                                        >
                                            Org Service Charge (%)
                                        </label>

                                        <select 
                                            className="form-select" 
                                            defaultValue="15%"
                                            id="org_service_charge_perc" 
                                            name="org_service_charge_perc"                                            
                                        >

                                            <option value={'5%'}>5%</option>
                                            <option value={'15%'}>15%</option>
                                            <option value={'25%'}>25%</option>

                                        </select>

                                    </div>

                                    <div className="col-md-6">

                                        <label 
                                            className="form-label"
                                            htmlFor ="emp_service_charge_perc"
                                        >
                                            Employee Service Charge (%)
                                        </label>

                                        <select 
                                            className="form-select" 
                                            defaultValue="5%"
                                            id="emp_service_charge_perc" 
                                            name="emp_service_charge_perc"
                                        >

                                            <option value={'5%'}>5%</option>
                                            <option value={'10%'}>10%</option>

                                        </select>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <div className="card summary-card p-4 shadow">

                                <h6 className="text-uppercase opacity-50 mb-4 border-bottom border-white border-opacity-10 pb-2">
                                    Financial Summary
                                </h6>

                                <div className="summary-item">

                                    <span className="summary-label">
                                        Org Service Amt:
                                    </span>

                                    <span className="summary-value">
                                        $1,200.00
                                    </span>

                                </div>

                                <div className="summary-item">

                                    <span className="summary-label">
                                        Emp Service Amt:
                                    </span>

                                    <span className="summary-value">
                                        $400.00
                                    </span>

                                </div>

                                <div className="border-top border-white border-opacity-10 pt-3 mt-2">

                                    <div className="summary-item mb-1">

                                        <span className="summary-label">
                                            Client Payable:
                                        </span>

                                        <span className="summary-value text-info fs-3">
                                            $9,200.00
                                        </span>

                                    </div>

                                    <div className="summary-item">

                                        <span className="summary-label">
                                            Employee Payable:
                                        </span>

                                        <span className="summary-value fs-3">
                                            $7,600.00
                                        </span>

                                    </div>

                                </div>

                                <div className="mt-4 p-3 rounded bg-white bg-opacity-10 text-center">

                                    <small className="opacity-75">
                                        Values based on a 30-day cycle.
                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ===========================
                        Governance
                    =========================== */}

                    <div className="card p-4 mt-4">

                        <div className="d-flex align-items-center mb-4">

                            <span className="material-symbols-outlined text-secondary me-2">
                                assignment_turned_in
                            </span>

                            <h5 className="mb-0 fw-bold text-primary">
                                Governance & Feedback
                            </h5>

                        </div>

                        <div className="row g-3 mb-4">

                            <div className="col-md-4">

                                <label 
                                    className="form-label"
                                    htmlFor ="offer_status"
                                >
                                    Offer Status
                                </label>

                                <select 
                                    className="form-select"
                                    id="offer_status" 
                                    name="offer_status"                                   
                                >

                                    <option>Draft</option>
                                    <option>Sent</option>

                                </select>

                            </div>

                            <div className="col-md-4">

                                <label 
                                    className="form-label"
                                    htmlFor ="contract_status"
                                >
                                    Contract Status
                                </label>

                                <select 
                                    className="form-select" 
                                    id="contract_status" 
                                    name="contract_status"
                                >
                                    <option>Pending Approval</option>
                                    <option>Active</option>

                                </select>

                            </div>

                            <div className="col-md-4">

                                <label 
                                    className="form-label"
                                    htmlFor ="payment_status"
                                >
                                    Payment Status
                                </label>

                                <select 
                                    className="form-select" 
                                    id="payment_status" 
                                    name="payment_status"
                                >

                                    <option>Not Started</option>
                                    <option>In Progress</option>

                                </select>

                            </div>

                        </div>

                        <div>

                            <label 
                                className="form-label"
                                htmlFor ="internal_marks"
                            >
                                Internal Remarks
                            </label>

                            <textarea
                                id="internal_marks" 
                                name="internal_marks"                                
                                className="form-control"
                                rows={4}
                                placeholder="Add confidential notes or special conditions..."
                            />

                        </div>

                    </div>

                </form>

            </div>

        </div>

<footer className="bottom-bar">

    <div
        className="max-width-xxl mx-auto d-flex justify-content-between align-items-center"
        style={{ maxWidth: "1200px" }}
    >

        <div className="d-none d-sm-flex align-items-center text-muted">

            <span className="material-symbols-outlined me-2 text-primary">
                auto_fix_high
            </span>

            <small>
                Unsaved changes will be lost if you leave.
            </small>

        </div>

        <div className="d-flex gap-3 w-100 w-sm-auto justify-content-end">

            <button
                type="button"
                className="btn btn-outline-secondary px-4 fw-bold"
            >
                Reset
            </button>

            <button
                type="submit"
                className="btn btn-primary px-5 fw-bold shadow"
            >
                Save Contract
            </button>

        </div>

    </div>

</footer>

</main>



    );

}

export default CreateContract;