import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import '../styles/SoilSearch.css';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2'; 
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import FileSaver from 'file-saver';

function SoilSearch(props) {
    const [chart, setChart] = useState(null);
    const location = useLocation();
    const jsonData = location.state?.data || {};
    const [stats, setStats] = useState([]);

    const tableData = [
        { metric: 'Mean', soilTemperature: stats.soilTemperatureMean?.toFixed(4), soilMoisture: stats.soilMoistureMean?.toFixed(4), electronicConductivity: stats.electronicConductivityMean?.toFixed(4), volumetricWaterContent: stats.volumetricWaterContentMean?.toFixed(4), salinity: stats.salinityMean?.toFixed(4) , totalSuspendedSolids: stats.totalSuspendedSolidsMean?.toFixed(4), flowVolume: stats.flowVolumeMean?.toFixed(4), nitrate: stats.nitrateMean?.toFixed(4)},
        { metric: 'Median', soilTemperature: stats.soilTemperatureMedian?.toFixed(4), soilMoisture: stats.soilMoistureMedian?.toFixed(4), electronicConductivity: stats.electronicConductivityMedian?.toFixed(4), volumetricWaterContent: stats.volumetricWaterContentMedian?.toFixed(4), salinity: stats.salinityMedian?.toFixed(4) , totalSuspendedSolids: stats.totalSuspendedSolidsMedian?.toFixed(4), flowVolume: stats.flowVolumeMedian?.toFixed(4), nitrate: stats.nitrateMedian?.toFixed(4) },
        { metric: 'Range', soilTemperature: stats.soilTemperatureRange?.toFixed(4), soilMoisture: stats.soilMoistureRange?.toFixed(4), electronicConductivity: stats.electronicConductivityRange?.toFixed(4),  volumetricWaterContent: stats.volumetricWaterContentRange?.toFixed(4), salinity: stats.salinityRange?.toFixed(4) , totalSuspendedSolids: stats.totalSuspendedSolidsRange?.toFixed(4), flowVolume: stats.flowVolumeRange?.toFixed(4), nitrate: stats.nitrateRange?.toFixed(4) },
        { metric: 'Standard Deviation', soilTemperature: stats.soilTemperatureDeviation?.toFixed(4), soilMoisture: stats.soilMoistureDeviation?.toFixed(4), electronicConductivity: stats.electronicConductivityDeviation?.toFixed(4), volumetricWaterContent: stats.volumetricWaterContentDeviation?.toFixed(4), salinity: stats.salinityDeviation?.toFixed(4) , totalSuspendedSolids: stats.totalSuspendedSolidsDeviation?.toFixed(4), flowVolume: stats.flowVolumeDeviation?.toFixed(4), nitrate: stats.nitrateDeviation?.toFixed(4) },
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
        <>
          <div className="range-chart" id="temperature">
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
          </div>
          <div className="range-chart" id="moisture">
            <h2>Moisture Range (centibars)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Dry: &gt; 200 cbar</span>
              </div>
              <div className="range low">
                <span className="label">Dry: 150 - 200 cbar</span>
              </div>
              <div className="range normal">
                <span className="label">Optimal: 100 - 150 cbar</span>
              </div>
              <div className="range high">
                <span className="label">Moist: 50 - 100 cbar</span>
              </div>
              <div className="range very-high">
                <span className="label">Very Moist: &lt; 50 cbar</span>
              </div>
            </div>
          </div>
          <div className="range-chart" id="electronic-conductivity">
            <h2>Electronic Conductivity (mS/m)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Low: &lt; 1 mS/m</span>
              </div>
              <div className="range low">
                <span className="label">Low: 1 - 2 mS/m</span>
              </div>
              <div className="range normal">
                <span className="label">Normal: 2 - 4 mS/m</span>
              </div>
              <div className="range high">
                <span className="label">High: 4 - 6 mS/m</span>
              </div>
              <div className="range very-high">
                <span className="label">Very High: &gt; 6 mS/m</span>
              </div>
            </div>
          </div>
          <div className="range-chart" id="volumetric-water-content">
            <h2>Volumetric Water Content (%)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Low: &lt; 10% dS/m</span>
              </div>
              <div className="range low">
                <span className="label">Low: 10% - 20% dS/m</span>
              </div>
              <div className="range normal">
                <span className="label">Normal: 20% - 30% dS/m</span>
              </div>
              <div className="range high">
                <span className="label">High: 30% - 40% dS/m</span>
              </div>
              <div className="range very-high">
                <span className="label">Very High: &gt; 40% dS/m</span>
              </div>
            </div>
          </div>
          <div className="range-chart" id="salinity">
            <h2>Salinity Range (ppt)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Low: &lt; 2 ppt</span>
              </div>
              <div className="range low">
                <span className="label">Low: 2 - 4 ppt</span>
              </div>
              <div className="range normal">
                <span className="label">Normal: 4 - 6 ppt</span>
              </div>
              <div className="range high">
                <span className="label">High: 6 - 8 ppt</span>
              </div>
              <div className="range very-high">
                <span className="label">Very High: &gt; 8 ppt</span>
              </div>
            </div>
          </div>
          <div className="range-chart" id="total-suspended-solids">
            <h2>Total Suspended Solids Range (mg/L)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Low: &lt; 1 mg/L</span>
              </div>
              <div className="range low">
                <span className="label">Low: 1 - 5 mg/L</span>
              </div>
              <div className="range normal">
                <span className="label">Normal: 5 - 10 mg/L</span>
              </div>
              <div className="range high">
                <span className="label">High: 10 - 20 mg/L</span>
              </div>
              <div className="range very-high">
                <span className="label">Very High: &gt; 20 mg/L</span>
              </div>
            </div>
          </div>
          <div className="range-chart" id="flow-volume">
            <h2>Flow/Volume Range (m³/s)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Low: &lt; 1 m³/s</span>
              </div>
              <div className="range low">
                <span className="label">Low: 1 - 5 m³/s</span>
              </div>
              <div className="range normal">
                <span className="label">Normal: 5 - 10 m³/s</span>
              </div>
              <div className="range high">
                <span className="label">High: 10 - 20 m³/s</span>
              </div>
              <div className="range very-high">
                <span className="label">Very High: &gt; 20 m³/s</span>
              </div>
            </div>
          </div>
          <div className="range-chart" id="nitrate">
            <h2>Nitrate Range (mg/L)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Low: &lt; 1 mg/L</span>
              </div>
              <div className="range low">
                <span className="label">Low: 1 - 5 mg/L</span>
              </div>
              <div className="range normal">
                <span className="label">Normal: 5 - 10 mg/L</span>
              </div>
              <div className="range high">
                <span className="label">High: 10 - 20 mg/L</span>
              </div>
              <div className="range very-high">
                <span className="label">Very High: &gt; 20 mg/L</span>
              </div>
            </div>
          </div>
        </>
      );
    
    function formatTimestamp(timestamp) {
        const dateObject = new Date(timestamp);
        const formattedDate = dateObject.toLocaleDateString();
        const formattedTime = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} at ${formattedTime}`;
    }

    function convertJsonToCsv(jsonData) {
        const fields = [
          'soilTemperature',
          'soilMoisture',
          'electronicConductivity',
          'volumetricWaterContent',
          'salinity',
          'totalSuspendedSolids',
          'flowVolume',
          'nitrate',
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
          FileSaver.saveAs(blob, 'soilData.csv');
        } catch (error) {
          console.error('Error while downloading CSV:', error);
        }
      }
      
      

    const soilTemperatureChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'Temperature Over Time  (°C)',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.soilTemperature) : [],
            fill: false,
            borderColor:  'rgb(255, 0, 0)',
            tension: 0.1,
          },
        ],
      };

    const soilMoistureChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'Moisture Over Time (centibars)',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.soilMoisture) : [],
            fill: false,
            borderColor: 'rgb(0, 0, 255)',
            tension: 0.1,
          },
        ],
    };

    const electronicConductivityChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'Electronic Conductivity Over Time (mS/m)',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.electronicConductivity) : [],
            fill: false,
            borderColor: 'rgb(255, 255, 0)',
            tension: 0.1,
          },
        ],
    };

    const volumetricWaterContentChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'Volumetric Water Content Over Time (%)',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.volumetricWaterContent) : [],
            fill: false,
            borderColor: 'rgb(128, 0, 128)',
            tension: 0.1,
          },
        ],
    };

    const salinityChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'Salinity Over Time (ppt)',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.salinity) : [],
            fill: false,
            borderColor: 'rgb(0, 128, 0)',
            tension: 0.1,
          },
        ],
    };

    const totalSuspendedSolidsChartData = { 
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
            {
                label: 'Total Suspended Solids Over Time (mg/L)',
                data: Array.isArray(jsonData) ? jsonData.map(item => item.totalSuspendedSolids) : [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const flowVolumeChartData = { 
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
            {
                label: 'Flow Volume Over Time (m³/s)',
                data: Array.isArray(jsonData) ? jsonData.map(item => item.flowVolume) : [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };
    
    const nitrateChartData = { 
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
            {
                label: 'Nitrate Over Time (mg/L)',
                data: Array.isArray(jsonData) ? jsonData.map(item => item.nitrate) : [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    useEffect(() => {
        
        async function postDataToBackend() {
            const url = 'http://localhost:8086/analytics-microservice/analytics/basic-soil';
            
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
                    console.log(data)
                    setStats(data)

                    if (chart) {
                        chart.destroy();
                    }
                    const canvasId = `chart-${Math.floor(Math.random() * 10000)}`;
                    // Create a new chart and set it in the state
                    const newChart = new Chart(document.getElementById(canvasId), {
                        type: 'line',
                        data: totalSuspendedSolidsChartData,salinityChartData,volumetricWaterContentChartData,electronicConductivityChartData,soilMoistureChartData,soilTemperatureChartData,flowVolumeChartData,nitrateChartData
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
            <h1>Soil Statistics</h1>
            {infoContent}
            <table className="stats-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Temperature (°C)</th>
                        <th>Moisture (centibars)</th>
                        <th>Electronic Conductivity (mS/m)</th>
                        <th>Volumetric Water Content (%)</th>
                        <th>Salinity (ppt)</th>
                        <th>Total Suspended Solids (mg/L)</th>
                        <th>Flow Volume (m³/s)</th>
                        <th>Nitrate (mg/L)</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.metric}</td>
                            <td>{row.soilTemperature}</td>
                            <td>{row.soilMoisture}</td>
                            <td>{row.electronicConductivity}</td>
                            <td>{row.volumetricWaterContent}</td>
                            <td>{row.salinity}</td>
                            <td>{row.totalSuspendedSolids}</td>
                            <td>{row.flowVolume}</td>
                            <td>{row.nitrate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br></br>
            {!isGraphOpen &&<button className="range-btn" onClick={isGraph}>Show Time Graphs</button>}
            {isGraphOpen &&  <><button className="range-btn" onClick={closeIsGraphOpen}>Close Time Graphs</button>
            <Line data={totalSuspendedSolidsChartData} />
            <Line data={salinityChartData} />
            <Line data={volumetricWaterContentChartData} />
            <Line data={electronicConductivityChartData} />
            <Line data={soilMoistureChartData} />
            <Line data={soilTemperatureChartData} />
            <Line data={flowVolumeChartData} />
            <Line data={nitrateChartData} /></>}
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
                <h1>Last Measured Soil Data for {jsonData.coordinates} at {formatTimestamp(jsonData.timestamp)}</h1>
                <h2>Temperature: <b className="unit">{jsonData.soilTemperature}</b> (°C)</h2>
                <h2>Moisture: <b className="unit">{jsonData.soilMoisture}</b> (centibars)</h2>
                <h2>Electronic Conductivity: <b className="unit">{jsonData.electronicConductivity}</b>(mS/m)</h2>
                <h2>Volumetric Water Content: <b className="unit">{jsonData.volumetricWaterContent}</b> (%)</h2>
                <h2>Salinity: <b className="unit">{jsonData.salinity}</b> (ppt)</h2>
                <h2>Total Suspended Solids: <b className="unit">{jsonData.totalSuspendedSolids}</b> (mg/L)</h2>
                <h2>Flow Volume: <b className="unit">{jsonData.flowVolume}</b>(m³/s)</h2>
                <h2>Nitrate: <b className="unit">{jsonData.nitrate}</b>(mg/L)</h2>
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

export default SoilSearch;
