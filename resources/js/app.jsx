import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeForm from './pages/employees/EmployeeForm';
import OrganizationList from './pages/organizations/OrganizationList';
import OrganizationForm from './pages/organizations/OrganizationForm';
import ContractsForm from './pages/contracts/ContractsForm';
import OrgContactsCreate from './pages/organizations/OrganizationContacts';

function App() {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center gap-0" to="/"><img src="/favicon.png" alt="Workbridge" style={{ height: "50px" }}></img> Workbridge</Link>
                    <div className="navbar-nav ms-auto">
                        <NavLink className="nav-link" to="/" end>Dashboard</NavLink>
                        <NavLink className="nav-link" to="/employees" end>Employees</NavLink>
                        <NavLink className="nav-link" to="/organizations" end>Organizations</NavLink>
                        <NavLink className="nav-link" to="/employees/create" end>Add Employee</NavLink>
                        <NavLink className="nav-link" to="/organizations/create" end>Add Organization</NavLink>
                        <NavLink className="nav-link" to="/contracts/create" end>Add Contracts</NavLink>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/employees/create" element={<EmployeeForm />} />
                    <Route path="/organizations" element={<OrganizationList />} />
                    <Route path="/organizations/create" element={<OrganizationForm />} />
                    <Route path="/contracts/create" element={<ContractsForm/>} />
                    <Route path="/organizations/contacts/create" element={<OrgContactsCreate/>}/>
                </Routes>
            </div>

           
        </BrowserRouter>
    );
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />);