import React from 'react';
import AppContent from './../appcontent/AppContent';
import LeftNav from './../LeftNav'

const Main = (props) => {
    return (
        <div>
            <div style={{ position: 'fixed', top: '0', left: '0', height: '100%', width: '50px' }}>
                <LeftNav />
            </div>
            <div style={{ marginLeft: '50px' }}>
                <AppContent />

            </div>
        </div>
    );
}

export default Main;