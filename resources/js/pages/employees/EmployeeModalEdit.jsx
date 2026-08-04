                {showModal && (
                    <div className="modal show mt-5" style={{ display: "block" }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Employee</h4>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}                                      
                                    ></button>
                                </div>

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
                )}