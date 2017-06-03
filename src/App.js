import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        var helloWorld = 'Welcome to React';
        var user = {
            name: 'André',
            lastName: 'Ferreira'
        };
        var country = 'Brazil';

        return (
            <div className="App">
                <h2>{helloWorld}, {user.name} {user.lastName}!</h2>
                <h3>We are in {country}</h3>
            </div>
        );
    }
}

export default App;