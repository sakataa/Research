import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBoard from './components/KanbanBoard';
import Data from './util/data';

ReactDOM.render(
    <KanbanBoard cards={Data.Cards} />, 
    document.getElementById("app")
);