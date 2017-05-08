import React, { Component } from 'react';

import FaSearch from 'react-icons/lib/fa/search'

import './style/search.css'

class Search extends Component {
  sendInputValue(e) {
    if(e.key && e.key === 'Enter' && e.target.value.trim() !== '') {
      this.props.getInputValue(e.target.value)
    }
  }
  sendInputValueClick() {
    if(this.refs.searchKey.value.trim() !== '') {
      this.props.getInputValue(this.refs.searchKey.value)
    }
  }
  render() {
    return (
      <div className="search">
        <div>
          <input type="text" placeholder="搜索绘本" onKeyPress={this.sendInputValue.bind(this)} ref="searchKey"/>
          <span onClick={this.sendInputValueClick.bind(this)}><FaSearch size={18}/></span>
        </div>
      </div>
    )
  }
}

export default Search
