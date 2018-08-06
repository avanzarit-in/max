import React, { Component } from 'react'
import { Grid, Button, Icon } from 'semantic-ui-react'
import CalendarView from './view/calendarView/CalendarView'
import MonthsView from './view/MonthsView'
import YearView from './view/YearView'
import moment from 'moment'
import Utils from './../../utils/Utils'

export default class AbsoluteCalendarBody extends Component {
    state =
    {
        mode: 'calendar',
        internalStateChange:false,
        date: moment(),
    };


    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.hasErrors) {
            return false;
        }
        return true;
    }

    setDate = (e, date) => {
        console.log("date String =>" + date.format("YYYY/MM/DD"));
        this.setState({internalStateChange:false});
        this.props.callback(e, date);
    }

    changeTitle = (event, year, month) => {
        if (this.state.mode === "month") {
            this.setState({ mode: "calendar" });
        } else if (this.state.mode === "year") {
            this.setState({ mode: "month" });
        }
        this.setState({ date: moment([year, month, this.state.date.get('date')]),internalStateChange:true });
    }

    changeMode = (e, year, month) => {
        if (this.state.mode === "calendar") {
            this.setState({ mode: "month",internalStateChange:true })
        } else if (this.state.mode === "month") {
            this.setState({ mode: "year",internalStateChange:true })
        }
    }

    decMonth = (event, date) => {
        if (this.state.mode === 'month') {
            date.add(-1, 'year');
        } else {
            date.add(-1, 'month');
        }
        this.setState({ date: date,internalStateChange:true });
    }

    incMonth = (event, date) => {
        if (this.state.mode === 'month') {
            date.add(1, 'year');
        } else {
            date.add(1, 'month');
        }
        this.setState({ date: date,internalStateChange:true });
    }

    render() {
            console.log("AbsoluteCalendarBody component : render called "+this.state.internalStateChange);
        let date = moment(this.props.date,["YYYY/MM/DD"],true);
        if(this.state.internalStateChange){
            date=this.state.date;
        }
console.log(date.format("YYYY/MM/DD"))
        let displayText = Utils.Months.getMonthText(date.get('month')) + " " + date.get('year');
            
        if (this.state.mode === "month") {
            displayText = date.get('year')
        } else if (this.state.mode === "year") {
            displayText = "2015 - 2018"
        }

        return (
            <div>
                <Grid centered>
                    <Icon name="angle left" style={{ paddingTop: '3px', marginRight: '10px', cursor: 'pointer' }} onClick={(e) => this.decMonth(e, date)} />
                    <Button size="tiny" onClick={(e) => this.changeMode(e, date)}>
                        {displayText}
                    </Button>
                    <Icon name="angle right" style={{ paddingTop: '3px', cursor: 'pointer' }} onClick={(e) => this.incMonth(e, date)} />
                </Grid>

                {(this.state.mode === "calendar") ?
                    <CalendarView
                        inputDate={this.props.date}
                        date={date}
                        type={this.props.type}
                        otherDate={this.props.otherDate}
                        callback={this.setDate}
                    /> :
                    (this.state.mode === "month") ?
                        <MonthsView date={date}
                            changeTitle={this.changeTitle}
                        /> :
                        (this.state.mode === "year") ?
                            <YearView date={date} changeTitle={this.changeTitle}
                            /> :
                            null}
            </div>
        )
    }
}