import React, { Component } from "react";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import "./nprogress.css";
import "./App.css";

class App extends Component {
    state = {
        events: [],
        locations: [],
        numberOfEvents: 32,
        location: "all"
    }

    componentDidMount() {
        this.mounted = true;
        getEvents().then((events) => {
            if (this.mounted) {
                events = events.slice(0, 32);
                this.setState({ events, locations: extractLocations(events) });
            }
        });
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
        return (
            <div className="App" >
                <h1>Meet App</h1>
                <p>Choose your nearest city</p>
                <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                <NumberOfEvents updateEvents={this.updateEvents} />
                <EventList events={this.state.events} />
            </div>
        );
    }
}

export default App;