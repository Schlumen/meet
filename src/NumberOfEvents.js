import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        query: 32
    }

    handleChange = async (event) => {
        await this.setState({ query: event.target.value });
        this.props.updateEvents(null, this.state.query);
    }

    render() {
        return (
            <div className="numberOfEvents">
                <input
                    type="number"
                    className="nrOfEvents"
                    value={this.state.query}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default NumberOfEvents;