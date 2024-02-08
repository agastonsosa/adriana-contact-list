import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const ContactCard = () => {

    const { store, actions } = useContext(Context);
    const { deleteContact } = actions;
    const navigate = useNavigate();

    return (
        <div className="card m-5">
            <button className="btn-add btn-outline-success fs-4" onClick={() => navigate("/add-contacts")}>
                Add contact
            </button>

            {store.contacts.map((element) => (
                <div className="" key={element.id}>
                    <div className="card-body d-flex justify-content-around">

                        <img
                            src="https://www.colgate.com/content/dam/cp-sites/oral-care/oral-care-center/global/article/gscp/latam/modern-mexican-hipster-man-beard-indoor.jpg"
                            className="img-fluid float-start rounded-circle " style={{ width: "180px", height: "180px" }}
                        />
                        <div className="contact details d-flex flex-column align-items-center">
                            <h5 className="card-title-name">{element.full_name}</h5>
                            <p className="card-address">
                                <i className="fas fa-map-pin p-1"></i>
                                {element.address}
                            </p>
                            <p className="card-telephone">
                                <i className="fas fa-phone p-1"></i>
                                {element.phone}
                            </p>
                            <p className="card-email">
                                <i className="fas fa-envelope p-1"></i>
                                {element.email}
                            </p>
                        </div>

                        <div>
                                <button className="btn" onClick={() => navigate(`/edit-contacts/${element.id}`)}>
                                <i className="fas fa-edit p-1"></i>
                                    Edit 
                                </button>
                                <button className="btn" onClick={() => deleteContact(element.id)}>
                                <i className="fas fa-trash p-1"></i>
                                Delete
                                </button>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}

        </div>
    );
};