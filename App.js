import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import AnimeDetail from './components/AnimeDetail';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/anime/:id" component={AnimeDetail} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
