import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
    state = {
        query: 32,
        errorText: ""
    }

    handleChange = (event) => {
        let value = event.target.value;
        if (value <= 32 && value > 0) {
            this.setState({
                query: value,
                errorText: ""
            });
            this.props.updateEvents(null, value);
        } else {
            this.setState({
                query: value,
                errorText: "Select number from 1 to 32"
            });
        }

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
                <ErrorAlert text={this.state.errorText} />
            </div>
        )
    }
}

export default NumberOfEvents;