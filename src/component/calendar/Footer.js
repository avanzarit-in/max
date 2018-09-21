import React from 'react'
import { Grid, Button, Form, Message } from 'semantic-ui-react'
import moment from 'moment'
const Footer = (props) => {

    this.onButtonClick = () => {

        props.onDateChangeHandler(props.fromDate, props.toDate);

    }

    return (
        <Grid columns={16} >
            <Grid.Row >
                <Grid.Column width={12} textAlign="left" verticalAlign="middle">
                    {props.hasErrors ?
                        <Form error={props.hasErrors} size="tiny">
                            <Message error>
                                <Message.Header>Invalid Date Format</Message.Header>
                                Please enter date value in <b> (YYYY/MM/DD) </b> format only.
                            </Message>
                        </Form> : null}
                </Grid.Column >
                <Grid.Column width={4} textAlign="right" verticalAlign="middle">
                    <Button primary disabled={props.errorFlag} onClick={this.onButtonClick}>Submit</Button>
                </Grid.Column >
            </Grid.Row>
        </Grid>
    );
}

export default Footer;