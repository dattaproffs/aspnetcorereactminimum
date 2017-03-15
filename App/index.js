import React, { Component } from 'react';
import {render} from 'react-dom'

import Main from './Components/Main'

render((
    <Main />
), document.getElementById('react-app'));

if(module.hot){
    module.hot.accept()
}