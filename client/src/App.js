import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import about from './pages/about';
import gallery from './pages/gallery';
import faq from './pages/faq';
import axios from 'axios';

import userAddress from './util/metamask-auth';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now()){
        // store.dispatch(logoutUser())
        authenticated = false;
        // window.location.href = '/login'
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

// TODO: if MM auth, SET_AUTHENTICATED
// console.log(window.uA + " test");

// if (window.uA == "test") {
//     store.dispatch({ type: SET_AUTHENTICATED });
//     axios.defaults.headers.common['Authorization'] = token;
// }


axios.defaults.baseURL = 'https://us-central1-socialape-54451.cloudfunctions.net/api';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={home}/>
                        <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
                        <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
                        <Route exact path="/about" component={about}/>
                        <Route exact path="/gallery" component={gallery}/>
                        <Route exact path="/faq" component={faq}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
