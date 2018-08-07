import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios';
import { Button } from 'semantic-ui-react'


export default class Download extends Component {
    state = {
        validated: false
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

    download() {
        alert("downloading");
    }

    render() {
        return (
            <div>
            
            <ReCAPTCHA
                ref="recaptcha"
                sitekey="6Leb5CIUAAAAABXh137Qc04KOnDocgq_H3m19qcS"
                onChange={this.onChange} />
              
             {this.state.validated?<Button primary onClick={this.download}>Download</Button>:null}
            
            </div>

        );
    }
}
