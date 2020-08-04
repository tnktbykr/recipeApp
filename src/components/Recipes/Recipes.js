import React, { Component } from "react";
import "./recipes.css";
import Form from "../form/Form";
import { Pagination } from "antd";

const API_KEY = "12c5706944d344b3bd626bd0866d8e92";

class Recipes extends Component {
  state = {
    recipes: [],
    showNumber: 20,
    error: "",
    loading: false,
  };
  getRecipe = async (recipe) => {
    
    this.setState({
      loading: true,
    });
    const recipeName = recipe;
    const API_CALL = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&number=${this.state.showNumber}&apiKey=${API_KEY}`
    );
    
    const data = await API_CALL.json();
    console.log(data);
    this.setState({
      recipes: data.results,
      loading: false,
    });
    console.log(this.state.recipes);
  };
  render() {
    const { loading, recipes } = this.state;
    return (
      <div>
        <Form getRecipe={this.getRecipe} loading={loading} />
        {recipes.length == 0 ? (
          <div className="titles-container">
            <h3>heniz bir tarif aramadınız</h3>
          </div>
        ) : (
          <div className="main-container">
            {recipes.map((recipe) => {
              return (
                <div className="recipe-container" key={recipe.id}>
                  <img
                    className="recipe-image"
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  <div className="recipe-content">
                    <h4>{recipe.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Recipes;
/*
const Recipes = (props) => {
  return (
    <div>
      {props.recipes.length == 0 ? (
        <div className="titles-container">
          <h3>heniz bir tarif aramadınız</h3>
        </div>
      ) : (
        <div className="main-container">
          {props.recipes.map((recipe) => {
            return (
              <div className="recipe-container" key={recipe.id}>
                <img
                  className="recipe-image"
                  src={recipe.image}
                  alt={recipe.title}
                />
                <div className="recipe-content">
                  <h4>{recipe.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Recipes;

/*
<div>
{props.recipes.map((recipe) => {
  return (
    <div className="recipe-container" key={recipe.id}>
      <img className="recipe-image" src={recipe.image} alt={recipe.title} />
      <div className="recipe-content">
        <h4>{recipe.title}</h4>
        <p>{recipe.id}</p>
      </div>
    </div>
  );
})}
</div>


<div>
        <Form getRecipe={this.getRecipe} loading={loading} />
        <Recipes recipes={recipes} />
      </div>
    );*/
