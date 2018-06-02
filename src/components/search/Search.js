import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField'; 
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults'
class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiURL: 'https://pixabay.com/api',
    apiKey: '9170101-80d82a6f0f5ac233ac87378a6',
    images: []
  }

  onTextChange = (e) => {
    //this.setState({ [e.target.name]: e.target.value });
    const val = e.target.value;
    this.setState({ searchText: val });
    axios.get(this.state.apiURL + '/?key=' + this.state.apiKey + '&q=' + this.state.searchText + '&image_type=photo&per_page=' + this.state.amount + '&safesearch=true')
      .then(response => this.setState({ images: response.data.hits }))
      .catch(err => console.log(err));
  }

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  }

  render() { 
    console.log(this.state.images);
    return ( 
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
          >
            
            <MenuItem value={5} primaryText="5" />
            <MenuItem value={10} primaryText="10" />
            <MenuItem value={15} primaryText="15" />
            <MenuItem value={30} primaryText="30" />
            <MenuItem value={50} primaryText="50" />
          </SelectField>
          <br />
          {this.state.images.length > 0 ? (<ImageResults images={this.state.images} / >) : null }
      </div>
     )
  }
}
 
export default Search;