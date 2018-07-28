import React from "react"
import { Label, Grid } from 'semantic-ui-react'
import Utils from './../../../utils/Utils'

const YearView = (props) => {
      console.log("YearView component : render called");
    return (
        <Grid padded="horizontally" centered >
            {
                Utils.yearsArrayofArray.map((item, index) => {
                    return (
                        <Grid.Row key={index} style={{ paddingBottom: '0px' }}>
                            <Grid.Column textAlign="center">
                                {
                                    item.map(value => {
                                        return (<Label key={value.value} style={{ width: '65px' }} as="a" color="black" size="tiny" onClick={() => props.changeTitle(value.text)}>{value.text}</Label>)
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

export default YearView;