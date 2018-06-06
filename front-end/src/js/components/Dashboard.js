import React from 'react';
import {connect} from 'react-redux';
import {
  messageRead,
  messageCreate,
} from '../actions/message-actions';
import MessageForm from './MessageForm';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    props.dashboardReadMessages();
  }

  render() {
    return (
      <div>
        <MessageForm onSubmit={this.props.dashboardCreateMessage}/>
        {
          this.props.messages.map(element => {
            return <div key={element.id}>{element.string}</div>
          })
        }
        {this.props.error && <div>ERROR:{this.props.error}</div>}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state.messageReducer.messages,
    error: state.messageReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dashboardReadMessages: () => dispatch(messageRead()),
    dashboardCreateMessage: (messageObj) => dispatch(messageCreate(messageObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);