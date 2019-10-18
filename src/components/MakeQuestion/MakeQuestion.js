import React, { Component } from 'react';
import { withRouter } from 'react-router';

import FirebaseService from '../../services/FirebaseService';

class MakeQuestion extends Component {
  state = {
    question: '',
    questionError: false,
  };

  questionChange = event => {
    this.setState({ question: event.target.value });
  };

  makeQuestion = () => {
    this.setState({
      questionError: !this.state.question,
    });

    if (this.state.question) {
      const newid = FirebaseService.ref(`meeting/${this.props.match.params.code}/questions`).push(this.state.question);

      console.log(newid);

      // this.props.history.push(`/meeting/${code}`);
    }
  };

  render() {
    return (
      <div className='container mx-auto'>
        <div className='w-1/2 mx-auto'>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Faça sua pergunta
              </label>
              <textarea
                value={this.state.question}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id='name'
                type='text'
                placeholder='Faça sua pergunta'
                onChange={this.questionChange}
              ></textarea>
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={this.makeQuestion}
              >
                Perguntar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(MakeQuestion);
