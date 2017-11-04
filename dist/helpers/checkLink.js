import React, {Component} from 'react';

export default class Img extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brokenLink: false
    };

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.src && nextProps.src !== this.props.src) {
      this.setState({
        brokenLink: false
      });
    }
  }

  broken() {
    this.setState({
      brokenLink: true
    });
  }

  render() {
    const {src=false, alt} = this.props;
    const style={
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    };

    return (

      <div style={style}>
        { !this.state.brokenLink && src && <img src={src} onError={this.broken.bind(this)}/> || alt}
      </div>

    )
  }
}
