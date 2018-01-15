import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import { firebaseApp } from './firebase';
import Login from './components/Login';
import PostsNew from './components/posts_new';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/new" component={PostsNew} />
            </Switch>
            </div>
            </Router>
            </Provider>
  </MuiThemeProvider>
  , document.querySelector('.container'));
