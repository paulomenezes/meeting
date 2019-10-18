import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import FirebaseService from '../../services/FirebaseService';
import './App.css';

class App extends Component {
  state = {
    meetingName: '',
    meetingNameError: false,
    makeQuestion: '',
    makeQuestionError: false,
  };

  componentDidMount() {
    FirebaseService.getDataList('meeting', dataReceived => {
      console.log(dataReceived);
    });
  }

  generateMeetingId = length => {
    let result = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  createNew = () => {
    this.setState({
      meetingNameError: !this.state.meetingName,
    });

    if (this.state.meetingName) {
      const code = this.generateMeetingId(4);

      const newid = FirebaseService.set(`meeting/${code}`, {
        name: 'Teste',
        questions: [],
      });

      console.log(newid);

      this.props.history.push(`/meeting/${code}`);
    }
  };

  makeQuestion = () => {
    this.setState({
      makeQuestionError: !this.state.makeQuestion,
    });

    if (this.state.makeQuestion) {
      this.props.history.push(`/question/${this.state.makeQuestion}`);
    }
  };

  meetingNameChange = event => {
    this.setState({ meetingName: event.target.value });
  };

  makeQuestionChange = event => {
    this.setState({ makeQuestion: event.target.value });
  };

  render() {
    return (
      <div>
        <div className='container mx-auto'>
          <div className='w-1/2 mx-auto'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                  Acesse uma reunião
                </label>
                <input
                  value={this.state.makeQuestion}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    this.state.makeQuestionError ? 'border-red-500' : ''
                  }`}
                  id='name'
                  type='text'
                  placeholder='Digite seu código'
                  onChange={this.makeQuestionChange}
                />
              </div>
              <div className='flex items-center justify-between'>
                <button
                  className='bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='button'
                  onClick={this.makeQuestion}
                >
                  Acessar
                </button>
              </div>
            </form>
          </div>
          <p className='text-center text-gray-500 text-xs my-4'>ou</p>
          <div className='w-1/2 mx-auto'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                  Iniciar nova sessão de perguntas
                </label>
                <input
                  value={this.state.meetingName}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    this.state.meetingNameError ? 'border-red-500' : ''
                  }`}
                  id='name'
                  type='text'
                  placeholder='Nome da reunião'
                  onChange={this.meetingNameChange}
                />
              </div>
              <div className='flex items-center justify-between'>
                <button
                  className='bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='button'
                  onClick={this.createNew}
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
