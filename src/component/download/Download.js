import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios';
import { Button } from 'semantic-ui-react'


export default class Download extends Component {
    state = {
        validated: false,
        loading: false,
        text: 'Download',
        disabled:false
    }
    onChange = (value) => {
        console.log("Captcha value:", value);
        /*  let payload = { response: value, secret: '6Leb5CIUAAAAAAw3xtgvlGiC-i9CEnazoPLGLqXV' }
          axios.post('https://www.google.com/recaptcha/api/siteverify', {
               crossdomain: true , payload
          })
              .then(res => {
                  console.log(res.data);
              })*/
        this.setState({ validated: true });
    }
    

    download = () => {
        let formattedFromDate = this.props.fromDate.format("DD.MM.YYYY");
        let formattedToDate = this.props.toDate.format("DD.MM.YYYY");
        let customerId = this.props.customerId;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3040/report/statement?customerId=' + customerId + '&fromDate=' + formattedFromDate + '&toDate=' + formattedToDate, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (e) {
            if (xhr.status == 200) {
                var blob = new Blob([xhr.response], { type: "application/pdf" });
                var link = document.createElement('a');
                link.setAttribute("type", "hidden"); // make it hidden if needed
                link.href = window.URL.createObjectURL(blob);
                link.download = "Report_" + new Date() + ".pdf";
                document.body.appendChild(link);
                link.click();
                link.remove();
                 this.setState({ loading: false, text: 'Downloaded',disabled:true});
            }
        }.bind(this);
        xhr.send();


        this.setState({ loading: true, text: 'Downloading...',disabled:true });
    }

    render() {
        console.log(this.state.text);
        return (
            <div>
                <Button primary onClick={this.download}>{this.state.text}</Button>

            </div>

        );
    }
}
