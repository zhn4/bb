import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import Search from '../components/Search'
import Back from '../components/Back'

import './library.css'

class Classification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: ''
    }
  }
  componentDidMount() {
    this.setState({
      height: window.innerHeight - 55
    })
  }
  getInputValue(value) {
    console.log('搜索功能，进入结果页面')
    this.props.history.push('/librarysearchresults/' + value);
  }
  render() {
    return (
      <div className="classification"
        style={{'height': this.state.height + 'px'}}
      >
        <Back/>
        <Search getInputValue={this.getInputValue.bind(this)}/>
        <Link to="/libraryclass/1"></Link>
        <Link to="/libraryclass/2"></Link>
        <Link to="/libraryclass/3"></Link>
      </div>
    )
  }
}

export default Classification;
