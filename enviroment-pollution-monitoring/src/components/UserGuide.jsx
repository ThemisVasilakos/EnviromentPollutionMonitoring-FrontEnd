import React from 'react';
import "../styles/UserGuide.css";

function UserGuide() {
    return (
        <div className="user-guide">
            <div className="centered-text">
                <h1 className="user-guide-text">Environment Pollution Monitoring</h1>
                <h2 className="user-guide-text">Taking Control of the environment we live</h2>
                <h3 className="h3-home">How we do it?</h3>
                <h4 className="h4-home">We place IoT sensors in different locations that constantly measure data for air, water and soil. The available data can be explained
                     <a className="expl" href="/data-explained"> here</a>.</h4>
                     <div className="image-container">
                        <img src="/home2.png" alt="App Image" className="rounded-image" />
                        <img src="/home1.png" alt="App Image 2" className="rounded-image" />
                     </div>
                <h3 className="h3-home">How to use the app:</h3>
                <h4 className="h4-home">You can search via location in the navbar above, by choosing between live and history data for comparison.
                    <br></br>
                    Finally, click the alert button in order to be notified of your desired values in a specific location.
                </h4>
            </div>
        </div>
    );
}

export default UserGuide;
