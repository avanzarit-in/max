import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator, SignIn, Loading, ConfirmSignIn, VerifyContact, SignUp, ConfirmSignUp, ForgotPassword, RequireNewPassword } from 'aws-amplify-react';
import Main from './component/containers/Main'
import './App.css';
import AuthTheme from './AuthTheme'
import Detail from './component/statement/Detail';
import Summary from './component/statement/Summary';
import { withRouter, BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router';


Amplify.configure({
  Auth: {

    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    //        identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

    // REQUIRED - Amazon Cognito Region
    region: 'ap-south-1',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'us-east-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-south-1_Q8rRenEN3',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '7jlkcgb399v6jm0na0p8398qka',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    //   cookieStorage: {
    // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //        domain: 'localhost',
    // OPTIONAL - Cookie path
    //       path: '/',
    // OPTIONAL - Cookie expiration in days
    //       expires: 365,
    // OPTIONAL - Cookie secure flag
    //       secure: true
    //    },

    // OPTIONAL - customized storage object
    //  storage: new MyStorage(),

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    //  authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
});



class App extends Component {

  constructor(props) {
    super(props);
    this.state = { status: "signIn" }
  }

  refreshWithAuth = () =>{
 Auth.currentUserInfo()
      .then(user => {
        const state = user ? 'signedIn' : 'signIn';
        if (state !== this.state.status) {
          this.setState({ status: state, username:user.username })
        }
      })
      .catch(err => console.log(err));
  }
  handleAuthStateChange = (status) => {
    this.refreshWithAuth();
   
  }

  checkAndRefreshLoginState = () => {
    if (!Auth || typeof Auth.currentUserInfo !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }
   this.refreshWithAuth();
  }

  componentDidMount() {
    this.checkAndRefreshLoginState();
  }

  componentDidUpdate() {
    this.checkAndRefreshLoginState();
  }

  render() {

    {
      return this.state.status === "signedIn" ?
   
     
           <Route path='/' render={(props) => <Main {...props} username={this.state.username} />} />
           
              
                         
   
        :
        <Authenticator hideDefault authState={this.state.status} onStateChange={this.handleAuthStateChange}>
          <SignIn />
          <ConfirmSignIn />
          <VerifyContact />
          <SignUp />
          <ConfirmSignUp />
          <ForgotPassword />
          <RequireNewPassword />
        </Authenticator>
    }
  }
}

export default App;
