import React, { Component } from 'react';

import Back from '../components/Back'

import FaPlay from 'react-icons/lib/fa/play'
import FaStar from 'react-icons/lib/fa/star'
import FaPause from 'react-icons/lib/fa/pause'
import FaShare from 'react-icons/lib/fa/share-square-o'

let  apiSwitch = require('../../apiSwitch')

import './style/reading.css'

let showTime

class ReadingSingle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookInfo: [],
      videoStatus: false
    }
  }
  componentWillMount() {
    console.log(this.props.match.params.book_id)
    fetch(apiSwitch() + '/api/tsgbooks/books/'+ this.props.match.params.book_id, {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json'
      },
    })
    .then(res => {
      console.log(res)
      if(res.ok) {
        res.json()
        .then(json => {
          console.log(json)
          this.setState({
            bookInfo: json
          })
          this.refs.videoPlayer.load()
        })
      }else {
        res.json()
        .then(json => {
          console.log("gg")
        })
      }
    })
    .catch(function(error) {
      console.log('error', error)
    })
  }
  videoTime() {
    showTime = setInterval(() => console.log(this.refs.videoPlayer.currentTime), 1000)
  }
  playVideo() {
    if(this.refs.videoPlayer.paused) {
      this.refs.videoPlayer.play()
      console.log(this.refs.videoPlayer.currentTime)
      // setInterval(() => console.log(this.refs.videoPlayer.currentTime), 1000)
      this.videoTime()
      this.setState({
        videoStatus: true
      })
    }else {
      this.refs.videoPlayer.pause()
      window.clearInterval(showTime)
      this.setState({
        videoStatus: false
      })
    }
  }
  render() {
    return (
      <div className="reading">
        <Back/>
        <div className="cover">
          <img src={this.state.bookInfo.cover} alt="cover"/>
          <p>{this.state.bookInfo.title}</p>
        </div>
        <div className="tags">
          <ul>
            <li>3-6</li>
            <li>妈妈</li>
          </ul>
        </div>
        <p className="desc">{this.state.bookInfo.content}</p>
        <div>
          <audio controls="controls" id="video-player" ref="videoPlayer">
            <source src={this.state.bookInfo.audio} type="audio/mp3" />
          </audio>
        </div>
        <div className="reading-nav">
          <div>
            <div><FaShare size={28}/></div>
          </div>
          <div className="active" data-value="5:00" onClick={this.playVideo.bind(this)}>
            <div>
              {
                this.state.videoStatus
                ?
                <FaPause size={28}/>
                :
                <FaPlay size={28}/>
              }
            </div>
          </div>
          <div className="unstar">
            <div><FaStar size={28}/></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReadingSingle;
