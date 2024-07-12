import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordTable = ({ searchQuery, reload }) => {
    const [passwords, setPasswords] = useState([]);
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const fetchData = async () => {
        try {
            const [emailsResponse, sitesResponse] = await Promise.all([
                axios.get('https://localhost:7263/Password/GetEmails'),
                axios.get('https://localhost:7263/Password/GetSites')
            ]);

            let index = 0;
            const combinedData = [
                ...emailsResponse.data.emailPasswordManagers.map(e => ({ ...e, type: 'email', id: index++ })),
                ...sitesResponse.data.sitePasswordManagers.map(s => ({ ...s, type: 'site', id: index++ }))
            ];

            combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPasswords(combinedData);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [reload]);

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords({
            ...visiblePasswords,
            [id]: !visiblePasswords[id],
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() + userTimezoneOffset);
        return localDate.toLocaleString();
    };

    const filteredPasswords = passwords.filter(p =>
        (p.type === 'email' ? p.email : p.site).toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Пароль</th>
                    <th>Дата</th>
                </tr>
            </thead>
            <tbody>
                {filteredPasswords.map(password => (
                    <tr key={password.id}>
                        <td>{password.type === 'email' ? password.email : password.site}</td>
                        <td onClick={() => togglePasswordVisibility(password.id)} style={{ cursor: 'pointer' }}>
                            {visiblePasswords[password.id] ? password.password : '********'}
                        </td>
                        <td>{formatDate(password.date)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PasswordTable;
