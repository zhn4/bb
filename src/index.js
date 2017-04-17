import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';
// import {  BrowserRouter as Router,  Route } from 'react-router-dom'
import {  HashRouter as Router,  Route } from 'react-router-dom'

import App from './App';
import './index.css';

// import Login from './pages/login/Login'
// import Regin from './pages/regin/Regin'
import Calendar from './pages/calendar/Calendar'
// import Reading from './pages/reading/Reading'

import Index from './index/Index'

// let judge_url = ''

// console.log(process.env.NODE_ENV)// 查看当前环境
// if(process.env.NODE_ENV === 'development') {
//   console.log('开发环境，使用开发api')
//   judge_url = '//192.168.1.84:8000'
// }else {
//   console.log('生产环境，使用线上api')
//   judge_url = '//bbm.com/api'
// }

// import Passbook from './pages/passbook/Passbook'
// import Login from './pages/login/Login'
// import Library from './pages/library/Library'

// ReactDOM.render(
//   <Router history={hashHistory }>
//     <Route path="/" component={App}/>
//     <Route path="/login" component={Login}/>
//     <Route path="/regin" component={Regin}/>
//     <Route path="/calendar" component={Calendar}/>
//     <Route path="/reading" component={Reading}/>
//     <Route path="/index" component={Index}/>
//   </Router>,
//   document.getElementById('root')
// );
// ReactDOM.render(
//   <Router>
//     <div>
//       <Route exact path="/" component={App}/>
//       <Route path="/login" component={Login}/>
//       <Route path="/regin" component={Regin}/>
//       <Route path="/calendar" component={Calendar}/>
//       <Route path="/reading" component={Reading}/>
//       <Route path="/index" component={Index}>
//       </Route>
//     </div>
//   </Router>,
//   document.getElementById('root')
// );
ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/calendar" component={Calendar}/>
      <Route path="/index" component={Index}/>
    </div>
  </Router>,
  document.getElementById('root')
);
