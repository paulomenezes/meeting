import React, { Component } from 'react';
import { withRouter } from 'react-router';

class NewMeeting extends Component {
  render() {
    return (
      <div className='container mx-auto'>
        <div className='w-1/3 mx-auto'>
          <div className='rounded overflow-hidden shadow-lg bg-white'>
            <p className='text-center text-gray-500 text-xs mt-1'>Código da sua reunião:</p>

            <p className='text-6xl text-gray-700 text-base text-center'>{this.props.match.params.code}</p>

            <p className='text-center text-gray-500 text-xs mb-1'>Compartilhe com seu público</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewMeeting);
