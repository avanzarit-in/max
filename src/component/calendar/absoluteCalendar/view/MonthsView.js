import React from "react"
import { Label, Grid } from 'semantic-ui-react'
import Utils from './../../../utils/Utils'

const MonthsView = (props) => {
    let nowDate = new Date();
    let currentYear = nowDate.getFullYear();
    let currentMonth = nowDate.getMonth();
  console.log("MonthsView component : render called");
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
                                            ((parseInt(props.selectedYear, 10) < currentYear) || (parseInt(value.value, 10) - 1 <= currentMonth)) ?
                                                <Label key={value.key} style={{ width: '65px' }} as="a" color="black" size="tiny" onClick={() => props.changeTitle(value.key)}>{value.text}</Label> :
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