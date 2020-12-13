import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import MyComponent from './components/MyComponent'

class App extends Component{
  constructor(props) {
      super(props)
  }
  render() {
    return (
      <Router>
        <Route exact path="/" component={MyComponent} />
        <Route exact path="/home" component={Home} />
      </Router>
    )
  }
}
export default App