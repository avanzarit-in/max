import React, { Component } from 'react';
import { Grid, Form, Header, Message } from 'semantic-ui-react'
import moment from 'moment'

export default class AbsoluteCalendarHeader extends Component {
    state = {
        date: moment(new Date()).format('YYYY/MM/DD'),
        error: false
    }

    //A method exposed by this component which can be called from another component to force update/render this component
    //For example this method is called by the AbsoluteCalendar component when user selects a date from the calendarView
    //to update the text box with the date selected
    setDate = (date) => {
        let inputDate = moment(date, ["YYYY/MM/DD", "YYYY/M/D", "YYYY/MM/D", "YYYY/M/DD"], true);
        if (inputDate.isValid()) {
            this.setState({ date: inputDate.format('YYYY/MM/DD') })
            this.setState({ error: false });
        }
    }

    //called from this component as user starts typing into the textfield
    onChangeCallBack = (event) => {
        let typeInDate = event.target.value;

        if (!moment(typeInDate, ["YYYY/MM/DD", "YYYY/M/D", "YYYY/MM/D", "YYYY/M/DD"], true).isValid()) {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
        }
        //pass the typed in date back to the AbsoluteCalendar component
        this.props.callback(typeInDate);
        this.setState({ date: typeInDate })
    }

    //Called on click of the setTodayDate hyperlink
    setTodaysDate = () => {
        let date = new Date();
        this.setState({ date: moment(date).format('YYYY/MM/DD') })
        this.setState({ error: false });
        //pass the typed in date back to the AbsoluteCalendar component
        this.props.callback(moment(date).format('YYYY/MM/DD'));
    }

    render() {
        console.log("AbsoluteCalendarHeader component : render called");
        return (
            <div >
                <Grid columns={16}>
                    <Grid.Row style={{ paddingBottom: '0px' }}>
                        <Grid.Column width={8}>
                            <Header size="tiny">{this.props.title}</Header>
                        </Grid.Column>
                        <Grid.Column textAlign="right" width={8}>
                            <a size="tiny" style={{ cursor: 'pointer' }} onClick={this.setTodaysDate}>Set To Now</a>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '0px' }}>
                        <Grid.Column width={16}>
                            <Form error={this.state.error} size="tiny">
                                <Form.Input placeholder='YYYY-DD-MM' onChange={(event) => this.onChangeCallBack(event)} value={this.state.date} error={this.state.error} />
                                <Message
                                    error
                                    header='Invalid Date Format'
                                    content='Please enter date value in (YYYY/MM/DD) format only.'
                                />
                            </Form>
                        </Grid.Column>
                    </Grid.Row >
                </Grid>
            </div>
        );
    }
}

