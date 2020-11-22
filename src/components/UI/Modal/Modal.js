import React from "react";

import classes from "./Modal.module.css";

import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
            style={{
                transform: props.show ? "translateY(0)" : "translateY(-100v)",
                opacity: props.show ? "1" : "0",
                display: props.show ? "block" : "none"
            }}
            className={classes.Modal}>
            {props.children}
        </div>
    </Aux>

);

export default modal;