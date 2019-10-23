import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import FirebaseService from '../../services/FirebaseService';

function useInputWithError(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [valueError, setValueError] = useState(false);

  return [value, setValue, valueError, setValueError];
}

function App(props) {
  const storageName = localStorage.getItem('name');

  const [name, setName, nameError, setNameError] = useInputWithError(storageName);
  const [meetingName, setMeetingName, meetingNameError, setMeetingNameError] = useInputWithError();
  const [makeQuestion, setMakeQuestion, makeQuestionError, setMakeQuestionError] = useInputWithError();

  const [meetingDoesNotExist, setMeetingDoesNotExist] = useState(false);

  const generateMeetingId = length => {
    let result = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const createNew = () => {
    setMeetingNameError(!meetingName);

    if (meetingName) {
      const code = generateMeetingId(4);

      FirebaseService.set(`meeting/${code}`, {
        name: meetingName,
        questions: [],
      });

      props.history.push(`/meeting/${code}`);
    }
  };

  const makeQuestionOnClick = () => {
    setNameError(!name);
    setMakeQuestionError(!makeQuestion);
    setMeetingDoesNotExist(false);

    if (makeQuestion && name) {
      localStorage.setItem('name', name);

      FirebaseService.ref(`meeting/${makeQuestion}`).once('value', snapshot => {
        if (snapshot.exists()) {
          props.history.push(`/question/${makeQuestion}`);
        } else {
          setMeetingDoesNotExist(true);
        }
      });
    }
  };

  const meetingNameChange = event => {
    setMeetingNameError(false);
    setMeetingName(event.target.value);
  };

  const makeQuestionChange = event => {
    setMakeQuestionError(false);
    setMakeQuestion(event.target.value);
  };

  const nameChange = event => {
    setNameError(false);
    setName(event.target.value);
  };

  const toInputUppercase = event => {
    event.target.value = `${event.target.value}`.toUpperCase();
  };

  return (
    <div>
      <div className='container mx-auto'>
        <div className='md:w-2/3 lg:w-1/2 mx-4 md:mx-auto'>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Digite seu nome
              </label>
              <input
                value={name}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  nameError ? 'border-red-500' : ''
                }`}
                id='name'
                type='text'
                placeholder='Digite seu nome'
                onChange={nameChange}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Acesse uma reunião
              </label>
              <input
                value={makeQuestion}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  makeQuestionError ? 'border-red-500' : ''
                }`}
                id='name'
                type='text'
                placeholder='Digite seu código'
                onChange={makeQuestionChange}
                onInput={toInputUppercase}
              />
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={makeQuestionOnClick}
              >
                Acessar
              </button>
            </div>
            {meetingDoesNotExist && <div>Reunião não existe</div>}
          </form>
        </div>
        <p className='text-center text-gray-500 text-xs my-4'>ou</p>
        <div className='md:w-2/3 lg:w-1/2 mx-4 md:mx-auto'>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Iniciar nova sessão de perguntas
              </label>
              <input
                value={meetingName}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  meetingNameError ? 'border-red-500' : ''
                }`}
                id='name'
                type='text'
                placeholder='Nome da reunião'
                onChange={meetingNameChange}
              />
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={createNew}
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

export default withRouter(App);
