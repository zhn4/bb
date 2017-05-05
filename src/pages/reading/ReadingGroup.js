import React, { Component } from 'react';

import Back from '../components/Back'

import FaPlay from 'react-icons/lib/fa/play'
import FaStar from 'react-icons/lib/fa/star'
import FaPause from 'react-icons/lib/fa/pause'
import FaShare from 'react-icons/lib/fa/share-square-o'

import ReactSwipe from 'react-swipes'

let  apiSwitch = require('../../apiSwitch')

import './style/reading.css'

let showTime

class ReadingGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioStatus: false,
      audioCurrentTime: '00:00',
      curCard: 0
    }
  }
  componentWillMount() {
    fetch(apiSwitch() + '/api/tsgbooks/books_by_service_consume/'+
    this.props.match.params.service_consume_id + '/', {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
      },
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(json => {
          this.setState({// 借书的数据
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
  handleFavourite() {
    if(this.state.bookInfo[this.state.curCard].is_favor) {
      // console.log('取消')
      fetch(apiSwitch() + '/api/tsgbooks/user_favor_books/' + this.state.bookInfo[this.state.curCard].id + '/', {
        mode: 'cors',
        method: 'DELETE',
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
        }
      })
      .then(res => {
        if(res.ok) {
          let bookInfoModifyData = this.state.bookInfo
          bookInfoModifyData[this.state.curCard].is_favor = false
          this.setState({
            bookInfo: bookInfoModifyData
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
    }else {
      // console.log('收藏')
      fetch(apiSwitch() + '/api/tsgbooks/user_favor_books/', {
        mode: 'cors',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
        },
        body: JSON.stringify({
          book: this.state.bookInfo[this.state.curCard].id
        })
      })
      .then(res => {
        if(res.ok) {
          let bookInfoModifyData = this.state.bookInfo
          bookInfoModifyData[this.state.curCard].is_favor = true
          this.setState({
            bookInfo: bookInfoModifyData
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
  }
  render() {
    let opt = {
      distance: 200, // 每次移动的距离，卡片的真实宽度
      swTouchend: (ev) => {
        let data = {
          moved: ev.moved,
          originalPoint: ev.originalPoint,
          newPoint: ev.newPoint,
          cancelled: ev.cancelled
        }
        // console.log(data);
        this.setState({
            curCard: ev.newPoint
        })
        // console.log('选中 >' + this.state.curCard)
      }
    }
    return (
      <div className="reading reading-group">
        <Back/>

        {
          this.state.bookInfo
          ?
          <div>
            <section className="demo" id="demo-distance">
              <div className="viewport">
                <div className="flipsnap">
                  <ReactSwipe className="card-slide" options={opt}>
                    {this.state.bookInfo.map((book, i) => (
                      <div className="item" key={i}>
                        <img src={book.cover} alt="cover"/>
                        <p>{book.title}</p>
                      </div>
                    ))}
                  </ReactSwipe>
                </div>
              </div>
            </section>

            <div className="tags">
              <ul>
                {this.state.bookInfo[this.state.curCard].tag.map((tag, i) => (
                  <li key={i}>{tag.name}</li>
                ))}
              </ul>
            </div>

            <p className="desc">{this.state.bookInfo[this.state.curCard].content}</p>

            <div>
              <audio controls="controls" id="video-player" ref="videoPlayer" onEnded={this.audioEnd.bind(this)}>
                <source src={this.state.bookInfo[this.state.curCard].audio} type="audio/mp3" />
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
              <div className={this.state.bookInfo[this.state.curCard].is_favor ? 'star' : 'unstar'}
                onClick={this.handleFavourite.bind(this)}
              >
                <div><FaStar size={28}/></div>
              </div>
            </div>
          </div>
          :
          ''
        }
      </div>
    );
  }
}

export default ReadingGroup;
