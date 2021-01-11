import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from 'react-redux';
import "./components/App.css";
import ColorPanel from "./components/ColorPanel/ColorPanel";
import Messages from "./components/Messages/messages";
import SidePanel from "./components/SidePanel/SidePanel";
import MetaPanel from "./components/MetaPanel/MetaPanel";

function App({ currentUser }) {
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      
      <ColorPanel />
      <SidePanel currentUser={currentUser} />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}

const mapStateFromProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateFromProps)(App);
