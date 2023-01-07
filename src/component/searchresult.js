import React from 'react';
import './search.css';
import { Link } from 'react-router-dom';
import { APIfetch } from '../api/apifetch';
import SearchBar from './searchbar';
import CityCards from './citycards';
import LogoComp from '../router/Menu';


class SearchResult extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  inputVal: "",
                  cardVal: "",
                  CityData: [],
                  WeatherData: [],
                  mainData: [],
                  windData: [],
                  coordData: [],
                  CityError: '',
                  currentCard: 1,
            }
            this._inputChangedHandler = this._inputChangedHandler.bind(this);
            this._FranceCard = this._FranceCard.bind(this);
            this._naCard = this._naCard.bind(this);
            this._qatarCard = this._qatarCard.bind(this);
            this._japanCard = this._japanCard.bind(this);
      }

      componentDidMount() {
            this._inputChangedHandler();
            this._initialValue();
      }

      componentWillMount(){
            this._initialValue();
            this._cardApiCall();
      }

      _initialValue = async () => {

            this.setState({
                  inputVal: "france"
            });
            const { inputVal, CityData, CityError, WeatherData } = this.state;

            const response = await APIfetch("france");
            console.log("response : ", response);

            if (response && response.cod === "404") {
                  this.setState({ CityError: response.message });
                  console.log("error : ", CityError);
            } else if (response && response.cod == "200") {
                  this.setState({ CityError: '' });
                  this.setState({ CityData: response });
            };

            if (response.cod === "404" && inputVal == null) {
                  this.setState({ WeatherData: '' });
            } else if (response.cod == "200") {
                  this.setState({ WeatherData: response.weather[0] });
            }

            this.setState({ mainData: response.main });
            this.setState({ windData: response.wind });
            this.setState({ coordData: response.coord });
      }

      _inputChangedHandler = async (cityname) => {
            const { inputVal, CityData, CityError, WeatherData } = this.state;

            this.setState({
                  inputVal: cityname
            });

            const response = await APIfetch(cityname);
            console.log("response : ", response);

            if (response && response.cod === "404") {
                  this.setState({ CityError: response.message });
                  console.log("error : ", CityError);
            } else if (response && response.cod == "200") {
                  this.setState({ CityError: '' });
                  this.setState({ CityData: response });
            };

            if (response.cod === "404" && inputVal == null) {
                  this.setState({ WeatherData: '' });
            } else if (response.cod == "200") {
                  this.setState({ WeatherData: response.weather[0] });
            }

            this.setState({ mainData: response.main });
            this.setState({ windData: response.wind });
            this.setState({ coordData: response.coord });
      }


      _cardApiCall = async () => {
            const { inputVal, cardVal, CityData } = this.state;
            // const cityname = cardVal
            const response = await APIfetch(cardVal);

            if (response.cod === "404") {
                  this.setState({ CityError: response.message });
            } else if (response.cod == "200") {
                  this.setState({ CityError: '' });
                  this.setState({ CityData: response });
            }

            if (response.cod === "404" && inputVal == null) {
                  this.setState({ WeatherData: '' });
            } else if (response.cod == "200") {
                  this.setState({ WeatherData: response.weather[0] });
            }

            this.setState({ mainData: response.main });
            this.setState({ windData: response.wind });
            this.setState({ coordData: response.coord });
      }


      _FranceCard = (e) => {
            this.setState({ currentCard: 1, cardVal: 'france', inputVal: 'france' });
            this._cardApiCall();
      }
      _naCard = (e) => {
            this.setState({ currentCard: 2, cardVal: 'north america', inputVal: 'north america' });
            this._cardApiCall();
      }
      _qatarCard = (e) => {
            this.setState({ currentCard: 3, cardVal: 'qatar', inputVal: 'qatar' });
            this._cardApiCall();
      }
      _japanCard = (e) => {
            this.setState({ currentCard: 4, cardVal: 'japan', inputVal: 'japan' });
            this._cardApiCall();
      }


      render() {

            const { mainData, WeatherData, inputVal, windData, CityError, currentCard, cardVal } = this.state;
            const inDeg = `${mainData ? mainData.temp_max - 273.15 : ""}`;

            return (
                  <div id="searchresult">
                        <div
                              className={`px-5 ${inputVal == "france" ? "background-imgae-france" : inputVal == "qatar" ? "background-imgae-qatar" : inputVal == "japan" ? "background-imgae-japan" : inputVal == "north america" ? "background-imgae-na" : inputVal !== "" ? "background-imgae-other" : "background-imgae-france" }`}
                        >
                              <LogoComp />
                              <div className="result-area ">
                                    <div className="container">
                                          <div className="row">
                                                <div className="col col-xl-10 m-auto text-start">
                                                      {CityError ? (
                                                            <div className="Error-area mt-4 mb-5">
                                                                  <h1>{CityError}</h1>
                                                            </div>
                                                      ) :
                                                            <div className="data-area px-md-4">
                                                                  <div className={`col col-md-10 d-md-flex align-items-end justify-content-center justify-md-content-between ${currentCard === 2 ? "col-lg-9" : "col-lg-8"}`}>
                                                                        <div className="mb-5 mb-md-0 d-flex justify-content-center justify-md-content-start">
                                                                              <div className="text-center">
                                                                                    {inputVal !== "" && cardVal !== inputVal ? (
                                                                                          <h4 className="location">{this.state.inputVal}</h4>
                                                                                    ) : cardVal === this.state.inputVal && cardVal !== "" ? (
                                                                                          <h4 className="location">{this.state.cardVal}</h4>
                                                                                    ) : cardVal === "" && inputVal === "" ? (
                                                                                          <h4 className="location">France</h4>
                                                                                    ) : <h4 className="location">France</h4>
                                                                                    }
                                                                                    {inputVal !== '' && mainData ? (
                                                                                          <div className="d-flex location-deg justify-content-center">
                                                                                                <p className="deg-num mb-2">{inDeg}</p>
                                                                                                <p className="deg-icon">&deg;</p>
                                                                                          </div>
                                                                                    ) : <div className="d-flex justify-content-center location-deg">
                                                                                          <p className="deg-num">27</p>
                                                                                          <p className="deg-icon">&deg;</p>
                                                                                    </div>
                                                                                    }
                                                                                    {WeatherData.main !== undefined ? (
                                                                                          <h4 className="w-type">{WeatherData.main}</h4>
                                                                                    ) : (
                                                                                          <h4 className="w-type">Clouds</h4>
                                                                                    )}
                                                                              </div>
                                                                        </div>
                                                                        <div className="col col-md-6 d-flex justify-content-center align-items-center mx-auto">
                                                                              <div className="col humidity-area text-center">

                                                                                    <h4 className="humidity">humidity</h4>

                                                                                    {inputVal !== "" && mainData ? (
                                                                                          <div className="d-flex align-items-center  justify-content-center">
                                                                                                <p className="humidity-num">{mainData.humidity}</p>
                                                                                                <p className="humidity-per">%</p>
                                                                                          </div>
                                                                                    ) : (
                                                                                          <div className="d-flex align-items-center  justify-content-center">
                                                                                                <p className="humidity-num">94</p>
                                                                                                <p className="humidity-per">%</p>
                                                                                          </div>
                                                                                    )}
                                                                              </div>
                                                                              <div className="col text-center">
                                                                                    <h4 className="wind">Wind</h4>
                                                                                    {inputVal !== "" && windData ? (
                                                                                          <div className="d-flex align-items-center  justify-content-center">
                                                                                                <p className="wind-num">{windData.speed}</p>
                                                                                                <p className="wind-deg">K/M</p>
                                                                                          </div>
                                                                                    ) : (
                                                                                          <div className="d-flex align-items-center justify-content-center">
                                                                                                <p className="wind-num">1.54</p>
                                                                                                <p className="wind-deg">K/M</p>
                                                                                          </div>
                                                                                    )}
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      }
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className="search-bar-area mt-4">
                              <div className="contaoner">
                                    <SearchBar
                                          inputValueData={this._inputChangedHandler}
                                    />
                              </div>
                        </div>
                        <div className="">
                              <div className="container">
                                    <div className="row">
                                          <div className="card-area col col-xl-11 d-md-flex flex-wrap justify-content-between m-auto">
                                                <div className="col-md-6 col-lg-3">
                                                      <Link
                                                            onClick={this._FranceCard}
                                                            className={`card-1  ${currentCard === 1 ? "card-shadow" : ""}`}
                                                      >
                                                            <CityCards
                                                                  cityname={"France"}
                                                            />
                                                      </Link>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                      <Link onClick={this._naCard}
                                                            className={`card-2 ${currentCard === 2 ? "card-shadow" : ""}`}
                                                      >
                                                            <CityCards
                                                                  cityname={"North America"}
                                                            />
                                                      </Link>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                      <Link onClick={this._qatarCard}
                                                            className={`card-1 ${currentCard === 3 ? "card-shadow" : ""}`}
                                                      >
                                                            <CityCards
                                                                  cityname={"Qatar"}
                                                            />
                                                      </Link>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                      <Link onClick={this._japanCard}
                                                            className={`card-1 ${currentCard === 4 ? "card-shadow" : ""}`}
                                                      >
                                                            <CityCards
                                                                  cityname={"Japan"}
                                                            />
                                                      </Link>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            )
      }
}

export default SearchResult;