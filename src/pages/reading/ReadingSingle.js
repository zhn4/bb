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
      audioStatus: false,
      audioCurrentTime: '00:00',
      tags: []
    }
  }
  componentWillMount() {
    // console.log(this.props.match.params.book_id)
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
            bookInfo: json,
            tags: json.tag
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
  changeTime(times) {
    // let time = parseInt(this.refs.videoPlayer.duration, 10)
    let time = parseInt(times, 10)
    //分钟
    let minute = time / 60
    let minutes = parseInt(minute, 10)
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    //秒
    let second = time % 60
    let seconds = parseInt(second, 10)
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    let allTime = '' +
    minutes +
    '' +
    ':' +
    '' +
    seconds +
    ''
    // console.log(allTime)
    return allTime
  }
  videoTime() {
    showTime = setInterval( () => {
      this.setState({
        audioCurrentTime: this.changeTime(this.refs.videoPlayer.currentTime)
      })
    }, 1000)
  }
  playVideo() {
    if(this.refs.videoPlayer.paused) {
      this.refs.videoPlayer.play()
      this.videoTime()
      this.setState({
        audioStatus: true
      })
    }else {
      this.refs.videoPlayer.pause()
      window.clearInterval(showTime)
      this.setState({
        audioStatus: false
      })
    }
  }
  audioEnd() {
    console.log('end')
    window.clearInterval(showTime)
    this.setState({
      audioStatus: false,
      audioCurrentTime: '00:00'
    })
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
          {this.state.tags.map((data, i) => (
            <li key={i}>{data.name}</li>
          ))}
          </ul>
        </div>
        <p className="desc">{this.state.bookInfo.content}</p>
        <div>
          <audio controls="controls" id="video-player" ref="videoPlayer" onEnded={this.audioEnd.bind(this)}>
            <source src={this.state.bookInfo.audio} type="audio/mp3" />
          </audio>
        </div>
        <div className="reading-nav">
          <div>
            <div><FaShare size={28}/></div>
          </div>
          <div className="active" data-value={this.state.audioCurrentTime} onClick={this.playVideo.bind(this)}>
            <div>
              {
                this.state.audioStatus
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
