import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    if (props.app.state.isLoggedIn) {
      window.location = '#/home';
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.app.setState({
      isLoggedIn: true,
    });

    window.location = '#/home';
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
                    <input type="text" name="email" placeholder="Your email address" />
                  </div>
                  <div className="input-field-wrapper last">
                    <input type="password" name="password" placeholder="Your password" />
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
