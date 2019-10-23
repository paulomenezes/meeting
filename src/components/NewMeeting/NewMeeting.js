import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import FirebaseService from '../../services/FirebaseService';

function NewMeeting(props) {
  const [items, setItems] = useState({});
  const [keys, setKeys] = useState([]);

  const code = props.match.params.code;

  useEffect(() => {
    FirebaseService.ref(`meeting/${code}/questions`).on('value', snapshot => {
      if (snapshot.val()) {
        setItems(snapshot.val());
        setKeys(Object.keys(snapshot.val()).sort((a, b) => b.localeCompare(a)));
      }
    });

    return () => FirebaseService.ref(`meeting/${code}/questions`).off('value');
  }, [code]);

  return (
    <div className='container mx-auto'>
      <div className='md:w-2/3 lg:w-1/2 mx-4 md:mx-auto pb-8'>
        <div className='rounded overflow-hidden shadow-lg bg-white'>
          <p className='text-center text-gray-500 text-xs mt-1'>Código da sua reunião:</p>

          <p className='text-6xl text-gray-700 text-base text-center'>{code}</p>

          <p className='text-center text-gray-500 text-xs mb-1'>Compartilhe com seu público</p>
        </div>

        {keys.map(key => (
          <div className='rounded overflow-hidden shadow-lg bg-white mt-4' key={key}>
            <p className='text-center text-gray-500 text-xs mt-1'>{items[key].user}</p>
            {items[key].question ? (
              <p className='text-3xl text-gray-700 text-base text-center'>{items[key].question}</p>
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

export default withRouter(NewMeeting);
