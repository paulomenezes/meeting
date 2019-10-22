import React, { Component } from 'react';
import { withRouter } from 'react-router';

import FirebaseService from '../../services/FirebaseService';

class MakeQuestion extends Component {
  state = {
    question: '',
    questionError: false,
    questions: [],
  };

  questionChange = event => {
    this.setState({ question: event.target.value });
  };

  makeQuestion = () => {
    this.setState({
      questionError: !this.state.question,
    });

    if (this.state.question) {
      const question = this.state.question;

      const name = localStorage.getItem('name');
      FirebaseService.ref(`meeting/${this.props.match.params.code}/questions/${new Date().getTime()}`).set({
        user: name,
        question,
      });

      const questions = this.state.questions;
      questions.splice(0, 0, { question });

      this.setState({
        question: '',
        questions,
      });
    }
  };

  riseHands = () => {
    const questions = this.state.questions;

    if (questions.length === 0 || !questions[0].hands) {
      const name = localStorage.getItem('name');
      FirebaseService.ref(`meeting/${this.props.match.params.code}/questions/${new Date().getTime()}`).set({
        user: name,
        hands: true,
      });

      questions.splice(0, 0, { hands: true });

      this.setState({
        question: '',
        questions,
      });
    }
  };

  render() {
    return (
      <div className='container mx-auto'>
        <div className='md:w-2/3 lg:w-1/2 mx-4 md:mx-auto'>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
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
            <div className='flex items-center justify-between flex-col sm:flex-row'>
              <button
                className='bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto'
                type='button'
                onClick={this.makeQuestion}
              >
                Perguntar
              </button>
              <button
                className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-2 sm:w-auto sm:mt-0'
                type='button'
                onClick={this.riseHands}
              >
                Levantar a mão
                <span role='img' aria-label='Levantar a mão' className='ml-2'>
                  🙋
                </span>
              </button>
            </div>
          </div>
          {this.state.questions.map((question, index) => (
            <div key={index} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4'>
              {question.question ? (
                question.question
              ) : (
                <span>
                  <span role='img' aria-label='Levantar a mão'>
                    🙋
                  </span>
                  Levantou a mão
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(MakeQuestion);
