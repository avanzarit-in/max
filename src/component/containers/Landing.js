import React, { Component } from 'react';
import { Card, Icon, Image, Button, Grid, Label, Dimmer, Loader } from 'semantic-ui-react';
import Background from './../../image/128-216.jpg';
import NumberFormat from 'react-number-format'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Api from './../utils/Api'

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: moment([2017, 3, 1]),
      toDate: moment(),
      paymentDue: 0,
      paymentReceived: 0,
      dataloaded: false
    }
  }

  calculateAmounts = (data) => {
    let paymentDue = 0;
    let paymentReceived = 0;
    let result = {};

    if (data !== undefined) {
      let payload = data.filter(item => {

        if (item.CD === undefined || item.CD === "") {
          paymentDue = paymentDue + parseInt(item.D);
          paymentReceived = paymentReceived + parseInt(item.C);
          result.paymentDue = paymentDue;
          result.paymentReceived = paymentReceived;

          return true;
        }

        return false;
      })
    }

    return result;
  }

  componentDidMount() {
    let fromDate = this.state.fromDate.format('DD.MM.YYYY');
    let toDate = this.state.toDate.format('DD.MM.YYYY');
    console.log("component did mount called");
    let statementData = "";
    Api.getCustomer(this.props.username).then(userDisplayName => {
      let displayName = userDisplayName;
      console.log(displayName);
      Api.fetchStatementData(this.props.username, "summary", fromDate, toDate).then(statementData => {
        console.log(statementData);
        let result = this.calculateAmounts(statementData);
        this.setState(
          {
            paymentDue: result.paymentDue,
            paymentReceived: result.paymentReceived,
            dataloaded: true
          });
      }, error => {
        console.log("ERROR ==>" + error.type);
      })

    }, error => {
      console.log("ERROR ==>" + error.type);
    })
  }

  handleButtonClick = () => {
    console.log(this.props);
    this.props.history.push('/summary');
  }


  render() {

    let today = moment().format("DD/MM/YYYY");
    let netOutstanding = parseInt(this.state.paymentDue) - parseInt(this.state.paymentReceived);

    return (
      this.state.dataloaded ?
        <div className="landingpage" style={{ height: '100%', paddingTop: '50px', marginTop: '33px' }}>
          <div id="page">
            <section id="content">
              <main id="main">
                <header className="billboard">
                  <div className="billboard-content site-width">
                    <div className="slider-wrap">
                      <div id="slider" className="flexslider">
                        <ul className="slides">
                          <li className="" data-thumb-alt="" style={{float: 'left', position: 'relative', display: 'block', zIndex: 1}}>
                            <img src="./img/our_plant.jpg" width="816" height="250" scale="0.8999999761581421" draggable="false" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="tiles">
                      <div className="tile">
                        <a style={{cursor:'pointer' }} onClick={this.handleButtonClick}>
                          <i className="fa fa-file-text-o"> </i>
                          <h3>Statement Summary</h3>
                          <p><span className="label">Payment Reveiced</span><span><NumberFormat prefix={': Rs.'} value={this.state.paymentReceived} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale /></span></p>
                          <p><span className="label">Payment Due</span><span><NumberFormat prefix={': Rs.'} value={this.state.paymentDue} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale /></span></p>
                          <p><span className="label">Total Outstanding</span><span><NumberFormat prefix={': Rs.'} value={netOutstanding} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale /></span></p>
                        </a>
                      </div>
                    </div>
                  </div>
                </header>
              </main>
            </section>
            <section className="home-section">
              <div className="site-width">
                <div className="blog-col">
                  <h2 className="section-title"><b>Latest</b> News</h2>
                  <ul className="news-list">
                    <li className="news-headline">
                      <h3 className="entry-title"><a href="#" rel="bookmark">Latest News – October 2, 2018</a></h3>
                      <footer className="post-meta">
                        <span className="entry-date">October 1, 2018</span> </footer>
                    </li>
                  </ul>
                </div>

                <div className="event-col">
                  <h2 className="section-title"><b>Upcoming</b> Events</h2>
                  <div id="tribe-events-adv-list-widget-3" className="widget tribe-events-adv-list-widget">
                    <ol className="vcalendar">
                      <li className="row tribe-events-list-widget-events type-tribe_events post-792 tribe-clearfix tribe-events-venue-702 tribe-events-first tribe-events-last">
                        <div className="date">
                          Oct <span>10</span>
                        </div>
                        <div className="event-content">
                          <h3 className="entry-title"><a href="#">Upcoming event</a></h3>
                          <p className="details"><span className="tribe-event-date-start">October 10 @ 6:30 pm</span> - <span className="tribe-event-time">7:30 pm</span>
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        :
        <Dimmer active inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
    );
  }
}
