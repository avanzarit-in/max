import React from 'react';
import { Grid, Form, Header,Message } from 'semantic-ui-react'
import moment from 'moment'

const AbsoluteCalendarHeader = (props) => {
    
     //  console.log("AbsoluteCalendarHeader component : render called");
    return (
        <div >
            <Grid columns={16}>
                <Grid.Row style={{ paddingBottom: '0px' }}>
                    <Grid.Column width={8}>
                        <Header size="tiny">{props.title}</Header>
                    </Grid.Column>
                    <Grid.Column textAlign="right" width={8}>
                        <a size="tiny" style={{ cursor: 'pointer' }} onClick={(event) => props.callback(event,moment(new Date(), ["YYYY/MM/DD"], true).format('YYYY/MM/DD'))}>Set To Now</a>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: '0px' }}>
                    <Grid.Column width={16}>
                        <Form error={props.hasErrors} size="tiny">
                            <Form.Input placeholder='YYYY/DD/MM' onChange={(event) => props.callback(event,event.target.value)} value={props.date} error={props.hasErrors} />
                        </Form>
                    </Grid.Column>
                </Grid.Row >
            </Grid>
        </div>
    );
}
export default AbsoluteCalendarHeader

