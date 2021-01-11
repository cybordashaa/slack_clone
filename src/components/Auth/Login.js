import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import md5 from 'md5';
import firebase from "../../firebaseconifg";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

 

  // display error message
  displayError = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(signedUser => {
            console.log(signedUser);
            this.setState({ loading: false})
        }).catch(err => {
            console.log(err);
            this.setState({
                errors: this.state.errors.concat(err),
                loading: false
            })
        })
      this.setState({ errors: [], loading: true });
    }
  };

  isFormValid = ({ email, password}) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some((error) => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };
  render() {
    const {
      email,
      password,
      errors,
      loading,
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
{/*               
          {success && (
             <Message positive>
             <p>
               бүртгэл <b>амжилттай</b> боллоо.
             </p> </Message>
          )} */}
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                type="email"
                className={this.handleInputError(errors, "email")}
                value={email}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                className={this.handleInputError(errors, "password")}
                onChange={this.handleChange}
              />
              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="violet"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayError(errors)}
            </Message>
          )}
          <Message>
            Don't have an account <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Login;
