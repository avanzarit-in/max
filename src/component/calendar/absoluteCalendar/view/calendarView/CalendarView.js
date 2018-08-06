import React from 'react'
import { Grid } from 'semantic-ui-react'
import WeekDayItem from './WeekDayItem'
import DateItem from './DateItem'
import moment from 'moment'
import Utils from './../../../../utils/Utils'

const CalendarView = (props) => {
    let defaultWeekDayColor = "red";
    let defaultWeekDaySize = "small";
    let today = moment();

    let dateValues = Utils.generateCalendarData(props.date.toDate());
    //  console.log("CalanderView component : render called");

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
                let otherDate = props.otherDate;
                let referenceDate = moment(props.inputDate, ["YYYY/MM/DD"], true);

                let type = props.type;

                return (
                    <Grid.Row key={index} style={{ paddingTop: '2px', paddingBottom: '0px' }}>
                        {
                            item.map((value, index) => {

                                let color = "grey";
                                let disabled = true;
                                let thisDay = moment([props.date.get('year'), props.date.get('month'), parseInt(value, 10)]);
                                //   if(type==="to-date-calendar"){
                                // console.log(otherDate.format("YYYY/MM/DD")+","+referenceDate.format("YYYY/MM/DD")+","+thisDay.format("YYYY/MM/DD"))
                                //   }

                                if (thisDay.isValid() && !thisDay.isAfter(today)) {


                                    if (type === "to-date-calendar") {
                                        if (thisDay.isBetween(otherDate, referenceDate, 'date')) {
                                            color = "teal";
                                            disabled = false;
                                        } else if (thisDay.isBefore(otherDate, 'date')) {
                                            color = "grey";
                                            disabled = true;
                                        }else if (thisDay.isAfter(referenceDate, 'date')) {
                                            color = "black";
                                            disabled = false;
                                        }else if(thisDay.isSame(referenceDate,'date')||thisDay.isSame(otherDate,'date')){
                                            color="blue";
                                            disabled = true;
                                        }
                                    } else if (type === "from-date-calendar") {
                                        if (thisDay.isBetween(referenceDate, otherDate, 'date')) {
                                            color = "teal";
                                            disabled = false;
                                        } else if (thisDay.isAfter(otherDate, 'date')) {
                                            color = "grey";
                                            disabled = true;
                                        } else if (thisDay.isBefore(referenceDate, 'date')) {
                                            color = "black";
                                            disabled = false;
                                        }else if(thisDay.isSame(referenceDate,'date')||thisDay.isSame(otherDate,'date')){
                                            color="blue";
                                            disabled = true;
                                        }
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