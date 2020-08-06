import React, { Component } from "react";
import "./recipe.css";
import { FaLeaf, FaStopwatch, FaThumbsUp } from "react-icons/fa";

const API_KEY = "12c5706944d344b3bd626bd0866d8e92";

class Recipe extends Component {
  state = {
    recipeDetail: [],
    recipeTitle: "",
    vegan: "",
    cookingMinutes: "",
    extendedIngredients: [],
    image: "",
    instructions: "",
    score: "",
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id;

    const API_CALL = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
    );
    const data = await API_CALL.json();
    this.setState({
      recipeDetail: data,
      recipeTitle: data.title,
      vegan: data.vegan,
      cookingMinutes: data.cookingMinutes,
      extendedIngredients: data.extendedIngredients,
      image: data.image,
      instructions: data.instructions,
      score: data.spoonacularScore,
    });
    console.log(data);
  };

  render() {
    const {
      recipeTitle,
      vegan,
      cookingMinutes,
      extendedIngredients,
      image,
      instructions,
      score,
    } = this.state;
    console.log(this.props);
    return (
      <div>
        <div className="recipeDetail-container">
          <img className="recipe-image" src={image} />
          <div className="recipe-content">
            <h1>{recipeTitle}</h1>
          </div>
          <div className="recipe-content">
            <FaStopwatch size="40px" color="rgb(0, 255, 0)" />
            <p>Pişirme süresi</p>
            <h2>{cookingMinutes}</h2>
          </div>
          <div className="recipe-content">
            <FaThumbsUp size="40px" color="rgb(0, 255, 0)" />
            <p>Beğeni Puanı</p>
            <h2>{score}</h2>
          </div>
          <div className="recipe-content">
            <FaLeaf
              size="40px"
              color={vegan == true ? "rgb(0, 255, 0)" : "red"}
            />
            <p>Vegan</p>
            <h2>{vegan}</h2>
          </div>
        </div>
        <div className="recipe-preparation">
          <div className="recipeIngredients">
            <h2>Gerekli Malzemeler</h2>
            <div>
              {extendedIngredients.map((ingredients) => {
                return (
                  <ul key={ingredients.id}>{<li>{ingredients.name}</li>}</ul>
                );
              })}
            </div>
            *
          </div>
          <div className="recipeInstructions">
            <h2>Hazırlanış</h2>
            <p>{instructions}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;

/* <div>
        {extendedIngredients.map((ingredients) => {
          return(<ul key={ingredients.id}>{<li>{ingredients.name}</li>}</ul>)
        })}
        </div>*/
