import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions/postActions';
import * as loginActions from '../actions/loginAction';
import { firebaseApp } from '../firebase';
import PostsNew from './posts_new';
import { Footer } from './index';

import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

class Login extends Component {


componentWillMount() {
    const { userLogIn, userLogOut  } = this.props.logActions;
    const { fetchPosts } = this.props.actions;
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        userLogIn(user.email);
        fetchPosts();
        this.setState({ email: '', password: '', title: 'Posts' })
      }
      else
      {
        userLogOut();
        this.setState({ title: 'Log In' })
      }
    });
}

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isAuth: 'false',
      errorUser: '',
      errorPass: '',
      postDeleted: 'true',
      title: 'Log in',
      selectedIndex: 0,
    }


  }

onSubmit() {
  const { email, password } = this.state;

  firebaseApp.auth().signInWithEmailAndPassword(email,password)
    .catch(err => {
      this.state.error.message = err.message;
      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .catch(err => {
          this.state.error.message = err.message;
        })
    });
}

signOut(){
  firebaseApp.auth().signOut()
    .then(() => {
      console.log('sign out then hit')
      this.setState({ isAuth: 'false'});
      console.log('sign out then hit2')
    })
}

onChange(event) {
  this.setState({ [event.target.name]: event.target.value });

  if (event.target.name == 'email' && event.target.value === '')
  {
    this.setState({errorUser: 'Email is incorrect'});
  }
  else
  {
    this.setState({errorUser: ''})
  }

  if (event.target.name == 'password' && event.target.value === '')
  {
    this.setState({errorPass: "Password is incorrect"});
  }
  else
  {
    this.setState({errorPass: ''})
  }

}

renderContent() {
  return (
        <div>
          <div className="col-md-4" />
          <div className="col-md-4">
          <Paper style={styles.loginContainer} zDepth={5}>
            <div className='row'>
                <TextField
                  textareaStyle={styles.loginButtonStyle}
                  hintText='user@domain.com'
                  name='email'
                  value={this.state.email}
                  onChange={this.onChange.bind(this)}
                  errorText={this.state.errorUser}
                  floatingLabelText='Email address'/>
            </div>

            <div className="row">
              <TextField
                hintText='********'
                name='password'
                type='password'
                value={this.state.password}
                onChange={this.onChange.bind(this)}
                errorText={this.state.errorPass}
                floatingLabelText='Password'/>
            </div>

            <div className="row">
                <RaisedButton primary
                style = {styles.loginButtonStyle}
                onClick={() => this.onSubmit()}
                label = 'Log in' />
          </div>
        </Paper>
        <div className="col-md-4" />
        </div>
      </div>
  )
}

onDeleteClick(id) {
  const { deletePost, fetchPosts } = this.props.actions;
    deletePost(id);
    //{this.props}
    this.setState({ postDeleted: this.props.isDeleted })
    fetchPosts();
      //this.props.history.push('/');

}

renderPosts() {
  const { allPosts } = this.props.posts;

  if (allPosts !== null) {
    return _.map(allPosts, (post) => {
      return (
        <div key={post.id} className="list-group-item">
          <li className="text-center" data-id={post.id}>
            <h3>{post.title}</h3>
            <h6>Categories: {post.category}</h6>
            <p>{post.message}</p>
              <button
                className="btn btn-danger"
                onClick={this.onDeleteClick.bind(this, post.id)}>
                  Delete Post
              </button>
          </li>
        </div>
      )})
  }
}


render() {
  const { loading } = this.props.posts;




  return (
    <div>
      <div className="col-md-12">
        <AppBar
            title={this.state.title}
            titleStyle={styles.appBarStyle.titleStyle}
            showMenuIconButton={false}
            iconElementRight={
              !this.props.isAuth
              ?
              <div></div>
              :
              <div>
              <Link to="/new">
                <FlatButton
                  style={styles.appBarStyle.rightIconStyle}
                  label="Add Post" />
              </Link>
                <FlatButton
                  style={styles.appBarStyle.rightIconStyle}
                  label="Sign Out"
                  onClick={() => this.signOut()} />
              </div>
            } />
        {!this.props.isAuth
          ?
          <div>{this.renderContent()}</div>
          :
          <div>
            <ul className="list-group">
              {!loading ? this.renderPosts() : <p>Loading...</p>}
            </ul>
          </div>
        }
      </div>
      <Footer />
    </div>


  )
  }
}

const styles = {
  storeme: {
    height: '100% !important'
    //height: 'calc(100% - 500px)'
  },
  loginContainer: {
    marginTop: '50px',
    paddingBottom: '50px',
    textAlign: 'center'
  },
  loginButtonStyle: {
    justifyContent: "center",
  },
  appBarStyle: {
    titleStyle: {
      textAlign: 'center'
    },
    rightIconStyle: {
      color: 'white'
    },
  }

}


export default connect(
  state => ({
    isAuth: state.loginReducer.authenticated,
    posts: state.postsReducer,
    isDeleted: state.postsReducer.postDeleted,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    logActions: bindActionCreators(loginActions, dispatch),

  }),
)(Login);
