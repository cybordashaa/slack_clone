import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from 'react-redux';
import "./components/App.css";
import ColorPanel from "./components/ColorPanel/ColorPanel";
import Messages from "./components/Messages/messages";
import SidePanel from "./components/SidePanel/SidePanel";
import MetaPanel from "./components/MetaPanel/MetaPanel";

const initialColorsState = {
  primaryColor: '#4c3c4c',
  secondaryColor: '#eee'
}
function App({ currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor }) {
  return (
    <Grid columns="equal" className="app" style={{ background: secondaryColor ? secondaryColor : initialColorsState.secondaryColor }}>
      <ColorPanel
         key={currentUser && currentUser.name} 
         currentUser={currentUser} />
      <SidePanel
        primaryColor={primaryColor ? primaryColor : initialColorsState.primaryColor }
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
           key={currentChannel && currentChannel.name} 
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
  userPosts: state.channel.userPosts,
  primaryColor: state.color.primaryColor,
  secondaryColor: state.color.secondaryColor
})

export default connect(mapStateFromProps)(App);
