import React, { Component } from 'react'
import { Grid, Button, Icon } from 'semantic-ui-react'
import CalendarView from './view/calendarView/CalendarView'
import MonthsView from './view/MonthsView'
import YearView from './view/YearView'
import moment from 'moment'

export default class AbsoluteCalendarBody extends Component {
    state = {
        mode: "calendar"
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.errorFlag) {
            return false;
        }
        let oldDate = moment(this.props.date, ["YYYY/MM/DD"], true);
        let newDate = moment(nextProps.date, ["YYYY/MM/DD",], true);

        if ((this.state.mode !== nextState.mode)||
         (newDate.isValid() && oldDate.isValid())||
         (newDate.isValid() && !oldDate.isValid())) {
            return true;
        }   

        return false;
    }

    changeTitle = (event, year, month) => {
        if (this.state.mode === "month") {
            this.setState({ mode: "calendar" });
        } else if (this.state.mode === "year") {
            this.setState({ mode: "month" });
        }

        this.props.callback(moment(new Date(year, month, 1)).format("YYYY/MM/DD"));
    }

    changeMode = (e, year, month) => {
        if (this.state.mode === "calendar") {
            this.setState({ mode: "month" })
        } else if (this.state.mode === "month") {
            this.setState({ mode: "year" })
        }
    }

    decMonth = (event, year, month) => {
        month--;
        if (month === 0) {
            month = 11;
            year--;
        }
        let date = moment(new Date(year, month, 1));

        this.props.callback(date.format("YYYY/MM/DD"));
    }

    incMonth = (event, year, month) => {
        month++;
        if (month === 11) {
            month = 0;
            year++;
        }
        let date = moment(new Date(year, month, 1));

        this.props.callback(date.format("YYYY/MM/DD"));
    }

    render() {
        console.log("AbsoluteCalendarBody component : render called ");
        let dateFormatted = this.props.date;
        let date = moment(dateFormatted, ["YYYY/MM/DD"], true);

        let monthText = date.format('MMMM');
        let month = date.get('month');
        let year = date.get('year');
        let dateValue = date.get('date')

        let displayText = monthText + " " + year

        if (this.state.mode === "month") {
            displayText = year
        } else if (this.state.mode === "year") {
            displayText = "2015 - 2018"
        }

        return (
            <div>
                <Grid centered>
                    <Icon name="angle left" style={{ paddingTop: '3px', marginRight: '10px', cursor: 'pointer' }} onClick={(e) => this.decMonth(e, year, month)} />
                    <Button size="tiny" onClick={(e) => this.changeMode(e, year, month)}>
                        {displayText}
                    </Button>
                    <Icon name="angle right" style={{ paddingTop: '3px', cursor: 'pointer' }} onClick={(e) => this.incMonth(e, year, month)} />
                </Grid>

                {(this.state.mode === "calendar") ?
                    <CalendarView
                        selectedYear={year}
                        selectedMonth={month}
                        selectedDate={dateValue}
                        type={this.props.type}
                        otherDate={this.props.otherDate}
                        callback={this.props.callback}
                    /> :
                    (this.state.mode === "month") ?
                        <MonthsView selectedYear={year}
                            changeTitle={this.changeTitle}
                        /> :
                        (this.state.mode === "year") ?
                            <YearView selectedMonth={month} changeTitle={this.changeTitle}
                            /> :
                            null}
            </div>
        )
    }
}