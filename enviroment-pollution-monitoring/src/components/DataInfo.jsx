import Navbar from './Navbar.jsx'
import "../styles/DataInfo.css";

function DataInfo() {
    return (
        <div className="data-info">
            <Navbar />
            <div className="centered-text">
                <h1 className="data-info-text">Explaining data</h1>
                <h2 className="data-info-text">What kind of data do the IoT sensors measure?</h2>
                <h3 className="h3-data">About Air data:</h3>
                <div className="data-ul-text">
                    <p><b>- Temperature:</b> a measure of the temperature or coolness of the air. Measured in degrees Celsius (°C) or Fahrenheit (°F). </p>
                    <p><b>- Humidity:</b> refers to the amount of water vapor present in the air. It is usually expressed as a percentage. High humidity indicates more moisture in the air, while low humidity indicates drier air.</p>
                    <p><b>- CO2:</b> is a colorless and odorless gas that is naturally present in the Earth's atmosphere. It is produced by the respiration of living organisms and by the burning of fossil fuels. Monitoring CO2 levels is important indoors to ensure good air quality.</p>
                    <p><b>- VOCs:</b>   are a group of organic chemicals that can easily evaporate into the air. They are emitted from a variety of sources including household products, paints, cleaning products and building materials. Some VOCs can contribute to air pollution and have potential health effects.</p>
                    <p><b>- PM2.5:</b>   refers to microparticles with a diameter of 2.5 micrometres or less. These particles can come from a variety of sources, such as vehicle exhaust, industrial emissions and the combustion of fossil fuels. PM2.5 is of concern because it can penetrate deep into the respiratory system and have adverse health effects.</p>
                    <p><b>- CO:</b>   is a colourless and odourless gas formed when carbon-containing fuels (such as petrol, wood or natural gas) are burnt incompletely.High levels of carbon monoxide can be dangerous as it can affect the body's ability to carry oxygen.</p>
                </div>
                <h3 className="h3-data">About Water data:</h3>
                <div className="data-ul-text">
                    <p><b>- Dissolved oxygen:</b> refers to the amount of oxygen gas dissolved in water, measured in mg/L. It is vital for the survival of aquatic organisms. Adequate levels of dissolved oxygen support fish and other aquatic organisms, while low levels can lead to hypoxia, damaging aquatic ecosystems.</p>
                    <p><b>- Oxidation reduction potential:</b>  a measure of the ability of a solution to oxidise or reduce substances, measured in mV. In the context of water quality, it provides information on the overall chemical activity and the ability of water to gain or lose electrons. ORP is often used to evaluate the efficiency of water treatment processes.</p>
                    <p><b>- PH:</b> a measure of the acidity or alkalinity of a solution. It is based on a scale of 0 to 14, where a pH of 7 is neutral, values below 7 are acidic, and values above 7 are alkaline. The pH of water is an important parameter as it can affect chemical reactions, nutrient availability and the health of aquatic organisms.</p>
                    <p><b>- Turbidity:</b> a measure of the cloudiness or turbidity of a liquid caused by a large number of individual particles, usually measured in NTU. In water, turbidity is often caused by suspended solids such as silt, clay and organic matter. High turbidity can interfere with light penetration, which can affect the growth of aquatic plants and the overall health of aquatic ecosystems.</p>
                    <p><b>- Total dissolved solids:</b>  a measure of the total concentration of dissolved substances in water, including minerals, salts and organic matter. Usually expressed in parts per million (ppm) or milligrams per liter (mg/L). High levels of TDS can affect the taste of water and may indicate contamination.</p>
                    <p><b>- Temperature:</b> a fundamental parameter that can affect various physical and biological processes in aquatic ecosystems. It affects the solubility of gases, the metabolic rates of aquatic organisms and the overall health of aquatic ecosystems. Temperature is frequently monitored to assess the suitability of water for different uses and to detect any abnormal changes.</p>
                </div>
                <h3 className="h3-data">About Soil data:</h3>
                <div className="data-ul-text">
                    <p><b>- Temperature:</b> soil temperature refers to the temperature at a certain depth below the surface. It affects plant growth, microbial activity and nutrient availability. Monitoring it helps to understand seasonal variations and to optimize agricultural practices.</p>
                    <p><b>- Moisture:</b> a measure of the amount of water in the soil. It is often expressed in units such as centibars (cbar), which indicate the tension required to extract water from the soil. Monitoring soil moisture is vital for effective irrigation management and understanding soil water availability for plants.</p>
                    <p><b>- Electronic Conductivity:</b>  often measured in millimeters per meter (mS/m), is an indicator of the soil's ability to conduct electricity. It is related to the concentration of dissolved salts in the soil. High conductivity may indicate increased levels of salinity, affecting plant growth.</p>
                    <p><b>- Volumetric Water Content:</b> is the percentage of the volume of a soil that is occupied by water. It is often measured in deciSiemens per meter (dS/m) and is used to assess the ability of soil to conduct electricity, providing information on soil salinity.</p>
                    <p><b>- Salinity:</b> is the concentration of dissolved salts in soil or water. Excessive salinity can be detrimental to plant growth, as it affects the uptake of water by plant roots. It is usually measured in parts per thousand (ppt) or electrical conductivity (EC) units.</p>
                    <p><b>- Total Suspended Solids:</b> refers to the mass of solid particles suspended in water (mg/L). It is an important parameter for assessing water quality, as high levels of TSS can reduce light penetration, harm aquatic organisms and indicate pollution or sedimentation problems.</p>
                    <p><b>- Flow/Volume:</b> refers to the movement of water in a particular direction over time (m³/s). Monitoring flow is essential to understanding the movement of water in rivers, streams and other water bodies. It is vital for managing water resources, predicting floods and ensuring sustainable water use.</p>
                    <p><b>- Nitrate:</b> a form of nitrogen that is essential for plant growth. However, excessive levels of nitrate in soil or water can lead to environmental issues such as water pollution and eutrophication. Nitrate levels are often measured in milligrams per litre (mg/L) or parts per million (ppm).</p>
                </div>
            </div>
        </div>
    );
}

export default DataInfo;
