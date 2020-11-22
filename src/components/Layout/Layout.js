import React, { Component } from "react";

import classes from "./Layout.module.css";

import Aux from "../../hoc/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";


class Layout extends Component {

    state = {
        showSideDrawer: true
    };


    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
        );
    }

}

export default Layout;