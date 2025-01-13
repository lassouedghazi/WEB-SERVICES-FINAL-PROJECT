import React from 'react';
import './Help.css';

const Help = () => {
    return (
        <div className="help-container">
            <div className="help-text">
                <h1 className="title">Help Section: With TuniToll : Troubles, Solved!</h1>
                <p className="intro-text">
                    Welcome to the TuniToll help section! We've got answers to all your toll device troubles. Let's make your tolling experience smoother and more fun!
                </p>
                <div className="problem-section">
                    <h2 className="problem-title">1. Lost Your Toll Device?</h2>
                    <p className="problem-text">
                        Uh-oh, lost your toll device? Don’t worry! If it goes missing or gets stolen, just use our app to notify us about your stolen toll device, and we will immediately contact Tunisie Autoroutes to resolve the issue for you.
                    </p>
                </div>
                <div className="problem-section">
                    <h2 className="problem-title">2. Technical Glitches</h2>
                    <p className="problem-text">
                        Double deduction? Or your toll device just not working? Technical glitches can be a pain, but they’re fixable! If you're charged twice, just use our app to report the issue, and we'll quickly get in touch with Tunisie Autoroutes to resolve it for you. Easy peasy!
                    </p>
                </div>
                <div className="problem-section">
                    <h2 className="problem-title">3. Unauthorized Cars in Toll Lanes</h2>
                    <p className="problem-text">
                        Stuck behind a non-toll vehicle in the toll lane? Frustrating, right? We’re working to ensure that only cars with toll devices can enter these lanes. We’ve got you covered! Use our app to report the issue, and we'll work directly with Tunisie Autoroutes to ensure smoother rides for everyone.
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default Help;
