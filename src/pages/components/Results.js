import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import FaCheck from 'react-icons/lib/fa/check'

import './style/results.css'

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
  handleScroll(e) {// 监听组件的滚动事件，回调父组件的加载更多事件
    let clientHeight = this.refs.scrollview.clientHeight
    let scrollTop = this.refs.scrollview.scrollTop
    let scrollHeight = this.refs.scrollview.scrollHeight
    if(scrollHeight === (clientHeight + scrollTop)) {
      this.props.loadMoreData(e.target.value)
    }
  }
  render() {
    return (
      <div className="results"
        style={{'height': this.props.height + 'px'}}
        onScroll={this.handleScroll.bind(this)}
        ref="scrollview"
      >
      {
        this.props.data.length > 0
        ?
        ''
        :
        <div className="tips">暂无相关绘本数据</div>
      }
      {this.props.data.map((data, i) => (
        <div key={i}>
          <Link to={"/readingsingle/" + data.book_id}>
            {data.is_read ? <div className="check"><FaCheck/></div> : ''}
            <img src={data.icon} alt="cover" />
            <p>{data.title}</p>
          </Link>
        </div>
      ))}
      </div>
    )
  }
}

export default Results;
