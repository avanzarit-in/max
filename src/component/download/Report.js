import React, { Component } from 'react';
import data from './../data/Data.json';
import { Segment, Table,Grid,Header } from 'semantic-ui-react';
import axios from 'axios';

export default class Report extends Component {

    state = {dataLoaded:true}

    constructor(props) {
        super(props);
        this.state.data = data;
        
        
    }

    componentDidMount() {
    /*    axios.get("http://localhost:8080/query").then(res => {
            console.log(res.data);
              this.setState({data:res.data,dataLoaded:true});
          })*/

    }

    render() {
        return (
            this.state.dataLoaded?
            <Segment attached="bottom" basic >
                <Grid columns={16} container>
                    <Grid.Row>
                        <Grid.Column width={16} ><Header block>Green Valliey Industries Ltd.</Header></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={5} style={{textAlignment:'right'}}>Statement Of Account From</Grid.Column>
                        <Grid.Column width={2}>01.04.2018</Grid.Column>
                        <Grid.Column width={1}>To</Grid.Column>
                        <Grid.Column width={2}>31.05.2018</Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingBottom:'0px',paddingTop:'0px'}}>
                        <Grid.Column width={5} style={{textAlignment:'right'}}>Customer Code : </Grid.Column>
                        <Grid.Column width={3}>AS04067</Grid.Column>

                    </Grid.Row>
                    <Grid.Row style={{paddingBottom:'0px',paddingTop:'0px'}}>
                        <Grid.Column width={5} style={{textAlignment:'right'}}>Customer Name :</Grid.Column>
                        <Grid.Column width={10}>AROHI ENTERPRISE</Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingBottom:'0px',paddingTop:'0px'}}>
                        <Grid.Column width={5} style={{textAlignment:'right'}}>Address :</Grid.Column>
                        <Grid.Column width={10} >ASHRAM ROAD , WORD No.03,HAILAKANDI , ASSAM,788151</Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:'30px'}}>
                        <Grid.Column width={5} style={{textAlignment:'right'}}>Brought Forward Balance :</Grid.Column>
                        <Grid.Column width={8}>{this.state.data.balance}</Grid.Column>
                    </Grid.Row>
                </Grid>
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
            </Segment>:null
        );
    }

}
