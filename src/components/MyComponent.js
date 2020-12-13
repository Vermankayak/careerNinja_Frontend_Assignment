import React, {Component} from 'react';
import TextInput from 'react-autocomplete-input';
import "react-autocomplete-input/dist/bundle.css"
import axios from 'axios'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './Search.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import valueAction from '../actions/valueAction';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {windowSize: "", thumbWidth: 75}
    this.optionsKing = []
    this.optionsTypes = []
    this.optionsLocations = []
  }

  async componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    let optionsKing = await axios.get("https://backend-assignment-careerninja.herokuapp.com/api/battle/list-kings");
    let optionsType = await axios.get("https://backend-assignment-careerninja.herokuapp.com/api/battle/list-types");
    let optionsLocation = await axios.get("https://backend-assignment-careerninja.herokuapp.com/api/battle/list-location");
    
    this.optionsKing = optionsKing.data.kings
    this.optionsTypes = optionsType.data.types
    this.optionsLocations = optionsLocation.data.locations
    this.props.valueAction({optionsKing:this.optionsKing, optionsTypes:this.optionsTypes, optionsLocations:this.optionsLocations, kingsValue:this.props.values.kingsValue, typesValue:this.props.values.typesValue, locationValue:this.props.values.locationValue})
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleRequestOptions = (part) => {
    this.props.valueAction({optionsKing:this.optionsKing, optionsTypes:this.optionsTypes, optionsLocations:this.optionsLocations, kingsValue:this.props.values.kingsValue, typesValue:this.props.values.typesValue, locationValue:this.props.values.locationValue})
  }
handleChange = (value, key) => {
  if (key === "king") {
    this.props.valueAction({optionsKing:this.optionsKing, optionsTypes:this.optionsTypes, optionsLocations:this.optionsLocations,  kingsValue:value, typesValue:this.props.values.typesValue, locationValue:this.props.values.locationValue})
  }
else if (key === "type") {
  this.props.valueAction({optionsKing:this.optionsKing, optionsTypes:this.optionsTypes, optionsLocations:this.optionsLocations, kingsValue:this.props.values.kingsValue, typesValue:value, locationValue:this.props.values.locationValue})
    }
else if (key === "location") {
  this.props.valueAction({optionsKing:this.optionsKing, optionsTypes:this.optionsTypes, optionsLocations:this.optionsLocations,  kingsValue:this.props.values.kingsValue, typesValue:this.props.values.typesValue, locationValue:value})
    }
}

handleResize = e => {
  const windowSize = window.innerWidth;
  const thumbWidth = (windowSize >= 480 && 100) || 75;
  this.setState(prevState => {
    return {
      windowSize,
      thumbWidth
    };
  });
};

  render() {
    let windowSize;
    if (this.state.windowSize === "") {
      windowSize = window.innerWidth
    }
    else{
      windowSize = this.state.windowSize
    }

    const view = windowSize > 768 ? "row" : "form-group"
    const input = "form-control"
    return(
    <div>
    <div className = "container heading__1">Search Your Battle</div>
    <div className = "container">
      <form>
      <div className={view}>
      <div className="col">
    <TextInput className = "search-box form-control" onRequestOptions={this.handleRequestOptions} onChange={(value) => {this.handleChange(value,"king")}} options={this.props.values.optionsKing} trigger="" value={this.props.values.kingsValue} placeholder="Enter name of King"/>
    </div>
    <div className="col">
    <TextInput className = "search-box form-control" onRequestOptions={this.handleRequestOptions} onChange={(value) => {this.handleChange(value, "type")}} options={this.props.values.optionsTypes} trigger="" value={this.props.values.typesValue} placeholder="Enter Battle Type"/>
    </div>
    <div className="col">
    <TextInput className = "search-box form-control" onRequestOptions={this.handleRequestOptions} onChange={(value) => {this.handleChange(value, "location")}} options={this.props.values.optionsLocations} trigger="" value={this.props.values.locationValue} placeholder="Enter Battle Location"/>
    </div>
  
    <div className="container text-center">
    <Link className="link" to="/home"><button className="btn btn-primary col-sm-4 button__1 text-center">Submit</button></Link>
    </div>
    </div>
    </form>
    </div>
    </div>
    )}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    valueAction:valueAction
  },dispatch)
}

function mapStateToProps(state) {
  return(
    {
      values:state.values
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)