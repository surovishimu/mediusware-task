import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const Problem2 = () => {
    const [modalAIsOpen, setModalAIsOpen] = useState(false);
    const [modalBIsOpen, setModalBIsOpen] = useState(false);
    const [modalCIsOpen, setModalCIsOpen] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showEvenContacts, setShowEvenContacts] = useState(false);

    const openAllContactsModal = async () => {
        try {
            const response = await fetch('https://contact.mediusware.com/api/contacts/?page=1&page_size=120');
            const data = await response.json();
            setContacts(data.results);
            setModalAIsOpen(true);

            const newUrl = window.location.origin + window.location.pathname + '?modal=a';
            window.history.pushState({ modal: 'a' }, '', newUrl);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const openUSContactsModal = async () => {
        try {
            const response = await fetch('https://contact.mediusware.com/api/country-contacts/united%20states/');
            const data = await response.json();
            setContacts(data.results);
            setModalBIsOpen(true);

            const newUrl = window.location.origin + window.location.pathname + '?modal=b';
            window.history.pushState({ modal: 'b' }, '', newUrl);
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

    const handleCheckboxChange = () => {
        setShowEvenContacts(!showEvenContacts);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const modalType = urlParams.get('modal');

        if (modalType === 'a') {
            openAllContactsModal();
        } else if (modalType === 'b') {
            openUSContactsModal();
        }
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-primary"
                        type="button"
                        onClick={openAllContactsModal}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                        onClick={openUSContactsModal}
                    >
                        US Contacts
                    </button>
                </div>

                <Modal isOpen={modalAIsOpen || modalBIsOpen} onRequestClose={closeModal}>
                    <h2>Contact Modal</h2>

                    <ul>
                        {contacts
                            .filter((contact, index) => (!showEvenContacts || index % 2 === 0))
                            .map((contact) => (
                                <li key={contact.id} onClick={() => openModalC(contact)}>
                                    {contact.phone}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="btn btn-primary"
                        style={{ backgroundColor: '#46139f' }}
                        onClick={openAllContactsModal}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-warning"
                        style={{ backgroundColor: '#ff7f50' }}
                        onClick={openUSContactsModal}
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
                    <div>
                        <label>
                            Only Even
                            <input
                                type="checkbox"
                                checked={showEvenContacts}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                    </div>
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
                        onClick={openAllContactsModal}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-warning"
                        style={{ backgroundColor: '#ff7f50' }}
                        onClick={openUSContactsModal}
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
