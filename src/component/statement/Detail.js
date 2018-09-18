import React, { Component } from 'react';
import { Menu, Segment, Header, Button, Icon, Label, Form, Table, Sticky, Visibility, Modal, Popup, Pagination, Dimmer, Loader, Dropdown, Grid } from 'semantic-ui-react';
import moment from 'moment'
import Calendar from './../calendar/Calendar';
import Download from './../download/Download';
import data from './../data/Data.json'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
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

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: '',
            dataloaded: false,
            fromDate: moment([2017,0,1]),
            toDate: moment(),
            broughtForwardBalance: 0,
            customerName: "T.T.AGENCY",
            sapId: "AP01008",
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

    onDateChange = (fromDate,toDate) =>{
        this.setState({fromDate:fromDate,toDate:toDate});
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

    updateStateWithData = (data) => {

        let paymentDue = 0;
        let paymentReceived = 0;
        data.payload.forEach(item => {
            paymentDue = paymentDue + parseInt(item[5]);
            paymentReceived = paymentReceived + parseInt(item[6]);
        })

        this.setState({ data: data, dataloaded: true, paymentDue: paymentDue, paymentReceived: paymentReceived });
    }

    componentDidUpdate(){

    }

    componentDidMount() {
        //  this.setState({data:data});
        let fromDate=this.state.fromDate.format('DD.MM.YYYY');
        let toDate=this.state.toDate.format('DD.MM.YYYY');
        console.log("component did mount called");
        let statementData = "";
        axios.get("http://localhost:8080/query",
        {params: {
      custId: this.state.sapId,
      fromDate:fromDate,
      toDate:toDate
    }}).then(res => {
            statementData = res.data;
            this.updateStateWithData(statementData);
        }).catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                 console.log(error.response.data);
                 console.log(error.response.status);
                 console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                //console.log(error.request);
                console.log("No response Received from the Server");
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
        let netOutstanding = parseInt(this.state.paymentDue) - parseInt(this.state.paymentReceived) + parseInt(this.state.data["balance"]);

        return (
            this.state.dataloaded ?
                <div >

                    <Menu borderless pointing attached="top"  >
                      
                        <Menu.Item header >
                            <Header as="h3" >Brough Forward Balance : {this.state.data["balance"]}</Header>
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
                                    <Table.HeaderCell>Clearing Document No</Table.HeaderCell>
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
                                        {item.map((item, index) => {
                                            return (<Table.Cell title={[
                                                item
                                            ].join(' ')} key={index}>{item}</Table.Cell>)
                                        })}
                                    </Table.Row>
                                    );
                                })}

                            </Table.Body>
                            <Table.Footer fullWidth>
                                {data.payload.length > 0 ?
                                    <Table.Row textAlign="right">

                                        <Table.HeaderCell colSpan='9'>
                                            <Pagination activePage={this.state.activePage} totalPages={Math.ceil(data.payload.length / this.state.pageSize)} onPageChange={this.onPageChange} />
                                        </Table.HeaderCell>
                                    </Table.Row> : null
                                }
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
