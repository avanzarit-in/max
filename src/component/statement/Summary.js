import React, { Component } from 'react';
import { Grid, Menu, Segment, Header, Button, Icon, Label, Form, Table, Sticky, Visibility, Modal, Popup, Pagination, Dimmer, Loader, Dropdown } from 'semantic-ui-react';
import moment from 'moment'
import Calendar from './../calendar/Calendar';
import Download from './../download/Download';
import data from './../data/Data.json'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

const pageSizeOptions = [
    {
        text: '20',
        value: 20
    },
    {
        text: '50',
        value: 50
    },
    {
        text: '100',
        value: 100
    }

]

export default class AppContent extends Component {

    constructor(props) {
        super(props);


    }

    state = {
        activeItem: '',
        dataloaded: false,
        fromDate:  moment([2017, 0, 1]),
        toDate: moment(),
        broughtForwardBalance: 0,
        customerName: "Avanzar IT",
        sapId: "AP01008",
        calendarModalOpen: false,
        downloadModalOpen: false,
        pageSize: 20,
        activePage: 1,
        data: {},
        paymentDue: 0,
        paymentReceived: 0
    }

    handleCalendarOpen = () => this.setState({ calendarModalOpen: true })

    handleCalendarClose = () => this.setState({ calendarModalOpen: false })

    handleDownloadOpen = () => this.setState({ downloadModalOpen: true })

    handleDownloadClose = () => this.setState({ downloadModalOpen: false })

    onPageChange = (e, { activePage }) => {
        console.log("setting active page to =>" + activePage);
        this.setState({ activePage: activePage });
    }

    setPageSize = (e, { value }) => {

        this.setState((prevState, props) => {
            if (prevState.pageSize !== value) {

                return { ...prevState, pageSize: value, activePage: 1 }
            }
            return prevState;
        })
    }

    updateStateWithData = (data) => {
        let paymentDue = 0;
        let paymentReceived = 0;
        let payload = data.payload.filter(item => {
            if (item[1] === undefined || item[1] === "") {
                paymentDue = paymentDue + parseInt(item[5]);
                paymentReceived = paymentReceived + parseInt(item[6]);
                return true;

            }
            return false;
        })

        this.setState({ data: { payload: payload }, dataloaded: true, paymentDue: paymentDue, paymentReceived: paymentReceived });
    }

    componentDidMount() {
   let fromDate=this.state.fromDate.format('DD.MM.YYYY');
        let toDate=this.state.toDate.format('DD.MM.YYYY');
        console.log("component did mount called");
        let statementData = "";
        axios.get("http://localhost:8080/query",{params: {
      custId: this.state.sapId,
      fromDate:fromDate,
      toDate:toDate
    }}).then(res => {
            statementData = res.data;
            this.updateStateWithData(statementData)

        }).catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            statementData = { ...data };
            console.log(statementData);
            this.updateStateWithData(statementData)
            console.log(error.config);
        });
    }

    render() {

        const { activeItem } = this.state
        let { pageSize, data } = this.state;
        let startIndex = (this.state.activePage - 1) * this.state.pageSize;
        let endIndex = startIndex + pageSize - 1;
        console.log("Indexes =>", startIndex + " " + endIndex);
        let netOutstanding = parseInt(this.state.paymentDue) - parseInt(this.state.paymentReceived);

        return (
            this.state.dataloaded ?
                <div ref={this.handleContextRef}>

                    <Menu borderless pointing attached="top"  >
                         <Menu.Menu position="right">
                            <Menu.Item>
                                <span>
                                    Page Size {' '}
                                    <Dropdown inline
                                        options={pageSizeOptions}
                                        defaultValue={pageSizeOptions[0].value} onChange={this.setPageSize} />
                                </span>
                            </Menu.Item>
                            <Menu.Item name='pagination'>
                                {data.payload.length > 0 ?
                                    <Pagination activePage={this.state.activePage} totalPages={Math.ceil(data.payload.length / this.state.pageSize)} onPageChange={this.onPageChange} />
                                    : null
                                }
                            </Menu.Item>
                            <Menu.Item name='detailed'>
                                <Button primary icon labelPosition='left'>
                                    <Icon name='dochub' />
                                    <Link style={{ color: 'white' }} to={`/statement`}>View Detailed Statement</Link>
                                </Button>
                            </Menu.Item>

                        </Menu.Menu>
                    </Menu>

                    <Segment attached >
                        <Grid columns='equal'>
                            <Grid.Column>
                                <Segment basic>  <Header
                                    as='h3'
                                    content={'Customer Name: ' + this.state.customerName}
                                    subheader={'SAP Customer Id : ' + this.state.sapId}
                                /></Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic><Header
                                    as='h3'
                                    content={'Payment Received: ' + this.state.paymentReceived}
                                    subheader={' '}
                                /></Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic><Header
                                    as='h3'
                                    content={'Payment Due: ' + this.state.paymentDue}

                                /></Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic><Header
                                    as='h3'
                                    content={'Total Outstanding: ' + netOutstanding}

                                /></Segment>
                            </Grid.Column>
                        </Grid>
                    </Segment>


                    <Segment attached="bottom" basic >
                        <Table striped fixed singleLine celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Doc. Ref</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.HeaderCell>Perticulars</Table.HeaderCell>
                                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                                    <Table.HeaderCell>Debit</Table.HeaderCell>
                                    <Table.HeaderCell>Credit</Table.HeaderCell>
                                    <Table.HeaderCell>Cum. Balance</Table.HeaderCell>

                                </Table.Row>
                            </Table.Header>

                            <Table.Body style={{ fontSize: 'smaller' }} >
                                {data.payload.filter((item, index) => {
                                    if (index >= startIndex && index <= endIndex) {
                                        return true;
                                    }
                                    return false;

                                }).map((item, counter) => {
                                    return (<Table.Row key={counter}>
                                        {item.map((item, index) => {
                                            if (index !== 1 && index !== 8) {
                                                return (<Table.Cell title={[
                                                    item
                                                ].join(' ')} key={index}>{item}</Table.Cell>)
                                            }
                                        })}

                                    </Table.Row>
                                    );
                                })}

                            </Table.Body>
                            <Table.Footer fullWidth>

                                <Table.Row textAlign="right">

                                </Table.Row>

                            </Table.Footer>
                        </Table>
                    </Segment>
                </div>
                : <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
        );
    }
}
