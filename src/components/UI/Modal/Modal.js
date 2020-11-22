import React, { Component } from "react";

import classes from "./Modal.module.css";

import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

class modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {

        return (
            < Aux >
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(-100v)",
                        opacity: this.props.show ? "1" : "0",
                        zIndex: this.props.show ? "500" : "-1"
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </Aux >
        );

    }
}

export default modal;