import React from 'react';
import { Label } from 'semantic-ui-react';
import moment from 'moment'

const DateItem = (props) => {
    let size = "tiny";
    let onDateClick = (e,selectedYear,selectedMonth,selectedDate) =>{
        let date=moment(new Date(selectedYear,selectedMonth,selectedDate)).format("YYYY/MM/DD");
        props.callback(date);
    }
    console.log("Dateitem component : render called");
    return (
        (!props.disabled) ? <Label as="a" size={size} color={props.color} onClick={(e) => onDateClick(e,props.selectedYear,props.selectedMonth,parseInt(props.value,10))}>{props.value}</Label> :
            <Label as="a" style={{ cursor: 'not-allowed' }} size={size} color={props.color}>{props.value}</Label>
    );
}

export default DateItem;