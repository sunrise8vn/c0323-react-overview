import axios from 'axios';

class StudentService {
  static getStudents() {
    return axios.get('https://js-post-api.herokuapp.com/api/students');
  }

  static getStudent(id) {
    return axios.get(`https://js-post-api.herokuapp.com/api/students/${id}`);
  }

  static searchByCity(cityName) {
    return axios.get(
      `https://js-post-api.herokuapp.com/api/students?city=${cityName}`
    );
  }
}

export default StudentService;
