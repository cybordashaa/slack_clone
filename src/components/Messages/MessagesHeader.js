import React from "react";
import { Header, Icon, Input, Segment } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
    const {
      channelName,
      numUniqueUsers,
      handleSearchChange,
      searchLoading,
      isPrivateChannel,
      isChannelStarred,
      handleStar
    } = this.props;
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
          <span>
            {channelName}

            {!isPrivateChannel && (
              <Icon 
                name={isChannelStarred ? 'star' : 'star outline'} 
                color={isChannelStarred ? 'yellow' : 'black'}
                onClick={handleStar} />
            )}
          </span>
          <Header.Subheader> {numUniqueUsers} </Header.Subheader>
        </Header>
        {/* Channel Search input */}
        <Header floated="right">
          <Input
            loading={searchLoading}
            onChange={handleSearchChange}
            size="mini"
            icon="search"
            name="search"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;