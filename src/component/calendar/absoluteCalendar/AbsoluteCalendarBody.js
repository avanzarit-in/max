import React, { Component } from 'react'
import { Grid, Button, Icon } from 'semantic-ui-react'
import Utils from './../../utils/Utils'
import CalendarView from './view/calendarView/CalendarView'
import MonthsView from './view/MonthsView'
import YearView from './view/YearView'

export default class AbsoluteCalendarBody extends Component {

    constructor(props) {
        super(props);
        let dateNow = new Date();
        let month = Utils.Months.get(dateNow.getMonth());
        let year = dateNow.getFullYear();

        this.state = {
            mode: "calendar",
            month: month,
            year: year
        }
    }
    changeTitle = (input) => {
        if (this.state.mode === "month") {
            let date = Utils.Months.get(parseInt(input, 10) - 1);
            this.setState({ mode: "calendar", month: date });
        } else if (this.state.mode === "year") {
            this.setState({ mode: "month", year: input });
        }
    }

    onChange = (event, data) => {
        if (this.state.mode === "calendar") {
            this.setState({ mode: "month" })
        } else if (this.state.mode === "month") {
            this.setState({ mode: "year" })
        }
    }

    decMonth = () => {
        let currentMonth = parseInt(this.state.month.value, 10) - 1;
         let currentYear = parseInt(this.state.year,10);
        let updatedMonth = Utils.Months.get(currentMonth - 1);
        if(currentMonth===0){
            updatedMonth=Utils.Months.get(11);
            currentYear--;
        }
      
        this.setState({ month: updatedMonth,year:currentYear });
    }

    incMonth = () => {
        let currentMonth = parseInt(this.state.month.value, 10) - 1;
        let currentYear = parseInt(this.state.year,10);
        let updatedMonth = Utils.Months.get(currentMonth + 1);
        if(currentMonth===11){
            updatedMonth=Utils.Months.get(0);
            currentYear++;
        }
        this.setState({ month: updatedMonth,year:currentYear });
    }
    
    //This callback method received the date selected by clicking the DateItem
    dateSelectedCallback = (dateItem) =>{
        let dateSelected=new Date(parseInt(this.state.year,10),parseInt(this.state.month.value,10)-1,parseInt(dateItem,10));
        //Propagates the selected date to the AbsoluteCalendar
        this.props.dateSelectedCallback(dateSelected);
    }

    render() {
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
                    <Icon name="angle left" style={{ paddingTop: '3px', marginRight:'10px', cursor:'pointer' }} onClick={this.decMonth} />
                    <Button size="tiny" onClick={this.onChange}>{displayText}</Button>
                    <Icon name="angle right" style={{ paddingTop: '3px', cursor:'pointer' }} onClick={this.incMonth} />
                </Grid>

                {(this.state.mode === "calendar") ? <CalendarView selectedYear={this.state.year} selectedMonth={this.state.month.value} callback={this.dateSelectedCallback} changeTitle={this.changeTitle} /> :
                    (this.state.mode === "month") ? <MonthsView selectedYear={this.state.year} changeTitle={this.changeTitle} /> :
                        (this.state.mode === "year") ? <YearView changeTitle={this.changeTitle} />
                            : null}

            </div>
        )
    }
}