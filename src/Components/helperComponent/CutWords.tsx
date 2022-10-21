import React from 'react';

const CutWords = ({message}:{message:string}) => {
    return <>{message.length > 22 ? message.slice(0,22) + '...' : message}</>
};

export default CutWords;