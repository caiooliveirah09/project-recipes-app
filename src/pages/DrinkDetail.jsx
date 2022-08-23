import React from 'react';
import { useParams } from 'react-router-dom';

export default function DrinkDetail() {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      Drink Detail
      {' '}
      {id}
    </div>
  );
}
