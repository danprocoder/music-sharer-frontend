import React from 'react';
import '../css/Intro-form.css';

class Signup extends React.Component {
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
          <div className="container">
            <div className="form-white-bg">

              <div class="inner">
                <div className="form-header">Sign Up for Free</div>
                <form className="m-top-30" onSubmit={this.onSubmit}>
                  <div>
                    <span className="form-info">All fields are required</span>
                  </div>
                  <div className="input-area m-top-10">
                    <div className="input-field-wrapper">
                      <input type="text" placeholder="Your email address" />
                      <div className="error"></div>
                    </div>
                    <div className="input-field-wrapper last">
                      <input type="password" placeholder="Your password here" />
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
