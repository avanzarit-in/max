import React from 'react';
import ActionContentTitle from './ActionContentTitle';
import Calendar from './../calendar/Calendar';
import Download from './../download/Download';

const ActionContent = (props) => {

    return (
        <div>
            <ActionContentTitle title={props.title} close={props.close} />
            {(props.name === "calendar") ? <Calendar /> :
                (props.name === "download") ? <Download /> :
                    null}
        </div>
    );

}
export default ActionContent;