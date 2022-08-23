import React from 'react';
import { useParams } from 'react-router-dom';

export default function FoodDetail() {
  const { id } = useParams();

  return (
    <div>
      Food Detail
      {' '}
      {id}
    </div>
  );
}
