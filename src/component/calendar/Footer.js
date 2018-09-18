import React from 'react'
import { Grid, Button, Form, Message } from 'semantic-ui-react'
import moment from 'moment'
const Footer = (props) => {
    let fromDate = moment(props.fromDate, ["YYYY/MM/DD"], true)
    let toDate = moment(props.toDate, ["YYYY/MM/DD"], true)
console.log("fromDate ===>"+fromDate)
console.log("toDate ===>"+toDate)

    return (
        <Grid columns={16} >
            <Grid.Row >
                <Grid.Column width={12} textAlign="left" verticalAlign="middle">
                    {props.hasErrors?
                    <Form error={props.hasErrors} size="tiny">
                            <Message error>
                            <Message.Header>Invalid Date Format</Message.Header>
                            Please enter date value in <b> (YYYY/MM/DD) </b> format only.
                            </Message>
                    </Form>:null}
                </Grid.Column >
                <Grid.Column width={4} textAlign="right" verticalAlign="middle">
                    <Button primary disabled={props.errorFlag}>Submit</Button>
                </Grid.Column >
            </Grid.Row>
        </Grid>
    );
}

export default Footer;