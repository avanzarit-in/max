import React, { Component } from 'react';
import { Menu, Segment, Header, Button, Icon, Label, Form, Table, Sticky, Visibility, Modal, Popup, Pagination, Dimmer, Loader, Dropdown, Grid } from 'semantic-ui-react';
import moment from 'moment'
import Calendar from './../calendar/Calendar';
import Download from './../download/Download';
import data from './../data/Data.json'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import numeral from 'numeral'

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

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: '',
            dataloaded: false,
            fromDate: moment([2017, 3, 1]),
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

    onDateChange = (fromDate, toDate) => {
        this.setState({ fromDate: fromDate, toDate: toDate });
    }

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

    updateStateWithData = (userDisplayName, data) => {

        let paymentDue = 0;
        let paymentReceived = 0;
        let broughtForwardBalance = 0;
        data.forEach((item, index) => {
            if (index === 0) {
                let debit = parseInt(item.D);
                let credit = parseInt(item.C);
                let cumelativeBalance = parseInt(item.CB);
                if (debit === 0 && credit !== 0) {
                    broughtForwardBalance = cumelativeBalance + credit;
                } else if (credit === 0 && debit !== 0) {
                    broughtForwardBalance = cumelativeBalance - debit;
                }
            }
            paymentDue = paymentDue + parseInt(item.D);
            paymentReceived = paymentReceived + parseInt(item.C);

        })

        this.setState({ broughtForwardBalance: broughtForwardBalance, customerName: userDisplayName, sapId: this.props.username, data: { payload: data }, dataloaded: true, paymentDue: paymentDue, paymentReceived: paymentReceived });
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        //  this.setState({data:data});
        let fromDate = this.state.fromDate.format('DD.MM.YYYY');
        let toDate = this.state.toDate.format('DD.MM.YYYY');
        console.log("component did mount called");
        let statementData = "";
        console.log(this.props.username);
        axios.get('http://anmol-360348269.us-east-1.elb.amazonaws.com/api/customer', {
            params: {
                customerId: this.props.username
            },
        }, {
                headers: {
                    "x-api-key": "opensesame",
                    "Content-Type": "application/json"
                }
            }).then(res => {
                console.log(res);
                let userDisplayName = res.data.name;


                axios.get('http://anmol-360348269.us-east-1.elb.amazonaws.com/api/statement', {
                    params: {
                        customerId: this.props.username,
                        fromDate: fromDate,
                        toDate: toDate,
                        reportType:"detail"

                    },

                }, {
                        headers: {
                            "x-api-key": "opensesame",
                            "Content-Type": "application/json"
                        }
                    }).then(res => {
                        console.log(res);
                        statementData = res.data;
                        this.updateStateWithData(userDisplayName, statementData)

                    }).catch((error) => {
                        if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            console.log(error.request);
                        } else {
                            console.log('Error', error.message);
                        }
                        statementData = { ...data };
                        console.log(statementData);
                        this.updateStateWithData(userDisplayName, statementData)
                        console.log(error.config);
                    });

            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                statementData = { ...data };
                console.log(statementData);
                this.updateStateWithData(this.props.username, statementData)
                console.log(error.config);
            });

    }

    render() {
        const { activeItem } = this.state
        let { pageSize, data } = this.state;
        let startIndex = (this.state.activePage - 1) * this.state.pageSize;
        let endIndex = startIndex + pageSize - 1;
        console.log("Indexes =>", startIndex + " " + endIndex);
        let netOutstanding = parseInt(this.state.paymentDue) - parseInt(this.state.paymentReceived) + parseInt(this.state.broughtForwardBalance);

        return (
            this.state.dataloaded ?
                <div >

                    <Menu borderless pointing attached="top"  >

                        <Menu.Item header >
                            <Header as="h3" >Brough Forward Balance : {numeral(this.state.broughtForwardBalance).format('(0,0.00)')}</Header>
                        </Menu.Item>
                        <Menu.Menu position="right">
                             {data.payload.length > 0 ?
                            <Menu.Item>
                                <Pagination activePage={this.state.activePage} totalPages={Math.ceil(data.payload.length / this.state.pageSize)} onPageChange={this.onPageChange} />
                                </Menu.Item>:null}
                            <Menu.Item>
                                <span>
                                    Page Size {' '}
                                    <Dropdown inline
                                        options={pageSizeOptions}
                                        defaultValue={pageSizeOptions[0].value} onChange={this.setPageSize} />
                                </span>
                            </Menu.Item>
                            <Menu.Item
                                name='calendar'
                                active={activeItem === 'calendar'}>
                                <Form.Field inline>
                                    <Modal
                                        style={{ height: '400px' }}
                                        centered={false}
                                        closeIcon
                                        size="large"
                                        trigger={<Button primary icon labelPosition='left' onClick={this.handleCalendarOpen}><Icon name='clock' />{moment(this.state.fromDate, ["YYYY/MM/DD"], true).format("MMM Do YYYY") + " To " + moment(this.state.toDate, ['YYYY/MM/DD'], true).format("MMM Do YYYY")}</Button>}
                                        open={this.state.calendarModalOpen}
                                        onClose={this.handleCalendarClose}>
                                        <Modal.Header>Select a Time Range to view the statement of account</Modal.Header>
                                        <Modal.Content>
                                            <Calendar />
                                        </Modal.Content>
                                    </Modal>
                                </Form.Field>
                            </Menu.Item>

                            <Menu.Item
                                name='download'
                                active={activeItem === 'download'}>
                                <Modal
                                    centered={false}
                                    closeIcon
                                    size="mini"
                                    trigger={<Button icon labelPosition='left' onClick={this.handleDownloadOpen}> <Icon name='download' />Download</Button>}
                                    open={this.state.downloadModalOpen}
                                    onClose={this.handleDownloadClose}>
                                    <Modal.Header>Download Statement</Modal.Header>
                                    <Modal.Content>
                                        <Download />
                                    </Modal.Content>
                                </Modal>
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
                                        <Table.Cell title={[item.R].join(' ')} textAlign="left">{item.R}</Table.Cell>
                                        <Table.Cell title={[item.DDT].join(' ')}>{item.DDT}</Table.Cell>
                                        <Table.Cell title={[item.P].join(' ')} textAlign="left">{item.P}</Table.Cell>
                                        <Table.Cell title={[item.Q].join(' ')}>{item.Q}</Table.Cell>
                                        <Table.Cell title={[item.D].join(' ')}>{numeral(item.D).format('(0,0.00)')}</Table.Cell>
                                        <Table.Cell title={[item.C].join(' ')}>{numeral(item.C).format('(0,0.00)')}</Table.Cell>
                                        <Table.Cell title={[item.CB].join(' ')}>{numeral(item.CB).format('(0,0.00)')}</Table.Cell>
                                        <Table.Cell title={[item.RM].join(' ')} textAlign="left">{item.RM}</Table.Cell>

                                    </Table.Row>
                                    );
                                })}

                            </Table.Body>
                           
                        </Table>
                    </Segment>
                </div>
                : <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>


        );
    }
}
