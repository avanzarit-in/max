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
import numeral from 'numeral';
import Api from './../utils/Api'

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
        this.state = {
            activeItem: '',
            dataloaded: false,
            fromDate: moment([2017, 0, 1]),
            toDate: moment(),
            broughtForwardBalance: 0,
            customerName: "",
            sapId: "",
            calendarModalOpen: false,
            downloadModalOpen: false,
            pageSize: 20,
            activePage: 1,
            data: {},
            paymentDue: 0,
            paymentReceived: 0
        }
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
                        customerName: displayName,
                        sapId: this.props.username,
                        data: { payload: statementData },
                        dataloaded: true,
                        paymentDue: result.paymentDue,
                        paymentReceived: result.paymentReceived
                    });
            }, error => {
                console.log("ERROR ==>" + error.type);
            })

        }, error => {
            console.log("ERROR ==>" + error.type);
        })
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
                        <Menu.Item>
                            <Segment basic>  <Header
                                as='h3'
                                content={'Customer Name: ' + this.state.customerName}
                                subheader={'SAP Customer Id : ' + this.state.sapId}
                            /></Segment>
                        </Menu.Item>
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
                                <Segment basic><Header
                                    as='h3'
                                    content={'Payment Received: ' + numeral(this.state.paymentReceived).format('(0,0.00)')}
                                    subheader={' '}
                                /></Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic><Header
                                    as='h3'
                                    content={'Payment Due: ' + numeral(this.state.paymentDue).format('(0,0.00)')}

                                /></Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic><Header
                                    as='h3'
                                    content={'Total Outstanding: ' + numeral(netOutstanding).format('(0,0.00)')}

                                /></Segment>
                            </Grid.Column>
                        </Grid>
                    </Segment>


                    <Segment attached="bottom" basic >
                        <Table striped fixed singleLine celled textAlign="center">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Doc. Ref</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.HeaderCell>Perticulars</Table.HeaderCell>
                                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                                    <Table.HeaderCell>Debit</Table.HeaderCell>
                                    <Table.HeaderCell>Credit</Table.HeaderCell>
                                    <Table.HeaderCell>Cum. Balance</Table.HeaderCell>
                                    <Table.HeaderCell>Remarks</Table.HeaderCell>
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
                                        <Table.Cell title={[item.R].join(' ')}>{item.R}</Table.Cell>
                                        <Table.Cell title={[item.DDT].join(' ')}>{item.DDT}</Table.Cell>
                                        <Table.Cell title={[item.P].join(' ')}>{item.P}</Table.Cell>
                                        <Table.Cell title={[item.Q].join(' ')}>{item.Q}</Table.Cell>
                                        <Table.Cell title={[item.D].join(' ')}>{numeral(item.D).format('(0,0.00)')}</Table.Cell>
                                        <Table.Cell title={[item.C].join(' ')}>{numeral(item.C).format('(0,0.00)')}</Table.Cell>
                                        <Table.Cell title={[item.CB].join(' ')}>{numeral(item.CB).format('(0,0.00)')}</Table.Cell>
                                        <Table.Cell title={[item.RM].join(' ')}>{item.RM}</Table.Cell>

                                    </Table.Row>
                                    );
                                })}

                            </Table.Body>
                             {data.payload.length === 0 ?
                                <Table.Footer fullWidth>
                                    <Table.Row textAlign="center">
                                        <Table.HeaderCell colSpan='8'>
                                            <Header>No Items Found</Header>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer> : null}
                        </Table>
                    </Segment>
                </div>
                : <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
        );
    }
}
