import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBoardContainer from './components/KanbanBoardContainer';
import Data from './util/data';

ReactDOM.render(
    <KanbanBoardContainer />, 
    document.getElementById("app")
);