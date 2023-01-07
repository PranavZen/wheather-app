import React from 'react';
import './search.css';
import SearchIcon from '../assets/searchicon.png';
import LocateIcon from '../assets/locateicon.png';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  CityData: [],
                  citynInput: '',
                  CityError: '',
            }
            this._handleChange = this._handleChange.bind(this);
            this._handleSubmit = this._handleSubmit.bind(this);
      }

      _handleChange = async (e) => {
            const inputText = e.target.value;
            this.setState({ citynInput: inputText });
      }

      _handleSubmit = (e) => {
            e.preventDefault();
            const inputText = e.target.value;
            this.props.inputValueData(this.state.citynInput)
      }


      render() {
            return (

                              <div className="col-10 col-md-8 col-lg-6 m-auto">
                                    <form onSubmit={this._handleSubmit}>
                                          <div className="search-bar">

                                                <Link><img src={SearchIcon} className="icon-item search-icon" /></Link>
                                                <Link><img src={LocateIcon} className="icon-item locate-icon" /></Link>

                                                <input
                                                      className="searchbar"
                                                      type="text"
                                                      placeholder="Search Any Location"
                                                      value={this.state.citynInput}
                                                      onChange={this._handleChange}
                                                />
                                          </div>
                                    </form>
                              </div>

            )
      }
}
export default SearchBar;