import React, { Component } from "react";
import axios from "../../axios-orders";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandling/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAdd = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0)
            return;
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAdd = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
        this.updatePurchaseState(updatedIngredient);
    }

    updatePurchaseState = (updatedIngredient) => {
        const ingredients = { ...updatedIngredient };
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((newSum, el) => newSum + el, 0);
        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinuedHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            custumer: {
                name: "Max aaa",
                address: {
                    street: "Test 1",
                    zipCode: "121212",
                    country: "italy"
                },
                email: "asadsad@asdsad.com"
            },
            deliveryMethod: "fastest"
        }
        axios.post("/orders.json", order).then(
            response => {
                console.log(response);
                this.setState({ loading: false, purchasing: false });
            }
        ).catch(
            response => {
                this.setState({ loading: false, purchasing: false });
                console.log(response);
            }
        );
    }

    componentDidMount() {
        axios.get("https://react-my-burger-6c5d9.firebaseio.com/ingredients.json").then(
            respose => {
                this.setState({ ingredients: respose.data })
            }
        );
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let burger = <Spinner />;
        let orderSummary = <Spinner />;

        if (this.state.ingredients) {

            orderSummary = this.state.loading ? <Spinner /> : <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                price={this.state.totalPrice}
            />

            burger =
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

export default withErrorHandler(BurgerBuilder, axios);