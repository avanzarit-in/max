import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import AbsoluteCalendar from './AbsoluteCalendar'
import AbsoluteCalendarBody from './AbsoluteCalendarBody'
import AbsoluteCalendarHeader from './AbsoluteCalendarHeader'
import moment from 'moment'

export default class AbsoluteCalendarWrapper extends Component {
    state = {
        date: moment().format('YYYY/MM/DD'),
        internalStateChange: false,
        error: false
    }

    setDate = (e, dateInString) => {
        //  console.log("date String =>" + dateInString);
        let date = moment(dateInString, ["YYYY/MM/DD"], true);

        if (date.isValid()) {
            this.setState({ error: false, date: dateInString, internalStateChange: false });
            this.props.callback(date)
        } else {
            this.props.handleError();
            this.setState({ error: true, date: dateInString, internalStateChange: true });
        }
    }

    render() {
        console.log("AbsoluteCalendarWrapper component : render called");
        let date = this.state.date;
        if (!this.state.internalStateChange) {
            date = this.props.date.format("YYYY/MM/DD");
        }
        return (
            <Grid >
                <Grid.Row>
                    <Grid.Column>
                        <AbsoluteCalendarHeader hasErrors={this.state.error} date={date} callback={this.setDate} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <AbsoluteCalendarBody type={this.props.type} otherDate={this.props.otherDate} hasErrors={this.state.error} date={date} callback={this.setDate} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

