import React from 'react';
import './WelcomeSection.css';

const WelcomeSection = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-text">
                <h1 className="title">
                    TuniToll: Transforming Automatic Toll Collection in Tunisia
                </h1>
                <p className="intro-text">
                    Welcome to TuniToll – where toll troubles go to retire! Lost your toll sticker or device? No worries, we’ve got your back . Technical glitches? We’ll sort that out before you can say 'double deduction!' Tired of waiting behind the 'non-toll' rebels? We’ll make sure only the rightful toll-takers get through.Let’s make tolls less 'tolling' and more 'rolling'!
                </p>
            </div>
            <div className="welcome-image">
                <img src="/background.jpg" alt="Toll System" />
            </div>
        </div>
    );
};

export default WelcomeSection;
