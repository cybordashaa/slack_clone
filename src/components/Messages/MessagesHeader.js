import React from "react";
import { Header, Icon, Input, Segment } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
    return (
      <Segment clearing>
        <Header
          fluid="true"
          as="h2"
          floated="left"
          style={{
            marginBottom: 0,
          }}
        >
          Channel
          <Icon 
            name="star outline"
            color="black" />
            <Header.Subheader> 2 Users</Header.Subheader>
        </Header>
        {/* Channel Search input */}
        <Header floated="right">
            <Input size="mini" icon="search" name="search" placeholder="Search Messages"/>
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;