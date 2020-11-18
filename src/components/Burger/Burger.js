import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {

    const tfIngredient = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, index) => {
                return <BurgerIngredient key={igKey + index} type={igKey} />
            });
        });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {tfIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );

}

export default burger;