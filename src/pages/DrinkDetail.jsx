import React from 'react';
import { useParams } from 'react-router-dom';

export default function DrinkDetail() {
  const { id } = useParams();

  return (
    <div>
      Drink Detail
      <p>
        {` id: ${id}`}
      </p>
    </div>
  );
}
