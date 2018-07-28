import React, { Component } from 'react'
import { Grid, Button, Icon } from 'semantic-ui-react'
import Utils from './../../utils/Utils'
import CalendarView from './view/calendarView/CalendarView'
import MonthsView from './view/MonthsView'
import YearView from './view/YearView'
import moment from 'moment'

export default class AbsoluteCalendarBody extends Component {

    constructor(props) {
        super(props);
        let dateNow = new Date();
        let month = Utils.Months.get(dateNow.getMonth());
        let year = dateNow.getFullYear();

        this.state = {
            mode: "calendar",
            month: month,
            year: year,
            date: dateNow.getDate()
        }
    }

    //This method is exposed to outside which can be called to update the state and force a rerender of the component
    setDate = (date) => {
        let formatedDate = moment(date, ["YYYY/MM/DD", "YYYY/M/D", "YYYY/MM/D", "YYYY/M/DD"], true);
        if (formatedDate.isValid()) {
            this.setState({ month: Utils.Months.get(formatedDate.get('month')) });
            this.setState({ year: formatedDate.get('year') });
            this.setState({ date: formatedDate.get('date') });
        } else {
            //unselect the previously selected date
            this.setState({ date: undefined })
        }
    }

    changeTitle = (input) => {
        if (this.state.mode === "month") {
            let date = Utils.Months.get(parseInt(input, 10) - 1);
            this.setState({ mode: "calendar", month: date });
        } else if (this.state.mode === "year") {
            this.setState({ mode: "month", year: input });
        }
        //this is done to make sure we unselect the previously selected date
        this.setState({ date: undefined })
    }

    onChange = (event, data) => {
        if (this.state.mode === "calendar") {
            this.setState({ mode: "month" })
        } else if (this.state.mode === "month") {
            this.setState({ mode: "year" })
        }
        //this is done to make sure we unselect the previously selected date
        this.setState({ date: undefined })
    }

    decMonth = () => {
        let currentMonth = parseInt(this.state.month.value, 10) - 1;
        let currentYear = parseInt(this.state.year, 10);
        let updatedMonth = Utils.Months.get(currentMonth - 1);
        if (currentMonth === 0) {
            updatedMonth = Utils.Months.get(11);
            currentYear--;
        }

        this.setState({ month: updatedMonth, year: currentYear });
        //this is done to make sure we unselect the previously selected date
        this.setState({ date: undefined })
    }

    incMonth = () => {
        let currentMonth = parseInt(this.state.month.value, 10) - 1;
        let currentYear = parseInt(this.state.year, 10);
        let updatedMonth = Utils.Months.get(currentMonth + 1);
        if (currentMonth === 11) {
            updatedMonth = Utils.Months.get(0);
            currentYear++;
        }
        this.setState({ month: updatedMonth, year: currentYear });
        //this is done to make sure we unselect the previously selected date
        this.setState({ date: undefined })
    }

    //This callback method received the date selected by clicking the DateItem
    dateSelectedCallback = (dateItem) => {
        let dateSelected = new Date(parseInt(this.state.year, 10), parseInt(this.state.month.value, 10) - 1, parseInt(dateItem, 10));
        //Propagates the selected date to the AbsoluteCalendar
        this.props.callback(dateSelected);
        //by setting the date re-render this component and all its child component so that the CalendarView can show the proper selected date in color
        this.setState({ date: parseInt(dateItem, 10) })
    }

    render() {
        console.log("From Date"+this.props.fromDate+" To Date"+this.props.toDate);
        console.log("AbsoluteCalendarBody component : render called");
        let displayText = this.state.month.text + " " + this.state.year
        if (this.state.mode === "month") {
            displayText = this.state.year
        } else if (this.state.mode === "year") {
            displayText = "2015 - 2018"
        }

        return (
            <div>
                <Grid centered>
                    <Icon name="angle left" style={{ paddingTop: '3px', marginRight: '10px', cursor: 'pointer' }} onClick={this.decMonth} />
                    <Button size="tiny" onClick={this.onChange}>{displayText}</Button>
                    <Icon name="angle right" style={{ paddingTop: '3px', cursor: 'pointer' }} onClick={this.incMonth} />
                </Grid>

                {(this.state.mode === "calendar") ? <CalendarView selectedYear={this.state.year} selectedMonth={this.state.month.value} selectedDate={this.state.date} callback={this.dateSelectedCallback} changeTitle={this.changeTitle} /> :
                    (this.state.mode === "month") ? <MonthsView selectedYear={this.state.year} changeTitle={this.changeTitle} /> :
                        (this.state.mode === "year") ? <YearView changeTitle={this.changeTitle} />
                            : null}

            </div>
        )
    }
}