import React, { Component } from 'react';
import { APIfetch } from '../api/apifetch';
import { Link } from 'react-router-dom';
import './style.css';


class CityCards extends Component {
      constructor(props) {
            super(props);
            this.state = {

            };
      }


      render() {

            return (

                  <div id="card" className="col mb-4">
                        <div className="card cardStyle align-items-center" >
                              <div className="card-body">
                                    <h5 className="cityName">{this.props.cityname}</h5>
                              </div>
                        </div>
                  </div>
            );
      }
}

export default CityCards;
