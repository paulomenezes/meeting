import React, { Component } from 'react';
import { withRouter } from 'react-router';

import FirebaseService from '../../services/FirebaseService';

class NewMeeting extends Component {
  state = {
    items: {},
  };

  componentDidMount() {
    FirebaseService.ref(`meeting/${this.props.match.params.code}/questions`).on('value', snapshot => {
      console.log(snapshot.val());
      this.setState({
        items: snapshot.val(),
      });
    });
  }

  render() {
    return (
      <div className='container mx-auto'>
        <div className='w-1/3 mx-auto'>
          <div className='rounded overflow-hidden shadow-lg bg-white'>
            <p className='text-center text-gray-500 text-xs mt-1'>Código da sua reunião:</p>

            <p className='text-6xl text-gray-700 text-base text-center'>{this.props.match.params.code}</p>

            <p className='text-center text-gray-500 text-xs mb-1'>Compartilhe com seu público</p>
          </div>

          {Object.keys(this.state.items).map(key => (
            <div className='rounded overflow-hidden shadow-lg bg-white' key={key}>
              <p className='text-6xl text-gray-700 text-base text-center'>{this.state.items[key]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(NewMeeting);
