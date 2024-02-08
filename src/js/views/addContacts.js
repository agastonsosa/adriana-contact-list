import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export const ContactCardForm = () => {

    const { actions } = useContext(Context);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const createContact = async () => {
        await actions.addContact(
            {
                "full_name": name,
                "email": email,
                "agenda_slug": "adrianacp10_agenda",
                "address": address,
                "phone": phone,
            })

        return navigate("/")

    }

    return (
        <div className="container">
            <div className="form-new-contact d-flex flex-column p-5">
                <h2 className="text-center mb-4">Add New Contact</h2>

                <div className="mb-3">
                    <label htmlFor="Input1" className="form-label">Full Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        placeholder="Enter full name"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Input2" className="form-label">Email</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="text"
                        placeholder="Enter email"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Input3" className="form-label">Phone Number</label>
                    <input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        type="text"
                        placeholder="Enter phone number"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Input4" className="form-label">Address</label>
                    <input
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        type="text"
                        placeholder="Enter address"
                        className="form-control"
                    />
                </div>

                <button className="btn btn-success" onClick={createContact}>Save Contact</button>
            </div>

            <div className="text-center mt-3">
                <Link to="/">Go Back to Contacts</Link>
            </div>
        </div>
    );
};

