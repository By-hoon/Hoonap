import React from "react";
import AddPresenter from "./AddPresenter";

export default class extends React.Component {
    render() {
        return (
            <AddPresenter userObj={this.props.userObj} />
        )
    }
}