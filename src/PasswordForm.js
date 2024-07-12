import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PasswordForm = ({ isOpen, onRequestClose, onSave }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('site');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (type === 'email') {
                await axios.post('https://localhost:7263/Password/AddNewEmail', { email: name, password });
            } else {
                await axios.post('https://localhost:7263/Password/AddNewSite', { site: name, password });
            }

            onSave();
            onRequestClose();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                setError('Что то пошло не так');
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal show d-block" overlayClassName=" show">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Добавить запись</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Название:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Пароль:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        value="site"
                                        checked={type === 'site'}
                                        onChange={() => setType('site')}
                                    />
                                    <label className="form-check-label">Сайт</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        value="email"
                                        checked={type === 'email'}
                                        onChange={() => setType('email')}
                                    />
                                    <label className="form-check-label">Почта</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Сохранить</button>
                                <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PasswordForm;
