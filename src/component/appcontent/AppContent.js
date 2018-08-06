import React, { Component } from 'react';
import { Menu, Segment, Header, Button, Icon, Label, Form, Table, Sticky, Visibility, Modal, Popup,Pagination } from 'semantic-ui-react';
import moment from 'moment'
import Calendar from './../calendar/Calendar';
import Download from './../download/Download';
import data from './../data/Data.json'

export default class AppContent extends Component {

    constructor(props) {
        super(props);
        this.state.data = data;
    }

    state = {
        activeItem: '',
        fromDate: moment(new Date()).format("YYYY/MM/DD"),
        toDate: moment(new Date()).format("YYYY/MM/DD"),
        broughtForwardBalance: 0,
        customerName: "Avanzar IT",
        sapId: "1010",
        calendarModalOpen: false,
        downloadModalOpen: false
    }

    handleCalendarOpen = () => this.setState({ calendarModalOpen: true })

    handleCalendarClose = () => this.setState({ calendarModalOpen: false })

    handleDownloadOpen = () => this.setState({ downloadModalOpen: true })

    handleDownloadClose = () => this.setState({ downloadModalOpen: false })


    render() {
        const { activeItem } = this.state
        return (
            <div ref={this.handleContextRef}>
               
                    <Menu borderless pointing attached="top"  >
                        <Menu.Item header position="left" >
                            <Header as="h2" size="large">Dealer Dashboard</Header>
                        </Menu.Item>
                        <Menu.Item header position="right">
                            <Header as="h2" size="large">Brough Forward Balance : {this.state.broughtForwardBalance}</Header>
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item
                                name='calendar'
                                active={activeItem === 'calendar'}>
                                <Form.Field inline>
                                    <Modal
                                        style={{ height: '400px' }}
                                        centered={false}
                                        closeIcon
                                        size="fullscreen"
                                        trigger={<Button primary icon labelPosition='left' onClick={this.handleCalendarOpen}><Icon name='clock'/>{moment(this.state.fromDate, ["YYYY/MM/DD"], true).format("MMM Do YYYY") + " To " + moment(this.state.toDate, ['YYYY/MM/DD'], true).format("MMM Do YYYY")}</Button>}
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
                                    trigger={<Button icon labelPosition='left' onClick={this.handleDownloadOpen}> <Icon name='download'/>Download</Button>}
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
                        <Header
                            as='h4'
                            content={'Customer Name: ' + this.state.customerName}
                            subheader={'SAP Customer Id : ' + this.state.sapId}
                        />
                    </Segment>
             

                <Segment attached="bottom" basic >
                    <Table striped fixed singleLine celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Doc. Ref</Table.HeaderCell>
                                <Table.HeaderCell>Doc Number</Table.HeaderCell>
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
                            {Object.keys(this.state.data.payload).map(key => {
                                return (<Table.Row key={key}>
                                    {this.state.data.payload[key].map((item, index) => {
                                        return (<Table.Cell title={[
                                            item
                                        ].join(' ')} key={index}>{item}</Table.Cell>)
                                    })}
                                </Table.Row>
                                );
                            })}

                        </Table.Body>
                        <Table.Footer>
                            <Table.Row textAlign="right">
                                <Table.HeaderCell colSpan='9'>
                                   <Pagination defaultActivePage={5} totalPages={10} />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Segment>
            </div>

        );
    }
}
