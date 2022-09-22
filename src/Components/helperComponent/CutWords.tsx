import React from 'react';

const CutWords = ({message}:{message:string}) => {
    return <>{message.length > 15 ? message.slice(0,13) + '...' : message}</>
};

export default CutWords;