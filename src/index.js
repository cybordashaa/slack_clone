import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './App';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import firebase from './firebaseconifg';

// redux
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider, connect } from 'react-redux';
import rootReducer from './redux/reducers';
import { setUser, clearUser } from './redux/actions/index';
import Spinner from './spinner';


const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    })
  }
  render() {
    return this.props.isLoading ? <Spinner /> : (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={App} />
        </Switch>
    );
  }
}
const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});
const AuthRoot = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root));

class Auth extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AuthRoot />
        </Router>
      </Provider>
    );
  }
}

if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
  const render = (Component) => renderMethod(<Component />, document.getElementById('root'))

  render(Auth)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
