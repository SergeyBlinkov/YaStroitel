import React from 'react';

const CutWords = ({message}:{message:string}) => {
    return <p>{message.length > 12 ? message.slice(0,12) + '...' : message}</p>
};

export default CutWords;