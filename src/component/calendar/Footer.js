import React from 'react'
import { Grid, Button, Form, Message } from 'semantic-ui-react'
import moment from 'moment'
const Footer = (props) => {
    let fromDate = moment(props.fromDate, ["YYYY/MM/DD"], true)
    let toDate = moment(props.toDate, ["YYYY/MM/DD"], true)
    let error = props.errorFlag;
    console.log("Error Flag " + error+ " ErrorCodes "+props.errorCodes)

    console.log(fromDate.format("YYYY/MM/DD"));
    console.log(toDate.format("YYYY/MM/DD"));
    return (
        <Grid columns={16} >
            <Grid.Row >
                <Grid.Column width={12} textAlign="left" verticalAlign="middle">
                    <Form error={error} size="tiny">
                        {props.errorCodes.map((item, index) => {
                            if (item === "INVALID_DATE_RANGE") {
                                return (
                                    <Message  key={index} error>
                                     <Message.Header>Invalid Date Range</Message.Header>
                                    <b> From Date </b> should be Less Than or Equal to <b> To Date </b>.
                                    </Message>
                                );
                            } else if (item === "INVALID_FROM_DATE" || item === "INVALID_TO_DATE") {
                                return (
                                    <Message key={index} error>
                                    <Message.Header>Invalid Date Format</Message.Header>
                                    Please enter date value in <b> (YYYY/MM/DD) </b> format only.
                                    </Message>
                                );
                            }
                            return null;
                        })
                        }

                    </Form>
                </Grid.Column >
                <Grid.Column width={4} textAlign="right" verticalAlign="middle">
                    <Button primary  disabled={props.errorFlag}>Submit</Button>
                </Grid.Column >
            </Grid.Row>
        </Grid>
    );
}

export default Footer;