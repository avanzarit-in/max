import React from 'react'
import { Grid } from 'semantic-ui-react'
import WeekDayItem from './WeekDayItem'
import DateItem from './DateItem'
import Utils from './../../../../utils/Utils'

const CalendarView = (props) => {
    let defaultWeekDayColor = "red";
    let defaultWeekDaySize = "small";
      let today = new Date();

    let dateValues = Utils.generateCalendarData(new Date(parseInt(props.selectedYear, 10), parseInt(props.selectedMonth, 10) - 1, 1));
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
                return (
                    <Grid.Row key={index} style={{ paddingTop: '2px', paddingBottom: '0px' }}>
                        {
                            item.map((value, index) => {
                                let color="black";
                                let disabled = false;
                                let thisDay = new Date(props.selectedYear, props.selectedMonth-1, parseInt(value, 10));
                                if (thisDay) {
                                    if (today < thisDay) {
                                        disabled = true;
                                        color="grey";
                                    }
                                }
                                if(props.selectedDate===parseInt(value, 10)){
                                    color="blue";
                                    disabled = true;
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