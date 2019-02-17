import React from 'react';
import '../css/Intro-form.css';
import API from '../helpers/api';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    if (props.app.state.isLoggedIn) {
      window.location = '#/home';
    }

    this.state = {
      formValues: {
        name: '',
        email: '',
        password: '',
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    (new API('user/add'))
      .success(((data) => {
        this.props.app.authUser(data);

        window.location = '#/home';
      }).bind(this))
      .error((err) => {
        console.log(err);
      })
      .post(this.state.formValues);
  }

  handleChange(event) {
    const { name, value } = event.target;

    const formValues = this.state.formValues;
    formValues[name] = value;

    this.setState({
      formValues,
    });
  }

  render() {
      return (
        <div className="formSection beautiful-background">
          <div className="container">
            <div className="form-white-bg">

              <div className="inner">
                <div className="form-header">Sign Up for Free</div>
                <form className="m-top-30" onSubmit={this.onSubmit}>
                  <div>
                    <span className="form-info">All fields are required</span>
                  </div>
                  <div className="input-area m-top-10">
                    <div className="input-field-wrapper">
                      <input type="text" name="name" placeholder="Your name" value={this.state.formValues.name} onChange={this.handleChange.bind(this)} />
                      <div className="error"></div>
                    </div>
                    <div className="input-field-wrapper">
                      <input type="text" name="email" placeholder="Your email address" value={this.state.formValues.email} onChange={this.handleChange.bind(this)} />
                      <div className="error"></div>
                    </div>
                    <div className="input-field-wrapper last">
                      <input type="password" name="password" placeholder="Your password here" value={this.state.formValues.password} onChange={this.handleChange.bind(this)} />
                      <div className="error"></div>
                    </div>
                  </div>
                  <div className="m-top-20">
                    <div className="form-info">By clicking the &ldquo;Sign Up&rdquo; button, you have agreed to our terms &amp; conditions.</div>
                    <div className="m-top-10"><input type="submit" value="Sign Up" className="btn" /></div>
                  </div>
                </form>
              </div>

              <div className="bottom-links m-top-20">
                <div>
                  Already have an account?<br/>
                  <a href="#/login">Log in here &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Signup;
