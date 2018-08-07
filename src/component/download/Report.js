import React, { Component } from 'react';
import data from './../data/Data.json';
import { Segment, Table } from 'semantic-ui-react';

export default class Report extends Component {

    constructor(props) {
        super(props);
        this.state.data = data;
    }

    render() {
        return (
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
                    </Table>
                </Segment>
        );
    }

}
