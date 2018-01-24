import React from 'react'
import ReactDOM from 'react-dom'
import {H1Title} from './module/title'

require('./css/title.css')


class List extends React.Component {
  render() {
    return (<ul className="list">
      <li onClick={this.bookConfig}>书本配置</li>
      <li onClick={this.menuConfig}>书本目录</li>
    </ul>);
  }
  
  bookConfig(e) {
  }
  
  menuConfig(e) {
  }
  
  
}

class bookConfigView extends React.Component {
  render() {
    return (<div>
      <input/>
    </div>);
  }
  
}

class Main extends React.Component {
  render() {
    return (<List/>);
  }
  
}


ReactDOM.render(
  <Main title="第一章 有理数"/>,
  document.getElementById('main')
)