import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import { Footer } from './index';
import { createPost } from '../actions/postActions';

class PostsNew extends Component {
  constructor() {
    super();

    this.state = {
      title: 'Add new post',
    }
  }



  renderField(field) {
    const { meta: { touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}/>
          <div className="text-help">
            {touched ? error : ''}
          </div>
      </div>
    )
  }

  onSubmit(values) {
        createPost(values, () => {
        this.props.history.push('/');
      });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
      <AppBar
          style={styles.appBarStyle.style}
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
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="category"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="message"
            component={this.renderField}
          />
          <button
            type="submit"
            className="btn btn-success">
              Submit
            </button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.category) {
    errors.category = "Enter a category!";
  }

  if (!values.message) {
    errors.message = "Enter some content!";
  }
  return errors;
}

const styles = {
  appBarStyle: {
    style: {
      backgroundColor: '#fff',
      width: '100%',
      margin: '0px'
    },
    titleStyle: {
      textAlign: 'center',
      color: 'black'
    },
    rightIconStyle: {
      //color: 'white'
    },
  }
}



export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);
