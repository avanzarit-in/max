import React from 'react';
import { Label } from 'semantic-ui-react';

const DateItem = (props) => {
    let size = "tiny";
    let disabled=false;

    let year = parseInt(props.selectedYear, 10);
    let month = parseInt(props.selectedMonth, 10)-1;
    let today = new Date();
    let thisDay = new Date(year, month, parseInt(props.value));
   
    if (today < thisDay) {
        disabled=true;
    }  

  console.log("Dateitem component : render called");
    return (
        (!disabled)?<Label as="a" size={size} color="black" onClick={()=>props.callback(props.value)}>{props.value}</Label>:
        <Label as="a" style={{cursor:'not-allowed'}} size={size} color="grey">{props.value}</Label>
    );
}

export default DateItem;