import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfields: ''
        };
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    };

    onSearchChange = (event) => {
        this.setState({ searchfields: event.target.value });
    };

    render() {
        const { robots, searchfields } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfields.toLowerCase());
        });
        if (robots.length === 0) {
            return (
                <h1 className='tc'>Loading...</h1>
            )
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>

                </div>
            );
        };
    };
};

export default App;
