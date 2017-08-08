import React from 'react';
import ReactDOM from 'react-dom';
import ContactsApp from './components/ContacsApp';

let contacts = [{
        name: "Cassio Zen",
        email: "cassiozen@gmail.com"
    },
    {
        name: "Dan Abramov",
        email: "gaearon@somewhere.com"
    },
    {
        name: "Pete Hunt",
        email: "floydophone@somewhere.com"
    },
    {
        name: "Paul O’Shannessy",
        email: "zpao@somewhere.com"
    },
    {
        name: "Ryan Florence",
        email: "rpflorence@somewhere.com"
    },
    {
        name: "Sebastian Markbage",
        email: "sebmarkbage@here.com"
    },
]
ReactDOM.render( 
    <ContactsApp contacts = {contacts} />, document.getElementById('app'));