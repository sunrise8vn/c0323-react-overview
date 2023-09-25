import axios from 'axios';

class LocationRegionService {
  static getAllProvinces() {
    return axios.get('https://vapi.vnappmob.com/api/province/');
  }

  static getById(id) {
    return axios.get(`https://vapi.vnappmob.com/api/province/${id}`);
  }
}

export default LocationRegionService;
