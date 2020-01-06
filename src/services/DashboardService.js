import axios from 'axios';

export default class DashboardService {
  url = process.env.REACT_APP_API_URL + 'users';

  getDashboard = (id) => {
    axios.get(this.url + '/' + id + '/dashboard')
      .then(dashboard => { return dashboard.data })
      .catch(err => {console.log(err)})
  }
}