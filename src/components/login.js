import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions/postActions';
import * as loginActions from '../actions/loginAction';
import { firebaseApp } from '../firebase';
import PostsNew from './posts_new';

class Login extends Component {

componentWillMount() {
    const { fetchPosts } = this.props.actions;
    const { userLogIn } = this.props.logActions;

    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        userLogIn(user.email);
        fetchPosts();
      }
      else
      {
        console.log('user has signed out or isnt logged in');
      }
    });
}

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isAuth: 'false',
      error: {
        message: ''
      }
    }
  }

onSubmit() {
  const { email, password } = this.state;

  firebaseApp.auth().signInWithEmailAndPassword(email,password)
  .catch(error => {
    this.state.error.message = error.message;

    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.state.error.message = error.message;
      })
  })
}

signOut(){
  firebaseApp.auth().signOut();
}

renderContent()
{
  return (
      <div>
        <div>
        {this.state.error.message == ''
        ? <h1></h1>
        : <h1 className="alert alert-danger">{this.state.error.message}</h1> }</div>
        <div><h1>You are not logged in. Please login here:</h1></div>
        <div>
          <div className="row">
            <div className="input-field col s12">
              <label>
                <input
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={event => this.setState({email: event.target.value})}
                  placeholder="user@domain.com" />
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <label>
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={event => this.setState({password: event.target.value})} />
              </label>
            </div>
          </div>

          <input
            onClick={() => this.onSubmit()}
            type="submit"
            value="Log in" />
          </div>
      </div>
  )
}

onDeleteClick(id) {
  const { deletePost } = this.props.actions;
    deletePost(id)
      this.props.history.push('/');
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
      {!this.props.isAuth
        ?
        <div>{this.renderContent()}</div>
        :
        <div>
          <h1>User logged in. View your posts!</h1>
          <div>
            <div className="text-xs-right">
              <Link className="btn btn-primary" to="/new">
                Add Post
              </Link>
              <button
              className="btn btn-success"
              onClick={() => this.signOut()}>
                Sign out
              </button>
            </div>
          </div>
          <h3>Posts </h3>
          <ul className="list-group">
            {!loading ? this.renderPosts() : <p>Loading...</p>}
          </ul>
        </div>
      }
    </div>
  )
  }
}

export default connect(
  state => ({
    isAuth: state.loginReducer.authenticated,
    posts: state.postsReducer
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    logActions: bindActionCreators(loginActions, dispatch),

  }),
)(Login);
