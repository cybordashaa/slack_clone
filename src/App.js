import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from 'react-redux';
import "./components/App.css";
import ColorPanel from "./components/ColorPanel/ColorPanel";
import Messages from "./components/Messages/messages";
import SidePanel from "./components/SidePanel/SidePanel";
import MetaPanel from "./components/MetaPanel/MetaPanel";

function App({ currentUser, currentChannel, isPrivateChannel, userPosts }) {
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel
        key={currentUser && currentUser.uid} 
        currentUser={currentUser} />
      <Grid.Column style={{ marginLeft: 340 }} >
        <Messages
          currentUser={currentUser}
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          isPrivateChannel={isPrivateChannel}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel 
           key={currentChannel && currentChannel.id} 
           currentChannel={currentChannel}
           isPrivateChannel={isPrivateChannel}
           userPosts = {userPosts} />
      </Grid.Column>
    </Grid>
  );
}

const mapStateFromProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts
})

export default connect(mapStateFromProps)(App);
