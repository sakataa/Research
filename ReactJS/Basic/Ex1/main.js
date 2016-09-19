import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import Home from './Home.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'

class App extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    <li><Link>Home</Link></li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>

                {this.props.children}
            </div>
        );
    }
}
export default App;

ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "home" component = {Home} />
         <Route path = "about" component = {About} />
         <Route path = "contact" component = {Contact} />
      </Route>
   </Router>
	
), document.getElementById('app'))