import React from 'react';
import { Button, Divider, Icon, Label, Menu, Modal, Segment, Sidebar } from 'semantic-ui-react';
import { SliderPicker } from 'react-color';
import firebase from '../../firebaseconifg';

class ColorPanel extends React.Component{
  state = {
    user: this.props.currentUser,
    modal: false,
    primary: '',
    secondary: '',
    usersRef: firebase.database().ref('users')
  }

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  handleChangePrimary = color => this.setState({
    primary: color.hex
  });

  handleChangeSecondary = color => this.setState({
    secondary: color.hex
  });
  handleSaveColors = () => {
    if(this.state.primary && this.state.secondary){
      this.saveColors(this.state.primary, this.state.secondary);
    }
  }

  saveColors = (primary, secondary) => {
    this.state.usersRef
        .child(`${this.state.user.uid}/colors`)
        .push()
        .update({
          primary,
          secondary
        })
        .then(() => {
          console.log('Colors added');
          this.closeModal();
        })
        .catch(err => {
          console.log(err);
        })

  }
    render(){
      const { modal, primary, secondary } = this.state;
        return (
          <Sidebar
            as={Menu}
            icon="labeled"
            inverted
            vertical
            visible
            width="very thin"
          >
            <Divider />
            <Button
              icon="add"
              size="small"
              color="blue"
              onClick={this.openModal}
            />
            {/* Color picker Modal */}
            <Modal basic open={modal} onClose={this.closeModal}>
              <Modal.Header>Choose App Colors</Modal.Header>
              <Modal.Content>
                <Segment inverted>
                  <Label content="Primary Color" />
                  <SliderPicker color={primary} onChange={this.handleChangePrimary} />
                </Segment>
                <Segment inverted>
                  <Label content="Secondry Color" />
                  <SliderPicker color={secondary} onChange={this.handleChangeSecondary} />
                </Segment>
              </Modal.Content>
              <Modal.Actions>
                <Button color="green" inverted onClick={this.handleSaveColors}>
                  <Icon name="checkmark" />
                  Save Colors
                </Button>
                <Button color="red" inverted onClick={this.closeModal}>
                  <Icon name="remove" />
                  Cancel
                </Button>
              </Modal.Actions>
            </Modal>
          </Sidebar>
        );
    }
}

export default ColorPanel;