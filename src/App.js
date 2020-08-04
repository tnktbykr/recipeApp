import React from "react";
import Form from "./components/form/Form";
import Recipes from "./components/Recipes/Recipes";
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=12c5706944d344b3bd626bd0866d8e92

const App = () => {
  return (
    <div>
      <BrowserRouter>

        <Route path="/" exact component={Recipes} />
      </BrowserRouter>
    </div>
  );
};

export default App;
