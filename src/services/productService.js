import axios from 'axios';

class ProductService {
  static getAlls() {
    return axios.get('http://localhost:4000/products');
  }

  static getById(id) {
    return axios.get(`http://localhost:4000/products/${id}`);
  }

  static create(obj) {
    return axios.post('http://localhost:4000/products', obj);
  }

  static update(id, obj) {
    return axios.patch(`http://localhost:4000/products/${id}`, obj);
  }
}

export default ProductService;
