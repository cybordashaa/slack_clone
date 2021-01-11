import React from 'react';
import { Comment, Segment } from 'semantic-ui-react';
import MessageForm from './MessageForm';
import MessagesHeader from './MessagesHeader';

class Messages extends React.Component{
    render(){
        return (
            <React.Fragment>
                <MessagesHeader/>

                <Segment>
                    <Comment.Group className="messages">
                        {/* messages */}

                    </Comment.Group>
                </Segment>
                <MessageForm />
            </React.Fragment>
        );
    }
}

export default Messages;