import React, { Component } from 'react';

import Back from '../components/Back'

import FaPlay from 'react-icons/lib/fa/play'
import FaStar from 'react-icons/lib/fa/star'
import FaPause from 'react-icons/lib/fa/pause'
import FaShare from 'react-icons/lib/fa/share-square-o'

// let apiSwitch = require('../../apiSwitch')

import ReactSwipe from 'react-swipes'

let  apiSwitch = require('../../apiSwitch')

import './style/reading.css'

let testData = [
  {
    "id": 3,
    "title": "我永远爱你",
    "cover": "http://bbmonkey-test.oss-cn-shenzhen.aliyuncs.com/temp/books/cover_02.png",
    "content": '我永远爱你测试数据',
    "audio": null,
    "sort": {
      "id": 1,
      "name": "2-3岁"
    },
    "tag": [
      {
        "id": 1,
        "name": "妈妈",
        "citations": 1
      },
      {
        "id": 3,
        "name": "家庭",
        "citations": 2
      }
    ]
  },
  {
    "id": 4,
    "title": "我妈妈",
    "cover": "http://bbmonkey-test.oss-cn-shenzhen.aliyuncs.com/temp/books/cover_03.png",
    "content": '我妈妈测试数据',
    "audio": null,
    "sort": {
      "id": 1,
      "name": "2-3岁"
    },
    "tag": [
      {
        "id": 3,
        "name": "家庭",
        "citations": 2
      },
      {
        "id": 2,
        "name": "爸爸",
        "citations": 1
      }
    ]
  },
  {
    "id": 4,
    "title": "我妈sdf妈",
    "cover": "http://bbmonkey-test.oss-cn-shenzhen.aliyuncs.com/temp/books/cover_03.png",
    "content": '我妈妈fffff测试数据',
    "audio": null,
    "sort": {
      "id": 1,
      "name": "2-3岁"
    },
    "tag": [
      {
        "id": 3,
        "name": "家庭",
        "citations": 2
      },
      {
        "id": 2,
        "name": "爸爸",
        "citations": 1
      }
    ]
  }
]

let showTime

class ReadingGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookInfo: [],
      audioStatus: false,
      audioCurrentTime: '00:00',
      // tags: [],
      curCard: 0
    }
  }
  componentWillMount() {
    this.setState({
      bookInfo: testData
    })

  }
  componentDidMount() {
    console.log(this.props.match.params.service_consume_id)
    fetch(apiSwitch() + '/api/tsgbooks/books_by_service_consume/'+
    this.props.match.params.service_consume_id + '/', {
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
          // this.setState({
          //   bookInfo: json,
          //   tags: json.tag
          // })
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
  componentWillUpdate() {
    console.log('切换了')
  }
  componentWillReceiveProps() {
    // this.setState({
    //   audioCurrentTime: '123'
    // })
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
        console.log(data);
        this.setState({
            curCard: ev.newPoint
        })
        console.log('选中 >' + this.state.curCard)
      }
    }
    return (
      <div className="reading reading-group">
        <Back/>

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
          <div className="unstar">
            <div><FaStar size={28}/></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReadingGroup;
