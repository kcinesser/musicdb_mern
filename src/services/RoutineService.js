import axios from 'axios';

export default class RoutineService {
  url = process.env.REACT_APP_API_URL + 'routines';

  getRoutines = (user_id) => {
    return axios.get(this.url, { params: { user_id: user_id } } )
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }

  getRoutine = (id) => {
    return axios.get(this.url + '/' + id)
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }

  saveRoutine = (routine) => {
    return axios.post(this.url + '/add', routine)
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }

  addSong = (data) => {
    return axios.put(this.url + '/' + data.routine_id + '/song', data)
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }

  updateOrder = (id, data) => {
    return axios.put(this.url + '/' + id + '/order', data)
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }

  updateTimestamp = (id, time, user) => {
    let recordDuration = {
      duration: time,
      userID: user
    }

    return axios.put(this.url + '/' + id + '/timestamp', recordDuration)
      .then(res => { return res.data })
      .catch(err => { console.log(err) })
  }
}
