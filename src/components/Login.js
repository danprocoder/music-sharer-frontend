import React from 'react';
import API from '../helpers/api';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // Redirect if user is logged in.
    if (props.app.getUser()) {
      window.location = '#/home';
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      formValues: {
        email: '',
        password: '',
      },
    };

    this.app = props.app;
  }

  onSubmit(event) {
    event.preventDefault();

    (new API('user/auth'))
      .success(((data) => {
        this.app.authUser(data, () => {
          window.location = '#/home';
        });
      }).bind(this))
      .error((err) => {
        alert(err);
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
          <div className="form-white-bg">
            <div class="inner">
              <div className="form-header">Login</div>
              <form className="m-top-30" onSubmit={this.onSubmit}>
                <div className="input-area">
                  <div className="input-field-wrapper">
                    <input type="text" name="email" placeholder="Your email address" onChange={this.handleChange.bind(this)} />
                  </div>
                  <div className="input-field-wrapper last">
                    <input type="password" name="password" placeholder="Your password" onChange={this.handleChange.bind(this)} />
                  </div>
                </div>
                <div className="m-top-20">
                  <input type="submit" value="Log In" class="btn" />
                </div>
              </form>
            </div>

            <div className="bottom-links float-area m-top-20">
                <div className="left">
                  Forgot your password?<br/>
                  <a href="#">Recover password</a>
                </div>
                <div className="right">
                  <a href="#/signup" className="signup">Create an Account</a>
                </div>
              </div>
          </div>
        </div>
      );
  }
}

export default Login;
