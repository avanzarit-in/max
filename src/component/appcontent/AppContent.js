import React, { Component } from 'react';
import { Menu, Segment, Header, Button, Icon, Label, Form, Table, Sticky, Visibility } from 'semantic-ui-react';
import ActionContent from './../action/ActionContent';
import moment from 'moment'

export default class AppContent extends Component {
    state = {
        activeItem: '',
        fromDate: moment(new Date()).format("YYYY/MM/DD"),
        toDate: moment(new Date()).format("YYYY/MM/DD"),
        errorFlag: false,
        fromDateErrorFlag: false,
        toDateErrorFlag: false,
        broughtForwardBalance: 0,
        errorCodes: [],
        customerName: "Avanzar IT",
        sapId: "1010"
    }

    setFromDate = (date) => {
        let inputDate = moment(date, ["YYYY/MM/DD"], true);
        let toDate = moment(this.state.toDate, ["YYYY/MM/DD"], true);
        let errorFlag = false;
        let fromDateErrorFlag = false;
        let errorCodes = [];
        if (!inputDate.isValid()) {
            fromDateErrorFlag = true;
            errorCodes.push('INVALID_FROM_DATE');
        }
        errorFlag = inputDate.isAfter(toDate);
        if (errorFlag) {
            errorCodes.push("INVALID_DATE_RANGE")
        }
        errorFlag = errorFlag || this.state.toDateErrorFlag || fromDateErrorFlag;
        this.setState({ errorFlag: errorFlag, fromDateErrorFlag: fromDateErrorFlag, errorCodes: errorCodes });

        if (!errorFlag || errorCodes.find((element) => { return element === 'INVALID_FROM_DATE' })) {

            this.setState({ fromDate: date });
        }
    }

    setToDate = (date) => {
        let inputDate = moment(date, ["YYYY/MM/DD"], true);
        let fromDate = moment(this.state.fromDate, ["YYYY/MM/DD"], true);
        let errorFlag = false;
        let toDateErrorFlag = false;
        let errorCodes = [];
        if (!inputDate.isValid()) {
            toDateErrorFlag = true;
            errorCodes.push('INVALID_TO_DATE');
        }
        errorFlag = inputDate.isBefore(fromDate);
        if (errorFlag) {
            errorCodes.push("INVALID_DATE_RANGE")
        }
        errorFlag = errorFlag || this.state.fromDateErrorFlag || toDateErrorFlag;
        this.setState({ errorFlag: errorFlag, toDateErrorFlag: toDateErrorFlag, errorCodes: errorCodes });
        if (!errorFlag || errorCodes.find((element) => { return element === 'INVALID_TO_DATE' })) {
            this.setState({ toDate: date });
        }
    }

    handleItemClick = (e, { name }) => {
        if (this.state.activeItem === name) {
            this.setState({ activeItem: '' });
        } else {
            if (name === "calendar" && this.state.errorFlag) {
                let resetState = { ...this.state };
                resetState.fromDate = moment(new Date()).format("YYYY/MM/DD");
                resetState.toDate = moment(new Date()).format("YYYY/MM/DD");
                resetState.errorFlag = false;
                resetState.fromDateErrorFlag = false;
                resetState.toDateErrorFlag = false;
                resetState.errorCodes = []

                this.setState(resetState)
            }
            this.setState({ activeItem: name });
        }
    }


    handleContextRef = contextRef => this.setState({ contextRef })


    handleItemClosed = () => this.setState({ activeItem: '' })

    render() {
        const { activeItem } = this.state
        return (
            <div ref={this.handleContextRef}>
                <Sticky context={this.state.contextRef}>
                    <Menu borderless pointing attached="top"  >
                        <Menu.Item header position="left">
                            <Header as="h2" size="large">Dealer Dashboard</Header>
                        </Menu.Item>
                        <Menu.Item header position="right">
                            <Header as="h2" size="large">Brough Forward Balance : {this.state.broughtForwardBalance}</Header>
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item
                                name='calendar'
                                active={activeItem === 'calendar'}
                                onClick={this.handleItemClick}>
                                <Form.Field inline>
                                    {this.state.errorFlag && activeItem !== "calendar" ?
                                        <Label basic color='red' pointing='right'>
                                            Please select a valid Date Range
                                    </Label> : null}
                                    <Button primary={activeItem === 'calendar' ? true : false}>
                                        <Icon name='clock outline' />
                                        {
                                            this.state.errorFlag ? "Invalid Date Range" :
                                                moment(this.state.fromDate, ["YYYY/MM/DD"], true).format("MMM Do YYYY") + " To " + moment(this.state.toDate, ['YYYY/MM/DD'], true).format("MMM Do YYYY")
                                        }

                                    </Button>
                                </Form.Field>
                            </Menu.Item>
                            {!this.state.errorFlag ?
                                <Menu.Item
                                    name='download'
                                    active={activeItem === 'download'}
                                    onClick={this.handleItemClick}>
                                    <Button primary={activeItem === 'download' ? true : false}> <Icon name='download' />
                                        Download</Button>
                                </Menu.Item> : null
                            }
                        </Menu.Menu>
                    </Menu>


                    {(activeItem === "calendar") ? <ActionContent fromDate={this.state.fromDate} setFromDateCallback={this.setFromDate} toDate={this.state.toDate} setToDateCallback={this.setToDate} errorFlag={this.state.errorFlag} fromDateErrorFlag={this.state.fromDateErrorFlag} toDateErrorFlag={this.state.toDateErrorFlag} errorCodes={this.state.errorCodes} title="Select a Time Range to view the statement of account" close={this.handleItemClosed} name="calendar" /> :
                        (activeItem === "download") ? <ActionContent fromDate={this.state.fromDate} setFromDateCallback={this.setFromDate} toDate={this.state.toDate} setToDateCallback={this.setToDate} errorFlag={this.state.errorFlag} errorCodes={this.state.errorCodes} title="Download Statement of Account" close={this.handleItemClosed} name="download" /> :
                            null
                    }

                    <Segment attached >
                        <Header
                            as='h4'
                            content={'Customer Name: ' + this.state.customerName}
                            subheader={'SAP Customer Id : ' + this.state.sapId}
                        />
                    </Segment>
                </Sticky>

                <Segment attached="bottom" basic >
                    <Table fixed basic="very">
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

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Receipt from Customer</Table.Cell>
                                <Table.Cell>1400000021</Table.Cell>
                                <Table.Cell>03.04.2018</Table.Cell>
                                <Table.Cell>RTGS 13.03</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>220,000.00</Table.Cell>
                                <Table.Cell>-382,248.00</Table.Cell>
                                <Table.Cell>RECEIVED FROM AROHI ENT</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Invoice</Table.Cell>
                                <Table.Cell>10000447</Table.Cell>
                                <Table.Cell>04.04.2018</Table.Cell>
                                <Table.Cell>1802000179</Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>37,3000.00</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                                <Table.Cell>-344,948.00</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>
                </div>
     
        );
    }
}
