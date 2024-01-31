import React, { useState } from 'react';
import Navbar from './Navbar.jsx'
import "../styles/StopAlert.css";

function Alert() {
    const [formData, setFormData] = useState({
        email: '',
        unsubscribeDataType: '',
    });

    const dataTypes = ['Air', 'Water', 'Soil'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUnsubscribe = async (e) => {
        e.preventDefault();

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!formData.email.match(emailRegex)) {
            alert('Please enter a valid email address.');
            return;
        }

        if(formData.unsubscribeDataType === "Air"){
            try {
                const response = await fetch(`http://localhost:8086/air-microservice/air/notify?email=${formData.email}`, {
                    method: 'DELETE',
                });
        
                if (response.status === 200) {
                    alert('Successfully unsubscribed.');
                } else {
                    alert('Failed to unsubscribe.');
                }
            } catch (error) {
                console.error('Error unsubscribing:', error);
            }
        }

        if(formData.unsubscribeDataType ==="Water"){
            try {
                const response = await fetch(`http://localhost:8086/water-microservice/water/notify?email=${formData.email}`, {
                    method: 'DELETE',
                });
        
                if (response.status === 200) {
                    alert('Successfully unsubscribed.');
                } else {
                    alert('Failed to unsubscribe.');
                }
            } catch (error) {
                console.error('Error unsubscribing:', error);
            }
        }

        if(formData.unsubscribeDataType ==="Soil"){
            try {
                const response = await fetch(`http://localhost:8086/soil-microservice/soil/notify?email=${formData.email}`, {
                    method: 'DELETE',
                });
        
                if (response.status === 200) {
                    alert('Successfully unsubscribed.');
                } else {
                    alert('Failed to unsubscribe.');
                }
            } catch (error) {
                console.error('Error unsubscribing:', error);
            }
        }
        
        window.location.reload();
    };

    return (
        <div className="alert-general">
            <Navbar />
            <div className="alert-container">

                {/* Unsubscribe section */}
                <h2 className="h2-data"><b>Stop receiving alerts</b></h2>
                <form className="alert-form" onSubmit={handleUnsubscribe}>
                    <div className="form-group">
                        <label className="flabel"><b>Email:</b></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="flabel"><b>Data Type:</b></label>
                        <select
                            name="unsubscribeDataType"
                            value={formData.unsubscribeDataType}
                            onChange={handleInputChange}
                        ><option value="" disabled>Select Operator</option>
                            {dataTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="alert-btn" type="submit">Unsubscribe</button>
                </form>
            </div>
        </div>
    );
}

export default Alert;
