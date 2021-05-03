import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Child = (props) => {
return(
<button>{props.title}</button>
);
};

export default Child;