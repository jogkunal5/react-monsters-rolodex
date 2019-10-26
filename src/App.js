import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super(); // it calls the constructor method on the Component class and gives access of this.state

    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  // This is lifecycle method of react and it gets called when component gets initialized.
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value }, () => {
      console.log(this.state);
    });
  }

  render() {

    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App" >
        <h1>Monsters Rolodex</h1>
        <SearchBox placeholder='Search Monsters' handleChange={this.handleChange}>
        </SearchBox>
        <CardList monsters={filteredMonsters}></CardList> {/* Passing monsters object to CardList component */}
      </div>
    );
  }
}

export default App;
