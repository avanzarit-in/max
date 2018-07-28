import React from 'react'
import {Grid,Button} from 'semantic-ui-react'
const Footer = (props) => {
    console.log(props.fromDate);
    console.log(props.toDate);
    return (
        <Grid columns={16} >
           <Grid.Row >
                <Grid.Column width={12} textAlign="right" verticalAlign="middle">
                    Some Error message
                            </Grid.Column >
                <Grid.Column width={4} textAlign="right">
                    <Button primary>Submit</Button>
                </Grid.Column >
            </Grid.Row>
        </Grid>
    );
}

export default Footer;