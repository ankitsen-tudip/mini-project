import React from "react";
import User from './component/User.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends React.Component {

  render() {
    return(
        <Router>
            <div style={{float:'left', marginLeft:'10px'}}>
                <Link to="/User">Home</Link>
            </div>
                <Route path="/User" exact component={User} />
        </Router>
    );
  }

} // ...

  export default App;
