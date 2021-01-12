import React, { Fragment } from "react";
import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";
import { connect } from 'react-redux';
import firebase from "../../firebaseconifg";
import { setCurrentChannel, setPrivateChannel } from '../../redux/actions/index';
class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false,
    firstLoad: true,
    activeChannel: ''
  };

  componentDidMount() {
    //channels display fetch
    this.addListeners();
  }
  componentWillUnmount(){
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };

  removeListeners = ()=> {
    this.state.channelsRef.off();
  }

  setFirstChannel = () => {
    const  firstChannel = this.state.channels[0];
    if(this.state.firstLoad && this.state.channels.length > 0){
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }
    this.setState({ firstLoad: false});
  }
  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  }

  setActiveChannel = channel => {
    this.setState({activeChannel: channel.id})
  }
  // display channel
  displayChannels = channels =>
  channels.length > 0 &&
  channels.map(channel => (
    <Menu.Item
      key={channel.id}
      onClick={() => this.changeChannel(channel)}
      name={channel.name}
      style={{ opacity: 0.7 }}
      active= {channel.id === this.state.activeChannel}
    >
      # {channel.name}
    </Menu.Item>
  ));

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  // create channel
  addChannel = () => {
    const { channelsRef, channelDetails, channelName, user } = this.state;
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName ? user.displayName : user.email,
        avatar: user.photoURL,
      },
    };
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });
  render() {
    const { channels, modal } = this.state;
    return (
      <Fragment>
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="exchange" />
              CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {/* channels */}
          {this.displayChannels(channels)}
        </Menu.Menu>
        {/* // Add channel modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" />
              Add
            </Button>
            <Button onClick={this.closeModal} color="red" inverted>
              <Icon name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Channels);
