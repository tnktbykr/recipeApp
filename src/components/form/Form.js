import React, { Component } from "react";
import "./form.css";
import { Button } from "antd";
class Form extends Component {
  state = {
    recipeName: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      recipeName: e.target.value,
    });
    
  };

  handleSubmit = () => {
    this.props.getRecipe(this.state.recipeName);
  };
  render() {
    return (
      <div className="form-container">
        <h3>Recipe Search</h3>
        <form>
          <input
            className="search-input"
            placeholder="recipe search"
            onChange={this.handleChange}
            type="text"
            value={this.state.recipeName}
          />
          <Button
            type="primary"
            onClick={this.handleSubmit}
            className="search-button"
            loading={this.props.loading}
          >
            tarifi ara
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;
