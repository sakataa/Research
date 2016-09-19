import React from 'react';
import { Link } from 'react-router'

class App extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    <Link>Home</Link>
                    <Link>About</Link>
                    <Link>Contact</Link>
                </ul>

                {this.props.children}
            </div>
        );
    }
}
export default App;