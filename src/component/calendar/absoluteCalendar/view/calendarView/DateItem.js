import React from 'react';
import { Label } from 'semantic-ui-react';

const DateItem = (props) => {
    let size = "tiny";

    console.log("Dateitem component : render called");
    return (
        (!props.disabled) ? <Label as="a" size={size} color={props.color} onClick={() => props.callback(props.value)}>{props.value}</Label> :
            <Label as="a" style={{ cursor: 'not-allowed' }} size={size} color={props.color}>{props.value}</Label>
    );
}

export default DateItem;