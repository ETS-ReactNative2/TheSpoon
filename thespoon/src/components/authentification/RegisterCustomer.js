//TO REMOVE
import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import {ajax} from "rxjs/ajax";
import {paths} from "../../constants/paths";
import {IconName, IconEmail, IconPassword, IconExit, IconBack} from "../Icons";
import {Modal} from "react-bootstrap";
import FilterLink from "../../containers/FilterModalLink";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import FormValidator from "../../validation/FormValidator";


class RegisterCustomer extends Component  {
  constructor(props)
  {
    super(props);

      this.validator = new FormValidator([
      {
          field: "email",
          method: "isEmpty",
          validWhen: false,
          message: "E-mail is required."
      },
      {
          field: "email",
          method: "isEmail",
          validWhen: true,
          message: "That is not a valid email."
      },
      {
          field: "username",
          method: "isEmpty",
          validWhen: false,
          message: "Username is required."
      },
      {
          field: "password",
          method: "isEmpty",
          validWhen: false,
          message: "Password is required."
      },
      {
          field: "confirmPassword",
          method: "isEmpty",
          validWhen: false,
          message: "Password confirmation is required."
      },
      {
          field: "confirmPassword",
          method: this.passwordMatch,
          validWhen: true,
          message: "Confirm password has to be identical to the password."
      }
  ]);

      this.state = {
          email:"",
          username: "",
          password:"",
          confirmPassword: "",
          validation: this.validator.valid(),
          serverMessage: ""
      };

      this.submitted = false;
      this.handleSubmit = this.handleSubmit.bind(this);
  }

    passwordMatch = (confirmation, state) => (state.password === confirmation);

    handleSubmit = event => {
        if(true) {
            return <Redirect to="/CustomerPage"/>
        }
        event.preventDefault();
        const thisTemp = this;
        const values = this.form.getValues();

        this.setState({
            email:values.email,
            username: values.username,
            password:values.password,
            confirmPassword: values.confirmPassword
        }, () => {//because setstate is asynchronus, further action must be taken on callback

                const validation = this.validator.validate(this.state);
                this.setState({validation });
                this.submitted = true;

                if (validation.isValid) {
                    thisTemp.setState({serverMessage: "Sign up is processing"});
                    let thisTemp = this;
                    ajax({
                        url: paths["restApi"]["registrationCustomer"],
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: {
                            email: this.state.email,
                            password:this.state.password,
                            username:this.state.username
                        }
                    }).subscribe(
                        () => {
                            thisTemp.setState({serverMessage: "Login is processing..." });
                            thisTemp.setState(
                                {serverMessage: <Redirect to={{pathname: "/YourRestaurant"}}/>}
                            );
                        },
                        (error) => {
                            switch (error.status) {
                                case 400:
                                    thisTemp.setState({serverMessage: "Username or email already taken" });
                                    break;
                                case 404:
                                    thisTemp.setState({serverMessage: "No connection to the server" });
                                    break;
                                default:
                                    thisTemp.setState({serverMessage: "General error" });
                                    break;
                            }
                        },
                        () => {
                            thisTemp.setState({serverMessage: <Redirect to={{pathname: "/Mainpage/"}}/>});
                            thisTemp.props.onHide();
                        }
                    );
                }
            }
            );
    };

    render() {
        let validation = this.submitted ?                         // if the form has been submitted at least once
            this.validator.validate(this.state) :               // then check validity every time we render
            this.state.validation;
        return (
        <Modal.Body>
            <span className="back"> <FilterLink filter={modalVisibilityFilters.SHOW_CHOOSE_ROLE}><IconBack /></FilterLink></span>
            <button className="exit" onClick={this.props.onHide}><IconExit /></button>
            <div className="modal-wrapper ">
                <Form ref={(c) => {this.form = c; }} onSubmit={(e) => this.handleSubmit(e)}>
                    <h2>Sign up</h2>
                    <div className="account-type">
                        <h4>as a <span className="role">{this.props.role}</span></h4>
                    </div>

                    <div className="input-field">
                        <IconEmail />
                        <Input type="email" name="email" placeholder="E-mail"/>
                    </div>

                    <div className="input-field">
                        <IconName />
                        <Input type="text" name="username" placeholder="Username"/>
                    </div>

                    <div className="input-field">
                        <IconPassword />
                        <Input type="password" name="password" placeholder="Password"/>
                    </div>

                    <div className="input-field">
                        <IconPassword />
                        <Input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm password"/>
                    </div>

                    <div className="error-block">
                        <small>{validation.email.message}</small>
                        <small>{validation.username.message}</small>
                        <small>{validation.password.message}</small>
                        <small>{validation.confirmPassword.message}</small>
                        <small>{this.state.serverMessage}</small>
                    </div>

                  <Button type="submit" className="normal" >Sign up</Button>
                </Form>
                <div className="link-wrapper">
                    <small>Already have an account? <FilterLink filter={modalVisibilityFilters.SHOW_LOGIN}>Log in</FilterLink></small>
                </div>
            </div>
        </Modal.Body>
    );
  }
}

export default RegisterCustomer;
