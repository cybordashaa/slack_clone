import React from "react";
import { Button, Input, Segment } from "semantic-ui-react";
import firebase from '../../firebaseconifg';
class MessageForm extends React.Component {
  state = {
    message: "",
    loading: false,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    errors: [],
  };
 componentDidMount(){
     console.log(this.state.channel);
 }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName
          ? this.state.user.displayName
          : this.state.user.email,
        avatar: this.state.user.photoURL,
      },
      content: this.state.message,
    };
    return message;
  };
  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;
    if (message) {
      this.setState({
        loading: true,
      });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({
            loading: false,
            message: "",
            errors: [],
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err),
          });
        });
    } else {
        this.setState({
            errors: this.state.errors.concat({ message: 'Add a Message'}),
        })
    }
  };
  render() {
      const { errors, message, loading } = this.state;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          placeholder="White your message"
          className={errors.some(error => error.message.toLowerCase().includes("message"))
          ? "error"
          : ""}
          value={message}
          onChange={this.handleChange}
        />
        <Button.Group icon widths="2" >
          <Button
            onClick={this.sendMessage}
            disabled={loading}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
