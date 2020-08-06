import React, { Component } from "react";
import "./recipes.css";
import Form from "../form/Form";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

const API_KEY = "12c5706944d344b3bd626bd0866d8e92";

class Recipes extends Component {
  state = {
    recipes: [],
    pageSize: 20,
    error: "",
    loading: false,
    currentPage: 1,
    pageCount: 1,
    totalResult: "",
  };

  getRecipe = async (recipe) => {
    const { pageSize } = this.state;
    this.setState({
      loading: true,
    });
    const recipeName = recipe;
    const API_CALL = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&number=${pageSize}&apiKey=${API_KEY}`
    );

    const data = await API_CALL.json();
    console.log(data);

    this.setState({
      recipes: data.results,
      loading: false,
      totalResult: data.totalResults,
    });
    console.log(this.state.recipes);

    const pageCalculator = () => {
      const { totalResult, pageSize } = this.state;
      this.setState({
        pageCount: Math.ceil(totalResult / pageSize),
      });
      console.log(totalResult);
    };
    pageCalculator();
  };

  handlePageClick = (pageNo) => {
    console.log(pageNo);
  };

  onShowSizeChange=(current,size)=>{

    console.log(size)
  };

  render() {
    const { loading, recipes, totalResult } = this.state;
    return (
      <div>
        <Form getRecipe={this.getRecipe} loading={loading} />
        {recipes.length == 0 ? (
          <div className="titles-container">
            <h3>heniz bir tarif aramadınız</h3>
          </div>
        ) : (
          <div>
            <div className="pagination">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={20}
                pageSizeOptions={[50, 100]}
                onChange={this.handlePageClick}
                total={totalResult}
                
              />
            </div>
            <div className="main-container">
              {recipes.map((recipe) => {
                return (
                  <div className="recipe-container" key={recipe.id}>
                    <img
                      className="recipe-image"
                      src={recipe.image}
                      alt={recipe.title}
                    />
                    <div className="recipe-content-info">
                      <Link to={`/recipe/${recipe.id}`}>
                        <h3>{recipe.title}</h3>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
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
