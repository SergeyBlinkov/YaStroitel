import React from 'react';

const CutWords = ({message}:{message:string}) => {
    return <>{message.length > 12 ? message.slice(0,12) + '...' : message}</>
};

export default CutWords;