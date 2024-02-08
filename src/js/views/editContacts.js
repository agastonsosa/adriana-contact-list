import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";


export const EditContacts = () => {
    const {id} = useParams()

    const { actions, store } = useContext(Context);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    useEffect (() => {
        const contact = store.contacts.find(p => p.id == id)
        if (!contact) return 
        setName(contact.full_name)
        setPhone(contact.phone)
        setAddress(contact.address)
        setEmail(contact.email)
    }, [store.contacts, id])


   const updateContact = () => {
        actions.updateContact(
            {
                "full_name": name,
                "email": email,
                "agenda_slug": "adrianacp10_agenda",
                "address": address, 
                "phone": phone,
            }, id)
        navigate("/")
   }

   return (
    <div className="container">
        <div className="edit-contact-form card p-5">
            <h2 className="text-center mb-4">Edit Contact</h2>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter full name"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter email"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="Enter phone number"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="Enter address"
                    className="form-control"
                />
            </div>

            <button onClick={updateContact} className="btn btn-primary" type="button">Update Contact</button>
        </div>

        <div className="text-center mt-3">
            <Link to="/" className="btn btn-primary">Go Back to Contacts</Link>
        </div>
    </div>
);
};