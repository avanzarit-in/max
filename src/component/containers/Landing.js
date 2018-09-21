import React, { Component } from 'react';
import { Card, Icon, Image, Button, Grid, Label } from 'semantic-ui-react';
import Background from './../../image/128-216.jpg';
import NumberFormat from 'react-number-format'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default class Landing extends Component {

  render() {

    let today = moment().format("DD/MM/YYYY");

    return (
      <Card.Group itemsPerRow={2} style={{ marginTop: '100px', marginLeft: '200px', marginRight: '200px' }}>
        {/**
        <Card>
          <Card.Content >
            <Card.Header>Payments</Card.Header>
            <Card.Meta>
              <span className='date'>As on:{today}</span>
            </Card.Meta>
            <Card.Description style={{ marginTop: '20px' }}>
              <Grid columns={2}>
                <Grid.Row >
                  <Grid.Column textAlign="right">
                    Total Payment Received:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={1243445456} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button primary>
              <Icon name='money bill alternate outline' />
              View Details
           </Button>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content >
            <Card.Header>Invoices</Card.Header>
            <Card.Meta>
              <span className='date'>As on:{today}</span>
            </Card.Meta>
            <Card.Description style={{ marginTop: '20px' }}>
              <Grid columns={2}>
                <Grid.Row >
                  <Grid.Column textAlign="right">
                    Total Invoice Amount:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={1243445456} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button primary>
              <Icon name='money bill alternate outline' />
              View Details
            </Button>
          </Card.Content>
        </Card>
**/}
        <Card>
          <Card.Content >
            <Card.Header>Statement Summary</Card.Header>
            <Card.Meta>
              <span className='date'>As on:{today}</span>
            </Card.Meta>
            <Card.Description style={{ marginTop: '20px' }}>
            <Grid columns={1}>
             <Grid.Column textAlign="left">
                    Unsettled Transactions Summary Report
                  </Grid.Column>
            </Grid>
              <Grid columns={2}>
                <Grid.Row style={{ paddingBottom: '0px' }}>
                  <Grid.Column textAlign="right">
                    Payment Received:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={1243445456} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingBottom: '0px' }}>
                  <Grid.Column textAlign="right">
                    Payment Due:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={1243445456} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                  <Grid.Column textAlign="right">
                    Total Outstanding:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={1243445456} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button primary>
            <Link style={{ color: 'white' }} to={`/summary`}>View Details</Link>
            </Button>
          </Card.Content>
        </Card>

       {/** <Card>
          <Card.Content >
            <Card.Header>Detailed Statement</Card.Header>
            <Card.Meta>
              <span className='date'>As on:{today}</span>
            </Card.Meta>
            <Card.Description style={{ marginTop: '20px' }}>
              <Grid columns={2}>
                <Grid.Row style={{ paddingBottom: '0px' }}>
                  <Grid.Column textAlign="right">
                    Carry Forward Balance:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={1243445456} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row >
                <Grid.Row style={{ paddingBottom: '0px' }}>
                  <Grid.Column textAlign="right">
                    Payment Received:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={1243445456} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingBottom: '0px' }}>
                  <Grid.Column textAlign="right">
                    Payment Due:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={1243445456} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                  <Grid.Column textAlign="right">
                    Outstanding Balance:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={1243445456} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
             <Button primary>
            <Link style={{ color: 'white' }} to={`/statement`}>View Details</Link>
            </Button>
          </Card.Content>
        </Card> **/}
      </Card.Group>
    );
  }
}
