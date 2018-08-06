import React from "react"
import { Label, Grid } from 'semantic-ui-react'
import Utils from './../../../utils/Utils'
import moment from 'moment'

const MonthsView = (props) => {
   
    return (
        <Grid padded="horizontally" centered >
            {
                Utils.monthsArrayofArray.map((item, index) => {
                    return (
                        <Grid.Row key={index} style={{ paddingBottom: '0px' }}>
                            <Grid.Column textAlign="center">
                                {
                                    item.map(value => {
                                                                              
                                        return (
                                            (props.date.isBefore(moment(),'year') || moment().isSameOrAfter(moment([props.date.get('year'),value.key,1]),'month')) ?
                                                <Label key={value.key} style={{ width: '65px' }} as="a" color="black" size="tiny" onClick={(e) => props.changeTitle(e,props.date.get('year'),value.key)}>{value.text}</Label> :
                                                <Label key={value.key} style={{ width: '65px', cursor: 'not-allowed' }} as="a" color="grey" size="tiny" >{value.text}</Label>
                                        )
                                    })
                                }
                            </Grid.Column>
                        </Grid.Row>
                    );
                })
            }
        </Grid>
    );
}

export default MonthsView;