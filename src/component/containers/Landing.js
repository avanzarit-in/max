import React, { Component } from 'react';
import { Card, Icon, Image, Button, Grid, Label ,Dimmer,Loader} from 'semantic-ui-react';
import Background from './../../image/128-216.jpg';
import NumberFormat from 'react-number-format'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Api from './../utils/Api'

export default class Landing extends Component {
  constructor(props) {
        super(props);
        this.state = {
            fromDate: moment([2017, 3, 1]),
            toDate: moment(),
            paymentDue: 0,
            paymentReceived: 0,
            dataloaded:false
        }
    }

    calculateAmounts = (data) => {
        let paymentDue = 0;
        let paymentReceived = 0;
        let result = {};

        if (data !== undefined) {
            let payload = data.filter(item => {

                if (item.CD === undefined || item.CD === "") {
                    paymentDue = paymentDue + parseInt(item.D);
                    paymentReceived = paymentReceived + parseInt(item.C);
                    result.paymentDue = paymentDue;
                    result.paymentReceived = paymentReceived;

                    return true;
                }

                return false;
            })
        }

        return result;
    }

    componentDidMount() {
        let fromDate = this.state.fromDate.format('DD.MM.YYYY');
        let toDate = this.state.toDate.format('DD.MM.YYYY');
        console.log("component did mount called");
        let statementData = "";
        Api.getCustomer(this.props.username).then(userDisplayName => {
            let displayName = userDisplayName;
            console.log(displayName);
            Api.fetchStatementData(this.props.username, "summary", fromDate, toDate).then(statementData => {
                console.log(statementData);
                let result = this.calculateAmounts(statementData);
                this.setState(
                    {
                        paymentDue: result.paymentDue,
                        paymentReceived: result.paymentReceived,
                        dataloaded:true
                    });
            }, error => {
                console.log("ERROR ==>" + error.type);
            })

        }, error => {
            console.log("ERROR ==>" + error.type);
        })
    }

    handleButtonClick =() => {
      console.log(this.props);
    this.props.history.push('/summary');
  }


  render() {

    let today = moment().format("DD/MM/YYYY");
    let netOutstanding = parseInt(this.state.paymentDue) - parseInt(this.state.paymentReceived);

    return (
      this.state.dataloaded ?
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
                    <NumberFormat prefix={'Rs.'} value={this.state.paymentReceived} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingBottom: '0px' }}>
                  <Grid.Column textAlign="right">
                    Payment Due:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={this.state.paymentDue} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                  <Grid.Column textAlign="right">
                    Total Outstanding:
                  </Grid.Column>
                  <Grid.Column>
                    <NumberFormat prefix={'Rs.'} value={netOutstanding} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button primary onClick={this.handleButtonClick}>
        {/**    <Link style={{ color: 'white' }} to={`/summary`}>View Details</Link> **/}
        View Details
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
       :
            <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
    );
  }
}
