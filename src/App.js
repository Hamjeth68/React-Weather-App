import { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import countries from 'i18n-iso-countries';
import dateFormat from "dateformat";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [dailyApiData, setDailyApiData] = useState({});
  const [getLatState, setGetLatState] = useState('6.9271');
  const [getLonState, setGetLonState] = useState('79.8612');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;

  // event handlers
  const inputHandler1 = (event) => {
    setGetLatState(event.target.value);
  };

  const inputHandler2 = (event) => {
    setGetLonState(event.target.value);
  };

  // value is converted && rounded 
  const kelvinToCelsius = (K) => {
    return Math.round((K - 273.15).toFixed());
  };

  const submitHandler = () => {
    fetchWeather()
    fetchDailyWeather()
    console.log(dailyApiData)
    console.log(apiData)
  };


  // fetch data from weather
  const fetchWeather = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${getLatState}&lon=${getLonState}&units=metric&appid=${apiKey}`;
    return fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }

  // fetch data from onecall
  // the required feilds dose not contain in this api response as given in JSON response feild guide
  const fetchDailyWeather = () => {
    const Url = `https://api.openweathermap.org/data/2.5/onecall?lat=${getLatState}&lon=${getLonState}&exclude=hourly,daily&appid=${apiKey}`;
    return fetch(Url)
      .then((res) => res.json())
      .then((data) => setDailyApiData(data));
  }

  return (
    <div className="App">
      <div className="input-sec">
        <header className="d-flex justify-content-left align-items-left">
          Weather App
        </header>
      </div>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-start align-items-left">
          <div class="col-auto">
            <label for="lat" class="col-form-label">
              Enter Latitude :
            </label>
            <div className='d-flex justify-content-center'>
              <input
                type="text"
                id="lat"
                class="form-control"
                onChange={inputHandler1}
                value={getLatState}
              />
            </div>
            <label for="lon" class="col-form-label">
              Enter Longitude :
            </label>
            <div className='d-flex justify-content-left'>
              <input
                type="text"
                id="lon"
                class="form-control"
                onChange={inputHandler2}
                value={getLonState}
              />
            </div>
          </div>
          <hr className='line' />
          <button className="btn btn-primary mt-3" onClick={submitHandler}>
            Search
          </button>
        </div>
      </div>
      <div className="card mt-2 mx-auto" style={{ width: '70vw' }}>
        {apiData.main ? (
          <div class="card-body text-center">
            <div className="image-holder">
              <p className="h2">
                {kelvinToCelsius(apiData.main.temp)}&deg; C
              </p>

              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{' '}
                <strong>{apiData.name}, {apiData.sys.country}</strong>
              </p>
            </div>

            <img
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />
            <div className="row mt-4">
              <div className="col-md-6">
                <p>
                  <i class="fas fa-temperature-low "></i>{' '}
                  <strong>
                    {(apiData.main.temp)} C

                  </strong>
                </p>
                <span className="font-link">
                  <strong>Mostly {apiData.weather[0].main}</strong>
                </span>
              </div>
              <div class='vl'></div>
              <div className="col-md-6">
                <Container>
                  <Row>
                    <Col>
                      <p>
                        <i className="fas fa-temperature-high"></i>{' '}
                        <strong>
                          {kelvinToCelsius(apiData.main.temp_max)}&deg; C
                        </strong>
                      </p>

                      <span className="font-tx">High</span>
                    </Col>
                    <Col>
                      <p>
                        <strong>
                          {(apiData.wind.speed)}mph
                        </strong>
                      </p>

                      <span className="font-tx">Wind</span>
                    </Col>
                    <Col>
                      <p>
                        <strong>
                          {(dateFormat(apiData.sys.sunrise, "h:MM"))}
                        </strong>
                      </p>

                      <span className="font-tx">Sunrise</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        <i className="fas fa-temperature-low"></i>{' '}
                        <strong>
                          {kelvinToCelsius(apiData.main.temp_min)}&deg; C
                        </strong>
                      </p>

                      <span className="font-tx">Low</span>
                    </Col>
                    <Col>
                      <p>
                        <strong>
                          {(apiData.clouds.all)}%
                        </strong>
                      </p>

                      <span className="font-tx">Rain</span>
                    </Col>
                    <Col>
                      <p>
                        <strong>
                          {(dateFormat(apiData.sys.sunset, "h:MM"))}
                        </strong>
                      </p>

                      <span className="font-tx">Sunset</span>
                    </Col>
                  </Row>

                </Container>

                <p>
                  <strong>
                    {' '}
                    {countries.getName(apiData.sys.country, "LK", {
                      select: 'official',
                    })}
                  </strong>
                </p>
              </div>
            </div>
            <div>
              <Container>
                <Row>
                  <Col>
                    <Card>
                      <div className='crad-text'>
                        <Card.Title>TuesDay</Card.Title>
                        <Card.Img variant="top" src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`} />
                        <Card.Body>
                          <Card.Text>
                          </Card.Text>
                          <Button onClick={submitHandler} variant="primary">30</Button>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <div className='crad-text'>
                        <Card.Title>WednesDay</Card.Title>
                        <Card.Img variant="top" src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`} />
                        <Card.Body>
                          <Card.Text>
                          </Card.Text>
                          <Button onClick={submitHandler} variant="primary">30</Button>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <div className='crad-text'>
                        <Card.Title>ThursDay</Card.Title>
                        <Card.Img variant="top" src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`} />
                        <Card.Body>
                          <Card.Text>
                          </Card.Text>
                          <Button onClick={submitHandler} variant="primary">30</Button>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <div className='crad-text'>
                        <Card.Title>FriDay</Card.Title>
                        <Card.Img variant="top" src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`} />
                        <Card.Body>
                          <Card.Text>
                          </Card.Text>
                          <Button onClick={submitHandler} variant="primary">30</Button>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <div className='crad-text'>
                        <Card.Title>SaturDay</Card.Title>
                        <Card.Img variant="top" src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`} />
                        <Card.Body>
                          <Card.Text>
                          </Card.Text>
                          <Button onClick={submitHandler} variant="primary">30</Button>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <div className='crad-text'>
                        <Card.Title>SunDay</Card.Title>
                        <Card.Img variant="top" src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`} />
                        <Card.Body>
                          <Card.Text>
                          </Card.Text>
                          <Button onClick={submitHandler} variant="primary">30</Button>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
}

export default App;
