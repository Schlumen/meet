import React, { Component } from "react";

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.height = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            height: this.height
        };
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = "blue";
        this.height = "40px";
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = "red";
        this.height = "20px";
    }
}

export {
    InfoAlert,
    ErrorAlert
};