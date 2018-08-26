import * as React from 'react';
import { fetchFromLocalStorage } from '../services/storage.service';

const changeInputCondition = () => {
  console.log('The condition has been changed!')
};

export const showInput = () => {
  const data = fetchFromLocalStorage();
  return data.map(item => (
    <div key={ item.id } >
      <p>{ item.question }</p>
      
    </div>
    )
  )
};
