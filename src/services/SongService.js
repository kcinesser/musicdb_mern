import axios from 'axios';

export default class SongService {
  url = process.env.REACT_APP_API_URL + 'songs'

  getSong = (id) => {
    return axios.get(this.url + '/' + id )
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }

  getSongs = (user_id) => {
    return axios.get(this.url, { params: { user_id: user_id } } )
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }

  saveSong = (song) => {
    return axios.post(this.url + '/add', song)
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }  
}