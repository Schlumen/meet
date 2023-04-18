import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        query: 32
    }

    handleChange = (event) => {
        this.setState({ query: event.target.value });
        this.props.updateEvents(null, event.target.value);
    }

    render() {
        return (
            <div className="numberOfEvents">
                <label htmlFor="eventCount">Select number of events</label>
                <input
                    type="number"
                    className="nrOfEvents"
                    id="eventCount"
                    value={this.state.query}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default NumberOfEvents;