import React, { useState } from 'react';
import Navbar from './Navbar.jsx'
import "../styles/Alert.css";

function Alert() {
    const [formData, setFormData] = useState({
        email: '',
        location: '',
        dataType: '',
        parameter: '',
        comparisonOperator: '',
        thresholdValue: '',
    });

    const [jsonAirData, setJsonAirDataData] = useState({
        email: '',
        coordinates: '',
        lessAirTemperature: '',
        moreAirTemperature: '',
        lessAirHumidity: '',
        moreAirHumidity: '',
        lessAirC02: '',
        moreAirC02: '',
        lessAirVOCs: '',
        moreAirVOCs: '',
        lessAirPM25: '',
        moreAirPM25: '',
        lessAirC0: '',
        moreAirC0: '',
    });

    const [jsonWaterData, setJsonWaterDataData] = useState({
        email: '',
        coordinates: '',
        lessDissolvedOxygen: '',
        moreDissolvedOxygen: '',
        lessOxidationReductionPotential: '',
        moreOxidationReductionPotential: '',
        lessPH: '',
        morePH: '',
        lessTurbidity: '',
        moreTurbidity: '',
        lessTotalDissolvedSolids: '',
        moreTotalDissolvedSolids: '',
        lessTemperature: '',
        moreTemperature: '',
    });

    const [jsonSoilData, setJsonSoilDataData] = useState({
        email: '',
        coordinates: '',
        lessSoilTemperature: '',
        moreSoilTemperature: '',
        lessSoilMoisture: '',
        moreSoilMoisture: '',
        lessVolumetricWaterContent: '',
        moreVolumetricWaterContent: '',
        lessSalinity: '',
        moreSalinity: '',
        lessTotalSuspendedSolids: '',
        moreTotalSuspendedSolids: '',
        lessFlowVolume: '',
        moreFlowVolume: '',
        lessNitrate: '',
        moreNitrate: '',
    });

    const europeanCapitals = [
        "Amsterdam",
        "Athens",
        "Berlin",
        "Brussels",
        "Budapest",
        "Copenhagen",
        "Dublin",
        "Helsinki",
        "Lisbon",
        "London",
        "Madrid",
        "Oslo",
        "Paris",
        "Prague",
        "Rome",
        "Stockholm",
        "Vienna",
        "Warsaw",
        "Zurich"
    ];

    const dataTypes = ['Air', 'Water', 'Soil'];

    const airParameters = [
        'Temperature',
        'Humidity',
        'C02',
        'VOCs',
        'PM25',
        'C0',
    ];

    const waterParameters = [
        'DissolvedOxygen',
        'Oxidation Reduction Potential',
        'PH',
        'Turbidity',
        'Total Dissolved Solids',
        'Temperature',
    ];

    const soilParameters = [
        'Temperature',
        'Moisture',
        'Electronic Conductivity',
        'Volumetric Water Content',
        'Salinity',
        'Total Suspended Solids',
        'Flow Volume',
        'Nitrate',
    ];

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const parameterOptions = formData.dataType === 'Air'
        ? airParameters
        : formData.dataType === 'Water'
            ? waterParameters
            : soilParameters;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!formData.email.match(emailRegex)) {
            alert('Please enter a valid email address.');
            return;
        }
    
        // Check if other inputs are not empty
        if (!formData.location || !formData.parameter || !formData.comparisonOperator || !formData.thresholdValue) {
            alert('Please fill in all fields.');
            return;
        }
    
        if(formData.dataType==="Air"){
            let choice = null;
            if(formData.comparisonOperator==="less"){
                console.log("less");
                if(formData.parameter==="Temperature"){
                    choice="lessAirTemperature";
                }else if(formData.parameter==="Humidity"){
                    choice="lessAirHumidity";
                }
                else if(formData.parameter==="C02"){
                    choice="lessAirC02";
                }
                else if(formData.parameter==="VOCs"){
                    choice="lessAirVOCs";
                }
                else if(formData.parameter==="PM25"){
                    choice="lessAirPM25";
                }else if(formData.parameter==="C0"){
                    choice="lessAirC0";
                }
    
            }else{
                console.log("more");
                if(formData.parameter==="Temperature"){
                    choice="moreAirTemperature";
                }else if(formData.parameter==="Humidity"){
                    choice="moreAirHumidity";
                }
                else if(formData.parameter==="C02"){
                    choice="moreAirC02";
                }
                else if(formData.parameter==="VOCs"){
                    choice="moreAirVOCs";
                }
                else if(formData.parameter==="PM25"){
                    choice="moreAirPM25";
                }else if(formData.parameter==="C0"){
                    choice="moreAirC0";
                }
            }
            const updatedJsonAirData = {
                ...jsonAirData,
                email: formData.email,
                coordinates: formData.location,
            };

            updatedJsonAirData[choice] = formData.thresholdValue;

            setJsonAirDataData(updatedJsonAirData);

            try {
                const response = await fetch('http://localhost:8086/air-microservice/air/notify', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedJsonAirData),
                });
            
                if (response.status === 200) {
                    alert('Successfully subscribed for notifications!');
                    window.location.reload();
                } else {
                    alert('Failed to subscribe for notifications.');
                }
                } catch (error) {
                console.error('Error sending alert:', error);
                alert('Error sending alert. Please try again later.');
                }
        } 

        if(formData.dataType==="Water"){
            let choice = null;
            if(formData.comparisonOperator==="less"){
                console.log("less");
                if(formData.parameter==="DissolvedOxygen"){
                    choice="lessDissolvedOxygen";
                }else if(formData.parameter==="Oxidation Reduction Potential"){
                    choice="lessOxidationReductionPotential";
                }
                else if(formData.parameter==="PH"){
                    choice="lessPH";
                }
                else if(formData.parameter==="Turbidity"){
                    choice="lessTurbidity";
                }
                else if(formData.parameter==="Total Dissolved Solids"){
                    choice="lessTotalDissolvedSolids";
                }else if(formData.parameter==="Temperature"){
                    choice="lessTemperature";
                }
    
            }else{
                console.log("more");
                if(formData.parameter==="DissolvedOxygen"){
                    choice="moreDissolvedOxygen";
                }else if(formData.parameter==="Oxidation Reduction Potential"){
                    choice="moreOxidationReductionPotential";
                }
                else if(formData.parameter==="PH"){
                    choice="morePH";
                }
                else if(formData.parameter==="Turbidity"){
                    choice="moreTurbidity";
                }
                else if(formData.parameter==="Total Dissolved Solids"){
                    choice="moreTotalDissolvedSolids";
                }else if(formData.parameter==="Temperature"){
                    choice="moreTemperature";
                }
            }
            const updatedJsonWaterData = {
                ...jsonWaterData,
                email: formData.email,
                coordinates: formData.location,
            };

            updatedJsonWaterData[choice] = formData.thresholdValue;

            setJsonWaterDataData(updatedJsonWaterData);

            try {
                const response = await fetch('http://localhost:8086/water-microservice/water/notify', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedJsonWaterData),
                });
            
                if (response.status === 200) {
                    alert('Successfully subscribed for notifications');
                    window.location.reload();
                } else {
                    alert('Failed to subscribe for notifications.');
                }
                } catch (error) {
                console.error('Error sending alert:', error);
                alert('Error sending alert. Please try again later.');
                }
        } 

        if(formData.dataType==="Soil"){
            let choice = null;
            if(formData.comparisonOperator==="less"){
                console.log("less");
                if(formData.parameter==="Temperature"){
                    choice="lessSoilTemperature";
                }
                else if(formData.parameter==="Moisture"){
                    choice="lessSoilMoisture";
                }
                else if(formData.parameter==="Electronic Conductivity"){
                    choice="lessElectronicConductivity";
                }
                else if(formData.parameter==="Volumetric Water Content"){
                    choice="lessVolumetricWaterContent";
                }else if(formData.parameter==="Salinity"){
                    choice="lessSalinity";
                }
                else if(formData.parameter==="Total Suspended Solids"){
                    choice="lessTotalSuspendedSolids";
                }
                else if(formData.parameter==="Flow Volume"){
                    choice="lessFlowVolume";
                }
                else if(formData.parameter==="Nitrate"){
                    choice="lessNitrate";
                }
    
            }else{
                console.log("more");
                if(formData.parameter==="Temperature"){
                    choice="moreSoilTemperature";
                }
                else if(formData.parameter==="Moisture"){
                    choice="moreSoilMoisture";
                }
                else if(formData.parameter==="Electronic Conductivity"){
                    choice="moreElectronicConductivity";
                }
                else if(formData.parameter==="Volumetric Water Content"){
                    choice="moreVolumetricWaterContent";
                }else if(formData.parameter==="Salinity"){
                    choice="moreSalinity";
                }
                else if(formData.parameter==="Total Suspended Solids"){
                    choice="moreTotalSuspendedSolids";
                }
                else if(formData.parameter==="Flow Volume"){
                    choice="moreFlowVolume";
                }
                else if(formData.parameter==="Nitrate"){
                    choice="moreNitrate";
                }
            }
            const updatedJsonSoilData = {
                ...jsonSoilData,
                email: formData.email,
                coordinates: formData.location,
            };

            updatedJsonSoilData[choice] = formData.thresholdValue;

            setJsonSoilDataData(updatedJsonSoilData);

            try {
                const response = await fetch('http://localhost:8086/soil-microservice/soil/notify', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedJsonSoilData),
                });
            
                if (response.status === 200) {
                    alert('Successfully subscribed for notifications');
                    window.location.reload();
                } else {
                    alert('Failed to subscribe for notifications.');
                }
                } catch (error) {
                console.error('Error sending alert:', error);
                alert('Error sending alert. Please try again later.');
                }
        } 
        window.location.reload();
    };
            

    return (
        <div className="alert-general">
            <Navbar />
            <div className="alert-container">
                <h2 className="h2-data"><b>Type your information below to be notified</b></h2>
                <br />
                <form className="alert-form" onSubmit={handleSubmit}>
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
                        <label className="flabel"><b>Location:</b></label>
                        <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        >
                        <option value="" disabled>Select Location</option>
                        {europeanCapitals.map((capital, index) => (
                            <option key={index} value={capital}>
                            {capital}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="flabel"><b>Data Type:</b></label>
                        <select                        
                            name="dataType"
                            value={formData.dataType}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select data type</option>
                            {dataTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="flabel"><b>Parameter:</b></label>
                        <select
                            name="parameter"
                            value={formData.parameter}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select Parameter</option>
                            {parameterOptions.map((param) => (
                                <option key={param} value={param}>
                                    {param}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="flabel"><b>Comparison:</b></label>
                        <select
                            name="comparisonOperator"
                            value={formData.comparisonOperator}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select Operator</option>
                            <option value="less">Less or Equal Than</option>
                            <option value="greater">Greater or Equal Than</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="flabel"><b>Threshold:</b></label>
                        <input
                            type="number"
                            name="thresholdValue"
                            value={formData.thresholdValue}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button className="alert-btn" type="submit">Alert Me</button>
                    <h4 className="h4-data">Stop receiving alerts by clicking here:
                     <a href="/alert-stop" className="stop-alert"> here</a></h4>
                </form>
            </div>
        </div>
    );
}

export default Alert;
