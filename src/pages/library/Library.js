import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import './library.css'

import FaSearch from 'react-icons/lib/fa/search'

class Library extends Component {
  getInputValue(value) {
    // if(e.key && e.key === 'Enter' && e.target.value !== '') {
    //   // this.props.getInputValue(e.target.value)
    //   console.log('搜索功能，发送ajax')
    //   console.log(e.target.value)
    // }
    console.log('搜索功能，发送ajax')
    console.log(value)
  }
  render() {
    return (
      <div className="library">
        <p>童书馆</p>
        <Search getInputValue={this.getInputValue.bind(this)}/>
        <Link to="/library/1">2-3</Link>
        <Link to="/library/2">3-4</Link>
        <Link to="/library/3">4-5</Link>
      </div>
    );
  }
}

class Search extends Component {
  sendInputValue(e) {
    if(e.key && e.key === 'Enter' && e.target.value !== '') {
      // this.props.getInputValue(e.target.value)
      // console.log(e.target.value)
      this.props.getInputValue(e.target.value)
    }
  }
  render() {
    return (
      <div className="search">
        <div>
          <input type="text" placeholder="搜索绘本" onKeyPress={this.sendInputValue.bind(this)} />
          <span><FaSearch size={18}/></span>
        </div>
      </div>
    )
  }
}

export default Library;
