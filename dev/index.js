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
    return (<div>
      <div className="title">数字教材编辑器V1.0</div>
      <ul className="list">
        <li onClick={this.bookConfig}>书本配置</li>
        <li onClick={this.menuConfig}>书本目录</li>
      </ul>
    </div>);
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
      <div className="title-bar"></div>
      <div className="content">
        <div className="book-setting">
          <div className="setting-table">
            <div>
              <div>书本名称</div>
              <div><input type="text"/></div>
            </div>
            <div>
              <div>isbn</div>
              <div><input type="text"/></div>
            </div>
            <div>
              <div>作者</div>
              <div><input type="text"/></div>
            </div>
            <div>
              <div>出版社</div>
              <div><input type="text"/></div>
            </div>
          </div>
          <button>提交</button>
        </div>
      </div>
    </div>);
  }
}

class MenuConfigView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (<div>
      <div className="title-bar"></div>
      <div className="content"></div>
    </div>);
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
    return <div className="editor">
      <List update={this.update}/>
      {this.view}
    </div>
  }
  
}


ReactDOM.render(
  <Main/>,
  document.getElementById('main')
)