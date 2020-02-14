import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

import { setSearchField, requestRobots } from './actions';

// what state to listen to
const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

// what action needs to be dispatch based on state
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  // constructor() {
  //     super(); // it calls the constructor method on the Component class and gives access of this.state

  //     this.state = {
  //       monsters: []
  //     }
  // }

  // This is lifecycle method of react and it gets called when component gets initialized.
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {

    const { robots, searchField, onSearchChange, isPending } = this.props;

    const filteredMonsters = robots.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return isPending ?
      <h1>Loading</h1> :
      (
        <div className="App" >
          <h1>Monsters Rolodex</h1>
          <SearchBox placeholder='Search Monsters' handleChange={onSearchChange}>
          </SearchBox>
          <CardList monsters={filteredMonsters}></CardList> {/* Passing monsters object to CardList component */}
        </div>
      );
  }
}

/** 
 * connect() is a higher order function (higher order function: a function that return another function)
 * @mapStateToProps: state to listen
 * @mapDispatchToProps: state to dispatch
 **/

export default connect(mapStateToProps, mapDispatchToProps)(App);
