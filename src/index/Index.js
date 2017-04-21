import React, { Component } from 'react';

// import { BrowserRouter as Router, Route,  Link } from 'react-router-dom'
import { HashRouter as Router, Route,  Link } from 'react-router-dom'

import Passbook from '../pages/passbook/Passbook'
import Login from '../pages/login/Login'
import Library from '../pages/library/Library'
import History from '../pages/history/History'
// import Reading from '../pages/reading/Reading'
import ReadingSingle from '../pages/reading/ReadingSingle'
import LibraryClassification from '../pages/library/LibraryClassification'
import LibrarySearchResults from '../pages/library/LibrarySearchResults'
import Classification from '../pages/library/Classification'

// import GoBook from 'react-icons/lib/go/book'
import FaUser from 'react-icons/lib/fa/user'
import FaBook from 'react-icons/lib/fa/book'
import FaList from 'react-icons/lib/fa/list-alt'

// import './index.scss'
import './style/index.css'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      judge: [{library: false}, {passbook: false}, {login: false}]
    }
  }
  contentHight() {// 计算屏幕高度，减去底部菜单，得出活动区域
    console.log('当前页面高度：' + window.innerHeight)
  }
  judge_menu_state() {// 判断底部菜单栏选中效果
    let hash = window.location.hash
    if(hash.match('library')) {
      this.setState({
        judge: [{library: true}, {passbook: false}, {login: false}]
      })
    }else if(hash.match('passbook')) {
      this.setState({
        judge: [{library: false}, {passbook: true}, {login: false}]
      })
    }else if(hash.match('login')) {
      this.setState({
        judge: [{library: false}, {passbook: false}, {login: true}]
      })
    }
  }
  componentDidMount() {
    this.contentHight()
    this.judge_menu_state()
    this.setState({
      height: window.innerHeight - 55
    })
  }
  componentWillReceiveProps() {
    this.judge_menu_state()
  }
  render() {
    return (
      <Router basename="/index">
        <div className="index-content" ref="indexContent"
          style={{'height': this.state.height + 'px'}}>
          <Menu menu={this.state.judge}/>

          <Route path="/library" component={Library}/>
          <Route path="/classification" component={Classification}/>
          <Route path="/libraryclass/:id" component={LibraryClassification}/>
          <Route path="/librarysearchresults/:key" component={LibrarySearchResults}/>
          <Route exact path="/passbook" component={Passbook}/>
          <Route path="/login" component={Login}/>
          <Route path="/history" component={History}/>
          <Route path="/readingsingle/:book_id" component={ReadingSingle}/>
        </div>
      </Router>
    )
  }
}

class Menu extends Component {
  // constructor() {
  //
  // }
  render() {
    let judge_library = this.props.menu[0].library ? 'active' : 'none'
    let judge_passbook = this.props.menu[1].passbook ? 'active' : 'none'
    let judge_login = this.props.menu[2].login ? 'active' : 'none'
    return (
      <div className="menu">
        <div data-value="童书馆" className={judge_library}>
          <Link to="/library"><FaBook size={28}/></Link>
        </div>
        <div data-value="阅读存折" className={judge_passbook}>
          <Link to="/passbook"><FaList size={28}/></Link>
        </div>
        <div data-value="我" className={judge_login}>
          <Link to="/login"><FaUser size={28}/></Link>
        </div>
      </div>
    )
  }
}

export default Index;
