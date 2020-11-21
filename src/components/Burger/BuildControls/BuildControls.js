import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(ctr =>
            <BuildControl
                key={ctr.label}
                label={ctr.label}
                added={() => props.ingredientAdded(ctr.type)}
                removed={() => props.ingredientRemoved(ctr.type)}
                disabled={props.disabled[ctr.type]}
            />
        )}
    </div>
);
export default buildControls;