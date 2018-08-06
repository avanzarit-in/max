import React from 'react'
import {Label} from 'semantic-ui-react'

const WeekDayItem = (props) => {
    //  console.log("WeekDayItem component : render called");
    return (
        <Label color={props.color} size={props.size}>{props.value}</Label>
    );
}

export default WeekDayItem;