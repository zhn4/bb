import React, { Component } from 'react';

import LeftArrow from 'react-icons/lib/fa/chevron-left'

import './back.css'

class Library extends Component {
  back() {
    console.log('back')
    // console.log(this.props)
    // console.log()
    history.back()
  }
  render() {
    return (
      <div className="back">
        <div onClick={this.back.bind(this)}><LeftArrow/></div>
      </div>
    );
  }
}

export default Library;
