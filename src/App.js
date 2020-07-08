import React, {Component} from 'react';
import './App.css';
import Driver from './Components/Driver/Driver';
import CalendarInput from './Components/CalendarInput/CalendarInput';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component{

  render(){
  return (
    <div className="Background">
      <Router>
        <Route exact path="/" component={Driver} />
        <Route exact path="/activity" component={CalendarInput} />
      </Router>
    </div>
  );
  }
}

export default App;
