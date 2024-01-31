import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import '../styles/WaterSearch.css';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2'; 
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import FileSaver from 'file-saver';

function WaterSearch(props) {
    const [chart, setChart] = useState(null);
    const location = useLocation();
    const jsonData = location.state?.data || {};
    const [stats, setStats] = useState([]);

    const tableData = [
        { metric: 'Mean', dissolvedOxygen: stats.dissolvedOxygenMean?.toFixed(4), oxidationReductionPotential: stats.oxidationReductionPotentialMean?.toFixed(4), ph: stats.phmean?.toFixed(4), turbidity: stats.turbidityMean?.toFixed(4), totalDissolvedSolids: stats.totalDissolvedSolidsMean?.toFixed(4) , temperature: stats.temperatureMean?.toFixed(4)},
        { metric: 'Median', dissolvedOxygen: stats.dissolvedOxygenMedian?.toFixed(4), oxidationReductionPotential: stats.oxidationReductionPotentialMedian?.toFixed(4), ph: stats.phmedian?.toFixed(4), turbidity: stats.turbidityMedian?.toFixed(4), totalDissolvedSolids: stats.totalDissolvedSolidsMedian?.toFixed(4) , temperature: stats.temperatureMedian?.toFixed(4) },
        { metric: 'Range', dissolvedOxygen: stats.dissolvedOxygenRange?.toFixed(4), oxidationReductionPotential: stats.oxidationReductionPotentialRange?.toFixed(4), ph: stats.phrange?.toFixed(4),  turbidity: stats.turbidityRange?.toFixed(4), totalDissolvedSolids: stats.totalDissolvedSolidsRange?.toFixed(4) , temperature: stats.temperatureRange?.toFixed(4) },
        { metric: 'Standard Deviation', dissolvedOxygen: stats.dissolvedOxygenDeviation?.toFixed(4), oxidationReductionPotential: stats.oxidationReductionPotentialDeviation?.toFixed(4), ph: stats.phdeviation?.toFixed(4), turbidity: stats.turbidityDeviation?.toFixed(4), totalDissolvedSolids: stats.totalDissolvedSolidsDeviation?.toFixed(4) , temperature: stats.temperatureDeviation?.toFixed(4) },
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
          <div className="range-chart" id="dissolved-oxygen">
            <h2>Dissolved Oxygen Range (mg/L)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Low: &lt; 2 mg/L</span>
              </div>
              <div className="range low">
                <span className="label">Low: 2 - 4 mg/L</span>
              </div>
              <div className="range normal">
                <span className="label">Normal: 4 - 6 mg/L</span>
              </div>
              <div className="range high">
                <span className="label">High: 6 - 8 mg/L</span>
              </div>
              <div className="range very-high">
                <span className="label">Very High: &gt; 8 mg/L</span>
              </div>
            </div>
          </div>
          <div className="range-chart" id="oxidation-reduction-potential">
            <h2>Oxidation Reduction Potential (mV)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Low: &lt; -200 mV</span>
              </div>
              <div className="range low">
                <span className="label">Low: -200 to -100 mV</span>
              </div>
              <div className="range normal">
                <span className="label">Normal: -100 to 100 mV</span>
              </div>
              <div className="range high">
                <span className="label">High: 100 to 200 mV</span>
              </div>
              <div className="range very-high">
                <span className="label">Very High: &gt; 200 mV</span>
              </div>
            </div>
          </div>
          <div className="range-chart" id="ph">
            <h2>pH Range</h2>
            <br></br>
            <div className="range-bar">
                <div className="range very-acidic">
                <span className="label">Very Acidic: &lt; 3</span>
                </div>
                <div className="range acidic">
                <span className="label">Acidic: 3 - 6</span>
                </div>
                <div className="range neutral">
                <span className="label">Neutral: 6 - 8</span>
                </div>
                <div className="range alkaline">
                <span className="label">Alkaline: 8 - 11</span>
                </div>
                <div className="range very-alkaline">
                <span className="label">Very Alkaline: &gt; 11</span>
                </div>
            </div>
            </div>
          <div className="range-chart" id="turbidity">
            <h2>Turbidity Range (NTU)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Low: &lt; 1 NTU</span>
              </div>
              <div className="range low">
                <span className="label">Low: 1 - 5 NTU</span>
              </div>
              <div className="range normal">
                <span className="label">Normal: 5 - 10 NTU</span>
              </div>
              <div className="range high">
                <span className="label">High: 10 - 20 NTU</span>
              </div>
              <div className="range very-high">
                <span className="label">Very High: &gt; 20 NTU</span>
              </div>
            </div>
          </div>
          <div className="range-chart" id="total-dissolved-solids">
            <h2>Total Dissolved Solids Range (mg/L)</h2>
            <br></br>
            <div className="range-bar">
              <div className="range very-low">
                <span className="label">Very Low: &lt; 100 mg/L</span>
              </div>
              <div className="range low">
                <span className="label">Low: 100 - 300 mg/L</span>
              </div>
              <div className="range normal">
                <span className="label">Normal: 300 - 600 mg/L</span>
              </div>
              <div className="range high">
                <span className="label">High: 600 - 1000 mg/L</span>
              </div>
              <div className="range very-high">
                <span className="label">Very High: &gt; 1000 mg/L</span>
              </div>
            </div>
          </div>
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
          'dissolvedOxygen',
          'oxidationReductionPotential',
          'ph',
          'turbidity',
          'totalDissolvedSolids',
          'temperature',
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
          FileSaver.saveAs(blob, 'waterData.csv');
        } catch (error) {
          console.error('Error while downloading CSV:', error);
        }
      }
      
      

    const dissolvedOxygenChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'Dissolved Oxygen (mg/L) Over Time',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.dissolvedOxygen) : [],
            fill: false,
            borderColor:  'rgb(255, 0, 0)',
            tension: 0.1,
          },
        ],
      };

    const oxidationReductionPotentialChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'Oxidation Reduction Potential (mV) Over Time',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.oxidationReductionPotential) : [],
            fill: false,
            borderColor: 'rgb(0, 0, 255)',
            tension: 0.1,
          },
        ],
    };

    const pHChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'PH Over Time',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.ph) : [],
            fill: false,
            borderColor: 'rgb(255, 255, 0)',
            tension: 0.1,
          },
        ],
    };

    const turbidityChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'Turbidity (NTU) Over Time',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.turbidity) : [],
            fill: false,
            borderColor: 'rgb(128, 0, 128)',
            tension: 0.1,
          },
        ],
    };

    const totalDissolvedSolidsChartData = {
        labels: Array.isArray(jsonData) ? jsonData.map(item => formatTimestamp(item.timestamp)) : [],
        datasets: [
          {
            label: 'Total Dissolved Solids (mg/L) Over Time',
            data: Array.isArray(jsonData) ? jsonData.map(item => item.totalDissolvedSolids) : [],
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
                data: Array.isArray(jsonData) ? jsonData.map(item => item.temperature) : [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };
          
    useEffect(() => {
        
        async function postDataToBackend() {
            const url = 'http://localhost:8086/analytics-microservice/analytics/basic-water';
            
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
                        data: temperatureChartData,totalDissolvedSolidsChartData,turbidityChartData,pHChartData,oxidationReductionPotentialChartData,dissolvedOxygenChartData
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
            <h1>Water Statistics</h1>
            {infoContent}
            <table className="stats-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Dissolved Oxygen (mg/L)</th>
                        <th>Oxidation Reduction Potential (mV)</th>
                        <th>PH</th>
                        <th>Turbidity (NTU)</th>
                        <th>Total Dissolved Solids (mg/L)</th>
                        <th>Temperature (°C)</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.metric}</td>
                            <td>{row.dissolvedOxygen}</td>
                            <td>{row.oxidationReductionPotential}</td>
                            <td>{row.ph}</td>
                            <td>{row.turbidity}</td>
                            <td>{row.totalDissolvedSolids}</td>
                            <td>{row.temperature}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br></br>
            {!isGraphOpen &&<button className="range-btn" onClick={isGraph}>Show Time Graphs</button>}
            {isGraphOpen &&  <><button className="range-btn" onClick={closeIsGraphOpen}>Close Time Graphs</button>
            <Line data={temperatureChartData} />
            <Line data={totalDissolvedSolidsChartData} />
            <Line data={turbidityChartData} />
            <Line data={pHChartData} />
            <Line data={oxidationReductionPotentialChartData} />
            <Line data={dissolvedOxygenChartData} /> </>}
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
                <h1>Last Measured Water Data for {jsonData.coordinates} at {formatTimestamp(jsonData.timestamp)}</h1>
                <h2>Dissolved Oxygen: <b className="unit">{jsonData.dissolvedOxygen}</b> mg/L</h2>
                <h2>Oxidation Reduction Potential: <b className="unit">{jsonData.oxidationReductionPotential}</b> mV</h2>
                <h2>PH: <b className="unit">{jsonData.ph}</b></h2>
                <h2>Turbidity: <b className="unit">{jsonData.turbidity}</b> NTU</h2>
                <h2>Total Dissolved Solids: <b className="unit">{jsonData.totalDissolvedSolids}</b> mg/L</h2>
                <h2>Temperature: <b className="unit">{jsonData.temperature}</b> °C</h2>
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

export default WaterSearch;
