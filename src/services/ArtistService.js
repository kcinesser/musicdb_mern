import axios from 'axios';

export default class ArtistService {
  url = process.env.REACT_APP_API_URL + 'artists'

  getArtists = (user_id) => {
    return axios.get(this.url, { params: { user_id: user_id } } )
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }

  getArtist = (id) => {
    return axios.get(this.url + '/' + id)
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }

  saveArtist = (artist) => {
    return axios.post(this.url + '/add', artist)
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }

  deleteArtist = (artist) => {
    return axios.delete(this.url + '/' + artist._id)
      .then(res => { console.log(res) })
      .catch(err => { console.log(err) })
  }

  editArtist = (artist) => {
    return axios.put(this.url + '/' + artist.id + '/update', artist)
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }
}