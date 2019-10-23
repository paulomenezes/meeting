import React, { useState } from 'react';
import { withRouter } from 'react-router';

import FirebaseService from '../../services/FirebaseService';

function MakeQuestion(props) {
  const [question, setQuestion] = useState('');
  const [questionError, setQuestionError] = useState(false);
  const [questions, setQuestions] = useState([]);

  const code = props.match.params.code;

  const questionChange = event => {
    setQuestion(event.target.value);
    setQuestionError(false);
  };

  const makeQuestion = () => {
    setQuestionError(!question);

    if (question) {
      const name = localStorage.getItem('name');
      FirebaseService.ref(`meeting/${code}/questions/${new Date().getTime()}`).set({
        user: name,
        question,
      });

      setQuestion('');
      setQuestions([{ question }, ...questions]);
    }
  };

  const riseHands = () => {
    if (questions.length === 0 || !questions[0].hands) {
      const name = localStorage.getItem('name');
      FirebaseService.ref(`meeting/${code}/questions/${new Date().getTime()}`).set({
        user: name,
        hands: true,
      });

      setQuestion('');
      setQuestions([{ hands: true }, ...questions]);
    }
  };

  return (
    <div className='container mx-auto'>
      <div className='md:w-2/3 lg:w-1/2 mx-4 md:mx-auto'>
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
              Faça sua pergunta
            </label>
            <textarea
              value={question}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                questionError ? 'border-red-500' : ''
              }`}
              id='name'
              type='text'
              placeholder='Faça sua pergunta'
              onChange={questionChange}
            ></textarea>
          </div>
          <div className='flex items-center justify-between flex-col sm:flex-row'>
            <button
              className='bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto'
              type='button'
              onClick={makeQuestion}
            >
              Perguntar
            </button>
            <button
              className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-2 sm:w-auto sm:mt-0'
              type='button'
              onClick={riseHands}
            >
              Levantar a mão
              <span role='img' aria-label='Levantar a mão' className='ml-2'>
                🙋
              </span>
            </button>
          </div>
        </div>
        {questions.map((question, index) => (
          <div key={index} className='bg-white shadow-md rounded px-8 py-2 mt-4'>
            <p className='text-3xl text-gray-700 text-base text-center'>
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
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(MakeQuestion);
