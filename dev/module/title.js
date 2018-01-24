import React from 'react'
import ReactDOM from 'react-dom'

class H1Title extends React.Component {
  render() {
    return <h1 className="h1-title">{this.props.title}</h1>;
  }
}
class H2Title extends React.Component {
  render() {
    return <h2 className="h2-title">{this.props.title}</h2>;
  }
}
class H3Title extends React.Component {
  render() {
    return <h3 className="h3-title">{this.props.title}</h3>;
  }
}
class H4Title extends React.Component {
  render() {
    return <h4 className="h4-title">{this.props.title}</h4>;
  }
}
class H5Title extends React.Component {
  render() {
    return <h5 className="h5-title">{this.props.title}</h5>;
  }
}

export {H1Title,H2Title,H3Title,H4Title,H5Title}