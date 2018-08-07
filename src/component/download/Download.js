import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios';
import { Button } from 'semantic-ui-react'


export default class Download extends Component {
    state = {
        validated: false,
        loading:false,
        text:'Download'
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

        axios.get('http://localhost:8080/download', {
            responseType: 'blob' // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'statement.pdf');
            document.body.appendChild(link);
            link.click(); 
             this.setState({loading:false,validated:false});
        });

        this.setState({loading:true,text:'Downloading...'});
    }

    render() {
        console.log(this.state.text);
        return (
            <div>

                <ReCAPTCHA
                    ref="recaptcha"
                    sitekey="6Leb5CIUAAAAABXh137Qc04KOnDocgq_H3m19qcS"
                    onChange={this.onChange} />

                {this.state.validated ? <Button loading={this.state.loading} primary onClick={this.download}>{this.state.text}</Button> : null}

            </div>

        );
    }
}
