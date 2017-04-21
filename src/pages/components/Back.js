import React, { Component } from 'react';

import LeftArrow from 'react-icons/lib/fa/angle-left'

import './style/back.css'

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
        <div onClick={this.back.bind(this)}>
          <LeftArrow size={24}/>
        </div>
        <div className="title">{this.props.title}</div>
      </div>
    );
  }
}

export default Library;
