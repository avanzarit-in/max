import React from 'react'
import { Grid } from 'semantic-ui-react'
import WeekDayItem from './WeekDayItem'
import DateItem from './DateItem'
import moment from 'moment'
import Utils from './../../../../utils/Utils'

const CalendarView = (props) => {
    let defaultWeekDayColor = "red";
    let defaultWeekDaySize = "small";
    let today = new Date();

    let dateValues = Utils.generateCalendarData(new Date(props.selectedYear, props.selectedMonth, 1));
    console.log("CalanderView component : render called");

    return (

        <Grid columns={16} centered  >
            <Grid.Row style={{ paddingBottom: '0px' }}>
                {Utils.WeekDayValues.map((item, index) => {
                    return (
                        <Grid.Column key={index}>
                            <WeekDayItem color={defaultWeekDayColor} size={defaultWeekDaySize} value={item} />
                        </Grid.Column>
                    )
                })
                }
            </Grid.Row >
            {dateValues.map((item, index) => {
                let otherDate = moment(props.otherDate, ["YYYY/MM/DD"], true);
                let referenceDate = moment(new Date(props.selectedYear, props.selectedMonth, props.selectedDate));
          
                let type = props.type;
                return (
                    <Grid.Row key={index} style={{ paddingTop: '2px', paddingBottom: '0px' }}>
                        {
                            item.map((value, index) => {
                                let color = "black";
                                let disabled = false;
                                let thisDay = moment(new Date(props.selectedYear, props.selectedMonth, parseInt(value, 10)));
                                if (thisDay) {
                                    if (today < thisDay) {
                                        disabled = true;
                                        color = "grey";
                                    }
                                    else if (type === "to-date-calendar" && thisDay.isBefore(otherDate)) {
                                        disabled = true;
                                        color = "grey";
                                    } else if (type === "to-date-calendar" && thisDay.isBefore(referenceDate) && thisDay.isSameOrAfter(otherDate)) {
                                        if (thisDay.isSame(otherDate)) {
                                            color = "blue"
                                        } else {
                                            color = "teal";
                                        }
                                    } else if (type === "from-date-calendar" && thisDay.isAfter(referenceDate) && thisDay.isSameOrBefore(otherDate)) {
                                        
                                        if (thisDay.isSame(otherDate)) {
                                             color = "blue"
                                        } else {
                                            color = "teal";
                                        }
                                    } else if (today >= thisDay && props.selectedDate === parseInt(value, 10)) {
                                        color = "blue";
                                        disabled = true;
                                    }
                                }


                                return (
                                    <Grid.Column key={value + "-" + index}>
                                        {(value !== "") ? <DateItem {...props} disabled={disabled} color={color} value={value} /> : ""}
                                    </Grid.Column>
                                );
                            })
                        }
                    </Grid.Row>
                );
            })
            }
        </Grid>
    )
}

export default CalendarView;