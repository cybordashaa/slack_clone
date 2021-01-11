import React from "react";
import { Comment, Segment } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";
import firebase from "../../firebaseconifg";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
  };

  render() {
    const { messagesRef, channel, user } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">{/* messages */}</Comment.Group>
        </Segment>
        <MessageForm
          currentUser={user}
          currentChannel={channel}
          messagesRef={messagesRef}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
