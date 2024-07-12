import React, { useState } from 'react';
import PasswordTable from './PasswordTable';
import PasswordForm from './PasswordForm';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

Modal.setAppElement('#root');

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [reload, setReload] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        setReload(!reload);
    };

    return (
        <div className="container">
            <h1 className="my-4">Менеджер паролей</h1>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    placeholder="Поиск..."
                    className="form-control me-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleOpenModal}>Добавить запись</button>
            </div>
            <PasswordTable searchQuery={searchQuery} reload={reload} />
            <PasswordForm isOpen={isModalOpen} onRequestClose={handleCloseModal} onSave={handleSave} />
        </div>
    );
};

export default App;
