import React from "react";
import { Button, Icon, Input, Modal } from "semantic-ui-react";
import mime from 'mime-types';
class FileModal extends React.Component {
  state = {
    file: null,
    authorized: ["image/jpeg", "image/png"],
  };
  addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };
  sendFile = () => {
    const { uploadFile, closeModal } = this.props;
    const { file } = this.state;
    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        // send file
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      }
    }
  };
  isAuthorized = (filename) =>
    this.state.authorized.includes(mime.lookup(filename));
 clearFile = () => this.setState({ file: null });
  render() {
    const { modal, closeModal } = this.props;
    return (
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Selec an Image File</Modal.Header>
        <Modal.Content>
          <Input
            onChange={this.addFile}
            fluid
            label="file types: jpg, png"
            type="file"
            name="file"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.sendFile}>
            <Icon name="checkmark" />
            Send
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileModal;
