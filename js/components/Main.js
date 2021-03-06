import React from "react";
import API from '../API';
import LinkStore from '../stores/LinkStore';

let _getAppState = () => {
  return { links: LinkStore.getAll() };
}
export default class Main extends React.Component {
  static propTypes = {
    limit: React.PropTypes.number
  }

  static defaultProps = {
    limit: 4
  }

  state = _getAppState();

  constructor(props) {
    super(props);


    console.log('this.state', this.state);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    API.fetchLinks();
    LinkStore.on("change", this.onChange);
  }

  componentWillUnmount() {
    LinkStore.on("change", this.onChange);
  }

  onChange() {
    console.log('4. In the View');
    this.setState(_getAppState());
  }
   render() {
     console.log('this.state', this.state);
    let content = this.state.links.slice(0, this.props.limit).map(link => {
      return <li key={link._id}>
        <a href={link.url}>{link.title}</a>
      </li>;
    })
    return (
      <div>
        <h3>Links</h3>
        <ul>
          {content}
        </ul>
      </div>
    )
  }
}
