import React from 'react'
import ReactDOM from 'react-dom'
import {Tree, Button, Radio, Icon, Modal,Input} from 'antd';
import 'antd/dist/antd.css'

const TreeNode = Tree.TreeNode;

require('./css/style.css')

let CHAPTER = [{
  name: '第1章',
  sections: [{
    name: '第1节',
    courses: [{
      name: '第1课'
    }]
  }]
},
  {
    name: '第2章',
    sections: [{
      name: '第1节',
      courses: [{
        name: '第1课'
      }, {
        name: '第2课'
      }]
    }, {
      name: '第2节',
      courses: [{
        name: '第1课'
      }]
    }, {
      name: '第3节',
      courses: [{
        name: '第1课'
      }]
    }, {
      name: '第4节',
      courses: [{
        name: '第1课'
      }]
    }, {
      name: '第5节',
      courses: [{
        name: '第1课'
      }]
    }, {
      name: '第6节',
      courses: [{
        name: '第1课'
      }]
    }, {
      name: '第7节'
    }, {
      name: '第8节',
      courses: [{
        name: '第1课'
      }]
    }, {
      name: '第9节',
      courses: [{
        name: '第1课'
      }]
    }]
  }]


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

class MenuEdit extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this)
    this.add = this.add.bind(this)
    this.modalOK = this.modalOK.bind(this)
    this.modalCancel = this.modalCancel.bind(this)
    this.modalDom = null
    this.addView = null
    
    let chapterArr = []
    for (let i = 0; i < CHAPTER.length; i++) {
      chapterArr.push({
        title: CHAPTER[i].name,
        key: i,
        children: []
      })
      let section = CHAPTER[i].sections
      if (section) {
        for (let j = 0; j < section.length; j++) {
          chapterArr[i].children.push({
            title: section[j].name,
            key: i + '-' + j,
            children: []
          })
          let course = section[j].courses
          if (course) {
            for (let k = 0; k < course.length; k++) {
              chapterArr[i].children[j].children.push({
                title: course[k].name,
                key: i + '-' + j + '-' + k
              })
            }
          }
        }
      }
    }
    this.state = {
      selNode: "",
      chapterData: chapterArr,
      showModal: false
    }
    // this.list = chapterArr
  }
  
  onSelect(selectKeys, e) {
    this.setState({selNode: selectKeys.length ? selectKeys[0] : ""})
    console.log(selectKeys)
    console.log(e)
  }
  
  modalOK() {
  
  }
  
  modalCancel() {
    this.setState({showModal: false})
  }
  
  add() {
    if (this.addType === null) {
      console.log('不可操作')
      return;
    }
    switch (this.addType) {
      case 0:
        console.log("新增章")
        this.modalDom = <Input placeholder="章名称" />
        break
      case 1:
        console.log("新增节")
        this.modalDom = <Input placeholder="节名称" />
        break
      case 2:
        console.log("新增课")
        this.modalDom = <Input placeholder="课名称" />
        break
      default:
        break
    }
    this.setState({showModal: true})
  }
  
  renderTreeNodes(data) {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item}/>;
    });
  }
  
  render() {
    let typeArr = this.state.selNode.split('-')
    let str = ""
    let addType = 0
    if (typeArr.length === 1 && this.state.selNode === "") {
      str = "新增章"
      addType = 0
    }
    else if (typeArr.length === 1 && this.state.selNode !== "") {
      str = "在此节点下新增节"
      addType = 1
    }
    else if (typeArr.length === 2) {
      str = "在此节点下新增课"
      addType = 2
    }
    else {
      addType = null
      str = "不可操作"
    }
    this.addType = addType
    return ([
        <div key={"tree"}>
          <h2>教材目录</h2>
          <Tree onSelect={this.onSelect} checkStrictly={true} loadData={this.onLoadData}
                showLine>
            {this.renderTreeNodes(this.state.chapterData)}
          </Tree>
        </div>,
        <div key={"button"}>
          <Button
            rel={addType}
            type={this.state.selNode.length < 5 ? "primary" : "dashed"} onClick={this.add}>{str}
          </Button>
          <Button type={"dashed"}>删除</Button>
        </div>,
        <Modal
          title="提示"
          visible={this.state.showModal}
          onOk={this.modalOK}
          onCancel={this.modalCancel}
          key={"modal"}
        >
          {this.modalDom}
        </Modal>
      ]
    )
      ;
  }
}

class MenuConfigView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (<div>
      <div className="title-bar"></div>
      <div className="menu-content">
        <MenuEdit></MenuEdit>
      </div>
    </div>);
  }
}


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this)
    this.view = < BookConfigView key="B"/>
    this.state = {option: "bookConfig"}
  }
  
  update(state) {
    if (state === "bookConfig") {
      this.view = <BookConfigView key="B"/>
      this.setState({option: state})
    }
    else {
      this.view = <MenuConfigView key="B"/>
      this.setState({option: state})
    }
  }
  
  render() {
    return [<List key="A" update={this.update}/>, this.view]
  }
  
}


ReactDOM.render(
  <Main/>,
  document.getElementById('main')
)