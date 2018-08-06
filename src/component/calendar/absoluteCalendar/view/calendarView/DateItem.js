import React from 'react';
import { Label } from 'semantic-ui-react';
import moment from 'moment'

const DateItem = (props) => {
    let size = "tiny";

    let onDateClick = (e,selectedYear,selectedMonth,selectedDate) =>{
        let date=moment([selectedYear,selectedMonth,selectedDate]);
        props.callback(e,date);
    }
  //  console.log("Dateitem component : render called");
    return (
        (!props.disabled) ? <Label as="a" size={size} color={props.color} onClick={(e) => onDateClick(e,props.date.get('year'),props.date.get('month'),parseInt(props.value,10))}>{props.value}</Label> :
            <Label as="a" style={{ cursor: 'not-allowed' }} size={size} color={props.color}>{props.value}</Label>
    );
}

export default DateItem;