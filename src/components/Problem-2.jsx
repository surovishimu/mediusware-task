import React, { useState } from 'react';
import Modal from 'react-modal';

const Problem2 = () => {
    const [modalAIsOpen, setModalAIsOpen] = useState(false);
    const [modalBIsOpen, setModalBIsOpen] = useState(false);
    const [modalCIsOpen, setModalCIsOpen] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    const openModalA = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setContacts(data.results);
            setModalAIsOpen(true);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const openModalB = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setContacts(data.results);
            setModalBIsOpen(true);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const openModalC = (contact) => {
        setSelectedContact(contact);
        setModalCIsOpen(true);
    };

    const closeModal = () => {
        setModalAIsOpen(false);
        setModalBIsOpen(false);
        setModalCIsOpen(false);
        setSelectedContact(null);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-primary"
                        type="button"
                        onClick={() =>
                            openModalA('https://contact.mediusware.com/api/contacts/?page=1&page_size=120')
                        }
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                        onClick={() =>
                            openModalB('https://contact.mediusware.com/api/country-contacts/united%20states/')
                        }
                    >
                        US Contacts
                    </button>
                </div>

                <Modal isOpen={modalAIsOpen || modalBIsOpen} onRequestClose={closeModal}>
                    <h2>Contact Modal</h2>
                    <ul>
                        {contacts.map((contact) => (
                            <li key={contact.id} onClick={() => openModalC(contact)}>
                                {contact.phone}
                            </li>
                        ))}
                    </ul>
                    <button
                        className="btn btn-primary"
                        style={{ backgroundColor: '#46139f' }}
                        onClick={() => openModalB('https://contact.mediusware.com/api/country-contacts/united%20states/')}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-warning"
                        style={{ backgroundColor: '#ff7f50' }}
                        onClick={() => openModalB('https://contact.mediusware.com/api/country-contacts/united%20states/')}
                    >
                        US Contacts
                    </button>
                    <button
                        className="btn btn-light border"
                        onClick={closeModal}
                        style={{ border: '1px solid #ccc' }}
                    >
                        Close
                    </button>
                </Modal>

                <Modal isOpen={modalCIsOpen} onRequestClose={closeModal}>
                    <h2>Contact Details</h2>
                    {selectedContact && (
                        <div>
                            <p>Name: {selectedContact.country.name}</p>
                           
                        </div>
                    )}
                    <button
                        className="btn btn-primary "
                        style={{ backgroundColor: '#46139f' }}
                        onClick={() => openModalB('https://contact.mediusware.com/api/country-contacts/united%20states/')}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-warning"
                        style={{ backgroundColor: '#ff7f50' }}
                        onClick={() => openModalB('https://contact.mediusware.com/api/country-contacts/united%20states/')}
                    >
                        US Contacts
                    </button>
                    <button
                        className="btn btn-light border"
                        onClick={closeModal}
                        style={{ border: '1px solid #ccc' }}
                    >
                        Close
                    </button>
                </Modal>
            </div>
        </div>
    );
};

export default Problem2;
