import React, { Component } from "react";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen"
import "./nprogress.css";
import "./App.css";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import EventGenre from "./EventGenre";

class App extends Component {
    state = {
        events: [],
        locations: [],
        numberOfEvents: 32,
        location: "all",
        showWelcomeScreen: undefined
    }

    getData = () => {
        const { locations, events } = this.state;
        const data = locations.map(location => {
            const number = events.filter(event => event.location === location).length;
            const city = location.split(", ").shift();
            return { city, number };
        });
        return data;
    }

    async componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = (await checkToken(accessToken)).error ? false : true;
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        this.setState({ showWelcomeScreen: !(code || isTokenValid) });
        if ((code || isTokenValid) && this.mounted) {
            getEvents().then((events) => {
                if (this.mounted) {
                    events = events.slice(0, 32);
                    this.setState({ events, locations: extractLocations(events) });
                }
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    updateEvents = (location, eventCount) => {
        if (location) this.setState({ location });
        if (eventCount) this.setState({ numberOfEvents: eventCount });
        getEvents().then((events) => {
            const locationEvents = (this.state.location === "all") ?
                events :
                events.filter((event) => event.location === this.state.location);
            this.setState({
                events: locationEvents.slice(0, this.state.numberOfEvents)
            });
        });
    }

    render() {
        if (this.state.showWelcomeScreen === undefined) return <div className="App" />
        return (
            <div className="App" >
                <h1>Meet App</h1>

                <p>Choose your nearest city</p>
                <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />

                <NumberOfEvents updateEvents={this.updateEvents} />

                {!navigator.onLine ? <WarningAlert text={"You are offline, the displayed list has been loaded from the cache"} /> : null}

                <div className="data-vis-wrapper">
                    <EventGenre events={this.state.events} />
                    <ResponsiveContainer height={400} className="scatter">
                        <ScatterChart
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 10,
                                left: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="city" type="category" name="city" />
                            <YAxis dataKey="number" type="number" name="number of events" allowDecimals={false} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter data={this.getData()} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                <EventList events={this.state.events} />

                <WelcomeScreen
                    showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => { getAccessToken() }}
                />
            </div>
        );
    }
}

export default App;
