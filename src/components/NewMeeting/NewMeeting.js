import React, { Component } from 'react';
import { withRouter } from 'react-router';

import FirebaseService from '../../services/FirebaseService';

class NewMeeting extends Component {
  state = {
    items: {},
    keys: [],
  };

  componentDidMount() {
    FirebaseService.ref(`meeting/${this.props.match.params.code}/questions`).on('value', snapshot => {
      if (snapshot.val()) {
        this.setState({
          keys: Object.keys(snapshot.val()).sort((a, b) => b.localeCompare(a)),
          items: snapshot.val(),
        });
      }
    });
  }

  render() {
    return (
      <div className='container mx-auto'>
        <div className='md:w-2/3 lg:w-1/2 mx-4 md:mx-auto'>
          <div className='rounded overflow-hidden shadow-lg bg-white'>
            <p className='text-center text-gray-500 text-xs mt-1'>Código da sua reunião:</p>

            <p className='text-6xl text-gray-700 text-base text-center'>{this.props.match.params.code}</p>

            <p className='text-center text-gray-500 text-xs mb-1'>Compartilhe com seu público</p>
          </div>

          {this.state.keys.map(key => (
            <div className='rounded overflow-hidden shadow-lg bg-white mt-4' key={key}>
              <p className='text-center text-gray-500 text-xs mt-1'>{this.state.items[key].user}</p>
              {this.state.items[key].question ? (
                <p className='text-3xl text-gray-700 text-base text-center'>{this.state.items[key].question}</p>
              ) : (
                <p className='text-3xl text-gray-700 text-base text-center'>
                  <span role='img' aria-label='Levantar a mão'>
                    🙋
                  </span>
                  Levantou a mão
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(NewMeeting);
