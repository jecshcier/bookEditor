import React from 'react'
import ReactDOM from 'react-dom'

require('./css/style.css')

class List extends React.Component {
  constructor(props) {
    super(props);
    this.bookConfig = this.bookConfig.bind(this);
    this.menuConfig = this.menuConfig.bind(this);
    this.props = props
  }
  
  render() {
    return (<ul className="list">
      <li onClick={this.bookConfig}>书本配置</li>
      <li onClick={this.menuConfig}>书本目录</li>
    </ul>);
  }
  
  bookConfig(e) {
    this.props.update("bookConfig")
  }
  
  menuConfig(e) {
    this.props.update("menuConfig")
  }
}

class BookConfigView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (<div>
      <label>书本名称</label>
      <input type="text"/>
      <label>作者</label>
      <input type="text"/>
      <label>出版社</label>
      <input type="text"/>
      <label>isbn</label>
      <input type="text"/>
    </div>);
  }
}

class MenuConfigView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (<div></div>);
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this)
    this.view = <BookConfigView/>
    this.state = {option: "bookConfig"}
  }
  
  update(state) {
    if (state === "bookConfig") {
      this.view = <BookConfigView/>
      this.setState({option: state})
    }
    else {
      this.view = <MenuConfigView/>
      this.setState({option: state})
    }
  }
  
  render() {
    console.log(this.view)
    return <div>
      <List update={this.update}/>
      {this.view}
    </div>
  }
  
}


ReactDOM.render(
  <Main/>,
  document.getElementById('main')
)