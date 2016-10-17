import {get, post} from 'jquery';
import ServerActions from './actions/ServerActions';

let API = {
  fetchLinks() {
    console.log('1. in API');
    // get('/data/links').done(response => {
    //   ServerActions.receiveLinks(response);
    //   // console.log('response: ', response);
    // })
    post('/graphql', {
      query: `{
  links {
    title
    url
  }
}
`
    }).done(resp => {
      ServerActions.receiveLinks(resp.data.links);
      console.log('resp', resp);
    })
  }
};

export default API;
