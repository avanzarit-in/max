import React from 'react';
import { Grid, Form, Header } from 'semantic-ui-react'
import moment from 'moment'

const AbsoluteCalendarHeader = (props) => {
   
    console.log("AbsoluteCalendarHeader component : render called");
    let dateFormatted = props.date;
    let date = moment(dateFormatted, ["YYYY/MM/DD"], true);
    
    if (date.isValid()) {
    dateFormatted = date.format('MMM Do YYYY');
    } 

    return (
        <div >
            <Grid columns={16}>
                <Grid.Row style={{ paddingBottom: '0px' }}>
                    <Grid.Column width={8}>
                        <Header size="tiny">{props.title}</Header>
                    </Grid.Column>
                    <Grid.Column textAlign="right" width={8}>
                        <a size="tiny" style={{ cursor: 'pointer' }} onClick={(event) => props.callback(moment(new Date(), ["YYYY/MM/DD"], true).format('YYYY/MM/DD'))}>Set To Now</a>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: '0px' }}>
                    <Grid.Column width={16}>
                        <Form error={props.errorFlag} size="tiny">
                            <Form.Input placeholder='YYYY/DD/MM' onChange={(event) => props.callback(event.target.value)} value={dateFormatted} error={props.errorFlag} />
                           
                        </Form>
                    </Grid.Column>
                </Grid.Row >
            </Grid>
        </div>
    );
}
export default AbsoluteCalendarHeader

