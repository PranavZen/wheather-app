import React from 'react';
import SearchResult from './searchresult';
import SearchBar from './searchbar';
import CityCards from './citycards';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <section>
        <div>
          <SearchResult />
        </div>
      </section>
    );
  }
}

export default Home;
