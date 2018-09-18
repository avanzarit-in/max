import React from 'react';
import {Grid,List} from 'semantic-ui-react'
const QuickCalendar = (props) => {
    return (
        <Grid columns='equal'>
    <Grid.Row>
      <Grid.Column>
        <List divided relaxed>
    <List.Item>    
      <List.Content>
        <List.Header as='a'>Today</List.Header>
      </List.Content>
    </List.Item>
   <List.Item>    
      <List.Content>
        <List.Header as='a'>This week</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>    
      <List.Content>
        <List.Header as='a'>This month</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>    
      <List.Content>
        <List.Header as='a'>This year</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>    
      <List.Content>
        <List.Header as='a'>Today so far</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>    
      <List.Content>
        <List.Header as='a'>Week to date</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>    
      <List.Content>
        <List.Header as='a'>Month to date</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>    
      <List.Content>
        <List.Header as='a'>Year to date</List.Header>
      </List.Content>
    </List.Item>
  </List>
      </Grid.Column>
      <Grid.Column>
       <List divided relaxed>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 15 minutes</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 30 minutes</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 1 hour</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 4 hours</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 12 hours</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 24 hours</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 7 days</List.Header>
      </List.Content>
    </List.Item>
  </List>
      </Grid.Column>
      <Grid.Column>
        <List divided relaxed>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 30 days</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 60 days</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 90 days</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 6 months</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 1 year</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 2 years</List.Header>
      </List.Content>
    </List.Item>
     <List.Item>    
      <List.Content>
        <List.Header as='a'>Last 5 years</List.Header>
      </List.Content>
    </List.Item>
  </List>
      </Grid.Column>
     
    </Grid.Row>
  </Grid>
    );
}

export default QuickCalendar;