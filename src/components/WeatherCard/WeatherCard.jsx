import { useEffect, useState } from "react";
import './WeatherCard.css'

function WeatherCard(props) {

    const [hourlyWeather, setHourlyWeather] = useState([])
    const [currentWeather, setCurrentWeather] = useState({})
    const [currenLocation, setLocation] = useState({})

    const cityName = "Lahore";

    useEffect(() => {
        fetchWeatherUpdate()
    }, [])


    const fetchWeatherUpdate = () => {
        fetchCurrentWeather();
        fetchHourlyDailyWeather();
    }

    const fetchCurrentWeather = async () => {
        const url = "http://api.weatherapi.com/v1/current.json?key=fc74c89a47664fdf834162111243103&q=" + cityName + "&aqi=yes";
        const res = await fetch(url, {
            method: 'GET'
        });


        const response = await res.json();
        // console.log(response)
        setCurrentWeather(response.current)
        setLocation(response.location)


        fetchHourlyDailyWeather();
    }


    const fetchHourlyDailyWeather = async () => {
        const url = "http://api.weatherapi.com/v1/forecast.json?key=fc74c89a47664fdf834162111243103&q=" + cityName + "&days=1&aqi=no&alerts=no";
        const res = await fetch(url, {
            method: 'GET'
        });


        const response = await res.json();
        console.log(response)
        setHourlyWeather(response.forecast.forecastday[0].hour)
    }


    const getHour = (time) =>{
        return time.split(" ")[1]
    }


    return (
        <>

            <div className="input-group mb-3 col-lg-6">
                <button className="fa fa-search input-group-text" onClick={fetchWeatherUpdate}></button>
                <input type="text" className="form-control" placeholder="Enter City Name" aria-label="City name" aria-describedby="basic-addon1" />
            </div>

            <div className="row w-container">
                <div className="card text-center col-4">
                    <div className="card-header">
                        Current Weather
                    </div>
                    <div className="card-body">
                        <div className="d-flex">
                            <span className="col-7">
                                <p className="cityName">{currenLocation?.name}, {currenLocation?.region}</p>
                                <span id="condition">
                                    <span id="weather">
                                        <img src={currentWeather?.condition?.icon}></img>
                                        <p className="display-1">{currentWeather?.temp_c}&deg; C</p>

                                    </span>
                                    <h6 className="text-muted font-weight-bold">{currentWeather?.condition?.text}</h6>
                                </span>

                            </span>
                            <span className="col-5 grid-container">
                                <span className="">Humidity: {currentWeather.humidity}</span>
                                <span>Feels Like: {currentWeather.feelslike_c}</span>
                                <span>Wind Speed: {currentWeather.wind_kph}/kph</span>
                                <span>Wind Direction: {currentWeather.wind_dir}</span>

                            </span>
                        </div>

                    </div>
                    <div className="card-footer text-muted">
                        Last Updated  {currentWeather.last_updated}
                    </div>
                </div>


                <div className="card text-center col-7">
                    <div className="card-header">
                        Hourly Weather
                    </div>
                    <div className="card-body hourly-weather">
                        {hourlyWeather.map((data) => {
                            return <div >
                                <img src={data.condition.icon} />
                                {/* <span>{data.condition.text}</span> */}
                                <span>{data.temp_c}&deg; C</span>
                                <span>{()=>{getHour(data.time)}}</span>
                            </div>

                        })}


                    </div>
                    <div className="card-footer text-muted">
                        Last Updated  {currentWeather.last_updated}
                    </div>
                </div>
            </div>
        </>


    )

}

export default WeatherCard;