import React, { Component } from 'react';

import FaSearch from 'react-icons/lib/fa/search'

import './search.css'

class Search extends Component {
  sendInputValue(e) {
    if(e.key && e.key === 'Enter' && e.target.value !== '') {
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

export default Search
