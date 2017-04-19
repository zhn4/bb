import React, { Component } from 'react';
// import { HashRouter as Router, Route,  Link } from 'react-router-dom'

// let historyData = []// 测试数据
// for(let i = 0; i < 50; i++) {
//   historyData.push({
//     cover: 'http://blog.roodo.com/book100/3aecf7cc.jpg',
//     name: '倚天屠龙记'
//   })
// }
// console.log(historyData)
import './results.css'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0
    }
  }
  componentDidMount() {
    this.setState({
      height: window.innerHeight - 55 -58
    })
  }
  handleScroll(e) {
    let clientHeight = this.refs.scrollview.clientHeight
    let scrollTop = this.refs.scrollview.scrollTop
    let scrollHeight = this.refs.scrollview.scrollHeight
    if(scrollHeight === (clientHeight + scrollTop)) {
      console.log('回调父组件加载请求')
      this.props.loadMoreData(e.target.value)
    }
  }
  render() {
    return (
      <div className="results"
        style={{'height': this.state.height + 'px'}}
        onScroll={this.handleScroll.bind(this)}
        ref="scrollview"
      >
        {this.props.data.map((data, i) => (
          <div key={i}>
            <img src={data.icon} alt="cover" />
            <p>{data.title}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Results;
