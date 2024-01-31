import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import '../styles/AirSearch.css';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2'; 
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import FileSaver from 'file-saver';

function AirSearch(props) {
    const [chart, setChart] = useState(null);
    const location = useLocation();
    const jsonData = location.state?.data || {};
    const [stats, setStats] = useState([]);

    const tableData = [
        { metric: 'Mean', temperature: stats.airTemperatureMean?.toFixed(4), humidity: stats.airHumidityMean?.toFixed(4), co2: stats.airC02Mean?.toFixed(4), vocs: stats.airC02Mean?.toFixed(4), pm25: stats.airPM25Mean?.toFixed(4) , co: stats.airC0Mean?.toFixed(4)},
        { metric: 'Median', temperature: stats.airTemperatureMedian?.toFixed(4), humidity: stats.airHumidityMedian?.toFixed(4), co2: stats.airC02Median?.toFixed(4), vocs: stats.airC02Median?.toFixed(4), pm25: stats.airPM25Median?.toFixed(4) , co: stats.airC0Median?.toFixed(4) },
        { metric: 'Range', temperature: stats.airTemperatureRange?.toFixed(4), humidity: stats.airHumidityRange?.toFixed(4), co2: stats.airC02Range?.toFixed(4),  vocs: stats.airC02Range?.toFixed(4), pm25: stats.airPM25Range?.toFixed(4) , co: stats.airC0Range?.toFixed(4) },
        { metric: 'Standard Deviation', temperature: stats.airTemperatureStandardDeviation?.toFixed(4), humidity: stats.airHumidityStandardDeviation?.toFixed(4), co2: stats.airC02StandardDeviation?.toFixed(4), vocs: stats.airC02StandardDeviation?.toFixed(4), pm25: stats.airPM25StandardDeviation?.toFixed(4) , co: stats.airC0StandardDeviation?.toFixed(4) },
    ];  

    const startTimestamp = jsonData.length > 0 ? jsonData[0].timestamp : 'N/A';
    const endTimestamp = jsonData.length > 0 ? jsonData[jsonData.length - 1].timestamp : 'N/A';
    const coordinates = jsonData.length > 0 ? jsonData[0].coordinates : 'N/A';
    let content;

    const infoContent = (
        <div>
            <h3><b className="info-section">Location:</b> {coordinates}<b className="info-section"> Start Time:</b> {formatTimestamp(startTimestamp)}<b className="info-section"> End Time:</b> {formatTimestamp(endTimestamp)}</h3>
        </div>
    );
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isGraphOpen, setisGraphOpen] = useState(false);
    const isGraph = () => {
        setisGraphOpen(true);
    };

    // Function to close the modal
    const closeIsGraphOpen = () => {
        setisGraphOpen(false);
    };

    useEffect(() => {
        // Auto-close the modal when the page changes
        closeModal();
        closeIsGraphOpen();
    }, [location]);

    const rangeValues = (
        <><div className="range-chart" id="temperature">
            <h2>Temperature Range (°C)</h2>
            <br></br>
            <div className="range-bar">
                <div className="range very-low">
                    <span className="label">Very Low: &lt; 10°C</span>
                </div>
                <div className="range low">
                    <span className="label">Low: 10°C - 15°C</span>
                </div>
                <div className="range normal">
                    <span className="label">Normal: 15°C - 25°C</span>
                </div>
                <div className="range high">
                    <span className="label">High: 25°C - 30°C</span>
                </div>
                <div className="range very-high">
                    <span className="label">Very High: &gt; 30°C</span>
                </div>
            </div>
        </div><div className="range-chart" id="humidity">
                <h2>Humidity Range (%)</h2>
                <br></br>
                <div className="range-bar">
                    <div className="range very-low">
                        <span className="label">Very Low: &lt; 20%</span>
                    </div>
                    <div className="range low">
                        <span className="label">Low: 20% - 40%</span>
                    </div>
                    <div className="range normal">
                        <span className="label">Normal: 40% - 60%</span>
                    </div>
                    <div className="range high">
                        <span className="label">High: 60% - 80%</span>
                    </div>
                    <div className="range very-high">
                        <span className="label">Very High: &gt; 80%</span>
                    </div>
                </div>
            </div><div className="range-chart" id="co">
                <h2>CO Range (ppm)</h2>
                <br></br>
                <div className="range-bar">
                    <div className="range very-low">
                        <span className="label">Very Low: &lt; 1 ppm</span>
                    </div>
                    <div className="range low">
                        <span className="label">Low: 1 - 5 ppm</span>
                    </div>
                    <div className="range normal">
                        <span className="label">Normal: 5 - 10 ppm</span>
                    </div>
                    <div className="range high">
                        <span className="label">High: 10 - 20 ppm</span>
                    </div>
                    <div className="range very-high">
                        <span className="label">Very High: &gt; 20 ppm</span>
                    </div>
                </div>
            </div><div className="range-chart" id="co2">
                <h2>CO2 Range (ppm)</h2>
                <br></br>
                <div className="range-bar">
                    <div className="range very-low">
                        <span className="label">Very Low: &lt; 400 ppm</span>
                    </div>
                    <div className="range low">
                        <span className="label">Low: 400 - 800 ppm</span>
                    </div>
                    <div className="range normal">
                        <span className="label">Normal: 800 - 1000 ppm </span>
                    </div>
                    <div className="range high">
                        <span className="label">High: 1000 - 2000 ppm</span>
                    </div>
                    <div className="range very-high">
                        <span className="label">Very High: &gt; 2000 ppm</span>
                    </div>
                </div>
            </div><div className="range-chart" id="pm25">
                <h2>PM2.5 Range (µg/m³)</h2>
                <br></br>
                <div className="range-bar">
                    <div className="range very-low">
                        <span className="label">Very Low: &lt; 10 µg/m³</span>
                    </div>
                    <div className="range low">
                        <span className="label">Low: 10 - 20 µg/m³</span>
                    </div>
                    <div className="range normal">
                        <span className="label">Normal: 20 - 30 µg/m³</span>
                    </div>
                    <div className="range high">
                        <span className="label">High: 30 - 50 µg/m³</span>
                    </div>
                    <div className="range very-high">
                        <span className="label">Very High: &gt; 50 µg/m³</span>
                    </div>
                </div>
            </div><div className="range-chart" id="vocs">
                <h2>VOCs Range (ppb)</h2>
                <br></br>
                <div className="range-bar">
                    <div className="range very-low">
                        <span className="label">Very Low: &lt; 5 ppb</span>
                    </div>
                    <div className="range low">
                        <span className="label">Low: 5 - 20 ppb</span>
                    </div>
                    <div className="range normal">
                        <span className="label">Normal: 20 - 50 ppb</span>
                    </div>
                    <div className="range high">
                        <span className="label">High: 50 - 100 ppb</span>
                    </div>
                    <div className="range very-high">
                        <span className="label">Very High: &gt; 100 ppb</span>
                    </div>
                </div>
            </div></>
    );
    
    function formatTimestamp(timestamp) {
        const dateObject = new Date(timestamp);
        const formattedDate = dateObject.toLocaleDateString();
        const formattedTime = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} at ${formattedTime}`;
    }

    function convertJsonToCsv(jsonData) {
        const fields = [
          'airTemperature',
          'airHumidity',
          'airC02',
          'airVOCs',
          'airPM25',
          'airC0',
          'timestamp',
          'coordinates',
        ];
      
        const csvRows = [];
        // Add the header row with field names
        csvRows.push(fields.join(','));
      
        // Iterate over the JSON data and create CSV rows
        jsonData.forEach((data) => {
          const values = fields.map((field) => data[field]);
          csvRows.push(values.join(','));
        });
      
        return csvRows.join('\n');
      }
      
      function downloadCSV() {
        try {
          const csvData = convertJsonToCsv(jsonData);
          const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
          FileSaver.saveAs(blob, 'airData.csv');
        } catch (error) {
          console.error('Error while downloading CSV:', error);
        }
      }
      
      

    const humidityChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'Humidity (%) Over Time',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.airHumidity) : [],
            fill: false,
            borderColor:  'rgb(255, 0, 0)',
            tension: 0.1,
          },
        ],
      };

    const c02ChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'CO2 (ppm) Over Time',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.airC02) : [],
            fill: false,
            borderColor: 'rgb(0, 0, 255)',
            tension: 0.1,
          },
        ],
    };

    const vocsChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'VOCs (ppb) Over Time',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.airVOCs) : [],
            fill: false,
            borderColor: 'rgb(255, 255, 0)',
            tension: 0.1,
          },
        ],
    };

    const pm2ChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'PM2.5 (µg/m³) Over Time',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.airPM25) : [],
            fill: false,
            borderColor: 'rgb(128, 0, 128)',
            tension: 0.1,
          },
        ],
    };

    const c0ChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'C0 (ppm) Over Time',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.airPM25) : [],
            fill: false,
            borderColor: 'rgb(0, 128, 0)',
            tension: 0.1,
          },
        ],
    };

    const temperatureChartData = { 
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
            {
                label: 'Temperature (°C) Over Time',
                data: Array.isArray(jsonData) ? jsonData.map(item => item.airTemperature) : [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };
          
    useEffect(() => {
        
        async function postDataToBackend() {
            const url = 'http://localhost:8086/analytics-microservice/analytics/basic-air';
            
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonData), // Assuming you have jsonData defined
                });
        
                if (response.ok) {
                    const data = await response.json();
                    setStats(data)

                    if (chart) {
                        chart.destroy();
                    }
                    const canvasId = `chart-${Math.floor(Math.random() * 10000)}`;
                    // Create a new chart and set it in the state
                    const newChart = new Chart(document.getElementById(canvasId), {
                        type: 'line',
                        data: temperatureChartData,humidityChartData,c02ChartData,c0ChartData,pm2ChartData,vocsChartData
                    });
                    setChart(newChart);

                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (Array.isArray(jsonData) && Object.keys(jsonData).length > 0) {
            postDataToBackend();
        }

    }, [jsonData, chart]);   

    if (Array.isArray(jsonData)) {
      
        console.log('Received jsonData:', jsonData);

        content = (
        <div className="stats-table-container">
            <h1>Air Statistics</h1>
            {infoContent}
            <table className="stats-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Temperature (°C)</th>
                        <th>Humidity (%)</th>
                        <th>CO2 (ppm)</th>
                        <th>VOCs (ppb)</th>
                        <th>PM2.5 (µg/m³)</th>
                        <th>CO (ppm)</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.metric}</td>
                            <td>{row.temperature}</td>
                            <td>{row.humidity}</td>
                            <td>{row.co2}</td>
                            <td>{row.vocs}</td>
                            <td>{row.pm25}</td>
                            <td>{row.co}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <br></br>
            {!isGraphOpen &&<button className="range-btn" onClick={isGraph}>Show Time Graphs</button>}
            {isGraphOpen &&
            <><button className="range-btn" onClick={closeIsGraphOpen}>Close Time Graphs</button><Line data={temperatureChartData} /><Line data={humidityChartData} /><Line data={c02ChartData} /><Line data={c0ChartData} /><Line data={pm2ChartData} /><Line data={vocsChartData} /></>}
            <br></br>
            <br></br>
            {!isModalOpen &&<button className="range-btn" onClick={openModal}>Check Range Values</button>}
                {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        {/* Close button */}
                        <button className="range-btn" onClick={closeModal}>Close Range Values</button>
                        {rangeValues}
                    </div>
                </div>
            )}
             <h3 className="export-header">
            Export the dataset: <button onClick={downloadCSV}>Download CSV</button>
            </h3>
        </div>
        
    );

    }else if (typeof jsonData === 'object' && Object.keys(jsonData).length > 0) {
        
        content = (
            <div className="data-single">
                <h1>Last Measured Air Data for {jsonData.coordinates} at {formatTimestamp(jsonData.timestamp)}</h1>
                <h2>Temperature: <b className="unit">{jsonData.airTemperature}</b> °C</h2>
                <h2>Humidity: <b className="unit">{jsonData.airHumidity}</b> %</h2>
                <h2>CO2: <b className="unit">{jsonData.airC02}</b> ppm</h2>
                <h2>VOCs: <b className="unit">{jsonData.airVOCs}</b> ppb</h2>
                <h2>PM2.5: <b className="unit">{jsonData.airPM25}</b> µg/m³</h2>
                <h2>CO: <b className="unit">{jsonData.airC0}</b> ppm</h2>
                {!isModalOpen &&<button className="range-btn" onClick={openModal}>Check Range Values</button>}
                {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        {/* Close button */}
                        <button className="range-btn" onClick={closeModal}>Close</button>
                        {rangeValues}
                    </div>
                </div>
            )}
            </div>
        );

    } else {
        
        content = <div className="data-single"><h1><b>No Data Available</b></h1></div>;

    }

    return (
        <div className="app-container">
        <Navbar />
        {content}
        </div>
    );
}

export default AirSearch;
