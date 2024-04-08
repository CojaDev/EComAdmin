import React from 'react';
import { Circles } from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center absolute top-0 left-0 w-screen h-screen bg-white">
      <Circles color="#333" height={50} width={200} className="m-5" />

      <p className="text-lg text-center px-2">Loading {message.trim()}</p>
    </div>
  );
}

export default Spinner;
