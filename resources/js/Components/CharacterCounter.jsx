// CharacterCounter.js
import React from 'react';

const CharacterCounter = ({ currentCount, limit }) => {
    return (
        <p className="text-sm text-gray-500">
            {currentCount}/{limit} caracteres
        </p>
    );
};

export default CharacterCounter;