import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar(){

    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [pollutionType, setPollutionType] = useState("");

    const navigate = useNavigate()

    const [showDates, setShowDates] = useState(true); // Initialize showDates state

    const handleToggleDates = () => {
        setShowDates(!showDates); // Toggle showDates state when the button is clicked
    };

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

    const handleSearch = async () => {
        if(location.trim() === "") {
            alert("Please choose a location.");
            window.location.reload();
            return
        } 

        if( pollutionType.trim() === "") {
          alert("Please choose a data type");
          window.location.reload();
          return
      } 

        if ((startDate.trim() === "" && endDate.trim() === "") || (startDate.trim() !== "" && endDate.trim() !== "")) {

            if(pollutionType.trim() ==="air" && (startDate.trim() === "" && endDate.trim() === "")){
                try {
                    const response = await fetch(`http://localhost:8086/air-microservice/air/search?location=${location}`);
                    if (!response.ok) {
                      throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    
                    navigate('/search-air', { state: { data } });
    
                  } catch (error) {
                    console.error('Error fetching data:', error);
                    alert("An error occurred while fetching data");
                  }
            }

            if(pollutionType.trim() ==="air" && (startDate.trim() !== "" && endDate.trim() !== "")){
                const startCPM = new Date(startDate);
                const endCPM = new Date(endDate);
                const today = new Date();
        
                if (startCPM >= endCPM) {
                    alert("Start date should be less than end date");
                    return;
                }
        
                if (endCPM > today) {
                    alert("End date cannot be greater than the present day");
                    return;
                }

                const start = startDate+"T00:00:00.000%2B00:00"
                const end = endDate+"T23:59:59.000%2B00:00" 
                try {
                    const response = await fetch(`http://localhost:8086/air-microservice/air/search-all?location=${location}&start=${start}&end=${end}`);
                    if (!response.ok) {
                      throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
    
                    navigate('/search-air', { state: { data } });
    
                  } catch (error) {
                    console.error('Error fetching data:', error);
                    alert("An error occurred while fetching data");
                  }

            }

            if(pollutionType.trim() ==="water" && (startDate.trim() === "" && endDate.trim() === "")){
                try {
                    const response = await fetch(`http://localhost:8086/water-microservice/water/search?location=${location}`);
                    if (!response.ok) {
                      throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    
                    navigate('/search-water', { state: { data } });
    
                  } catch (error) {
                    console.error('Error fetching data:', error);
                    alert("An error occurred while fetching data");
                  }
            }

            if(pollutionType.trim() ==="water" && (startDate.trim() !== "" && endDate.trim() !== "")){
                const startCPM = new Date(startDate);
                const endCPM = new Date(endDate);
                const today = new Date();
        
                if (startCPM >= endCPM) {
                    alert("Start date should be less than end date");
                    return;
                }
        
                if (endCPM > today) {
                    alert("End date cannot be greater than the present day");
                    return;
                }

                const start = startDate+"T00:00:00.000%2B00:00"
                const end = endDate+"T23:59:59.000%2B00:00" 
                try {
                    const response = await fetch(`http://localhost:8086/water-microservice/water/search-all?location=${location}&start=${start}&end=${end}`);
                    if (!response.ok) {
                      throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
    
                    navigate('/search-water', { state: { data } });
    
                  } catch (error) {
                    console.error('Error fetching data:', error);
                    alert("An error occurred while fetching data");
                  }

            }

            if(pollutionType.trim() ==="soil" && (startDate.trim() === "" && endDate.trim() === "")){
                try {
                    const response = await fetch(`http://localhost:8086/soil-microservice/soil/search?location=${location}`);
                    if (!response.ok) {
                      throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    
                    navigate('/search-soil', { state: { data } });
    
                  } catch (error) {
                    console.error('Error fetching data:', error);
                    alert("An error occurred while fetching data");
                  }
            }

            if(pollutionType.trim() ==="soil" && (startDate.trim() !== "" && endDate.trim() !== "")){
                const startCPM = new Date(startDate);
                const endCPM = new Date(endDate);
                const today = new Date();
        
                if (startCPM >= endCPM) {
                    alert("Start date should be less than end date");
                    return;
                }
        
                if (endCPM > today) {
                    alert("End date cannot be greater than the present day");
                    return;
                }

                const start = startDate+"T00:00:00.000%2B00:00"
                const end = endDate+"T23:59:59.000%2B00:00" 
                try {
                    const response = await fetch(`http://localhost:8086/soil-microservice/soil/search-all?location=${location}&start=${start}&end=${end}`);
                    if (!response.ok) {
                      throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
    
                    navigate('/search-soil', { state: { data } });
    
                  } catch (error) {
                    console.error('Error fetching data:', error);
                    alert("An error occurred while fetching data");
                  }

            }
            
            
        }else{
            alert("Dates are invalid! Specify both start and end dates or none at all to check live data");
            window.location.reload();
        }
        

    };

    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <img src="/logo.png" alt="Environment Monitoring Logo" />
                <a href="/" className="app-name"> Environment Pollution Monitoring</a>
            </div>
            <div className="search-container">
                 
                <button onClick={handleToggleDates} className='calendar-btn'>{!showDates ? 'Live' : 'History'}</button>
                
                {!showDates && (
                     <><label htmlFor="startDate">Start Date</label><input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} /><label htmlFor="endDate">End Date</label><input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)} /></>
                )}

                <select value={pollutionType} onChange={(e) => setPollutionType(e.target.value)}>
                    <option value="" disabled>Select data type</option>
                    <option value="air">Air</option>
                    <option value="water">Water</option>
                    <option value="soil">Soil</option>
                </select>
                
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value="" disabled>Select a City</option>
                    {europeanCapitals.map((capital, index) => (
                        <option key={index} value={capital}>{capital}</option>
                    ))}
                </select>
                
                <button onClick={handleSearch}>Search</button>

                <div className="about-container">
                    <a href="/alert" className="about-link">Alert Me</a>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
