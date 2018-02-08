import React from 'react'
import ReactDOM from 'react-dom'
import {Tree, Button, Radio, Icon, Modal} from 'antd';
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

class AddMenu extends React.Component {
  constructor(props) {
    super(props)
  }
  
  
  render() {
    return <div>
      <input type="text" rel={this.props.type}/>
      <button>确定</button>
      <button onClick={this.props.cancel}>取消</button>
    </div>
  }
}

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
    console.log(this.props)
    this.newChapter = this.newChapter.bind(this)
    this.cancelAddView = this.cancelAddView.bind(this)
    this.onCheck = this.onCheck.bind(this)
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
      checkedKeys: [],
      chapterData: chapterArr
    }
    // this.list = chapterArr
  }
  
  newChapter(e) {
    if (this.state.addState) {
      return
    }
    this.setState({})
    this.addView = <AddMenu type={'chapter'} cancel={this.cancelAddView}/>
  }
  
  newSection(e) {
    if (this.state.addState) {
      return
    }
    this.setState({})
    this.addView = <AddMenu type={'section'} cancel={this.cancelAddView}/>
  }
  
  newCourse(e) {
    if (this.state.addState) {
      return
    }
    this.setState({})
    this.addView = <AddMenu type={'course'} cancel={this.cancelAddView}/>
  }
  
  cancelAddView() {
    this.addView = null
  }
  
  onCheck(checkedKeys) {
    this.setState({checkedKeys: checkedKeys.checked})
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
    return ([
        <Tree onCheck={this.onCheck} checkStrictly={true} key={"tree"} loadData={this.onLoadData} checkable={true}
              showLine>
          {this.renderTreeNodes(this.state.chapterData)}
        </Tree>,
        <div key={"button"}>
          <Button
            type={this.state.checkedKeys.length === 1 && this.state.checkedKeys[0].length < 5 ? "primary" : "dashed"}>新增</Button>
          <Button type={"dashed"}>删除</Button>
        </div>,<Modal key={"addvie8w"} title="Title"
                              visible={false}
                              onOk={this.ok}
                              confirmLoading={confirmLoading}
                              onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>,
      ]
    );
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
        <MenuEdit chapter={0} section={0} course={0}></MenuEdit>
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