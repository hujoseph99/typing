import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions/userActions";
import { clearErrors } from "../../actions/errorActions";
import { goToRegisterMenu } from "../../actions/routerActions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from "@fortawesome/free-solid-svg-icons";

import { ERROR_LOGIN_FAIL } from '../../types/errorTypes';

import "../../css/login.css";
import "../../css/colors.css"
import "../../css/forms.css";

class Login extends Component {
	state = {
		msg: "",
    username: "",
    password: ""
  };

  static propTypes = {
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired,
		goToRegisterMenu: PropTypes.func.isRequired
	};
	
	componentDidUpdate(prevProps) {
    const {error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === ERROR_LOGIN_FAIL) {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
	}
	
	getErrorMessage = () => {
		if (this.state.msg) {
			return (
				<div className="alert alert-danger mb-4 alert-fixed" role="alert">
					{this.state.msg}
				</div>
			);
		} else {
			return null;
		}
	}

	handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
	};
	
	handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
	};
	
	handleRegisterClick = e => {
		e.preventDefault();
		this.props.clearErrors();
		this.props.goToRegisterMenu();
	}

	render() {
		return (
			<div className="fullscreen">
				{this.getErrorMessage()}
				<div className="card form-background login-form-background-dimensions">
					<div className="login-form-dimensions">
						<form autocomplete="off">
							<FontAwesomeIcon icon={faBolt} size='5x' className="yellow mb-4"/>

							<h1 className="h3 font-weight-normal pink mb-3">Please sign in</h1>
							<input type="text" id="username" className="form-control topInput" placeholder="Username" onChange={this.handleChange} required autofocus="true" />
							<input type="password" id="password" className="form-control bottomInput mb-4" placeholder="Password" onChange={this.handleChange} required />

							<button class="btn btn-lg btn-primary btn-block mb-4" onClick={this.handleSubmit}>Sign In</button>
						</form>
						<button class="formFooterText" onClick={this.handleRegisterClick}>Click here to register</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors, goToRegisterMenu })(Login);