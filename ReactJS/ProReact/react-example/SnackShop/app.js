import React, {
    Component
} from 'react';
import {
    render
} from 'react-dom';
import Container from './app/Container';

class App extends Component {
    render() {
        return (< Container />)
    }
}

render(<App />, document.getElementById("root"));