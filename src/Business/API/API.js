import axios from 'axios';
import { API_BASE_URL } from '@env';

class API {
  static baseURL = API_BASE_URL;
  static token = null;

  static setToken(token) {
    this.token = token;
  }

  static getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  static async get(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    
    const response = await axios.get(url.toString(), {
        headers: this.getHeaders(),
    });
    return response.data;
  }

  static async post(endpoint, data) {
    const response = await axios.post(`${this.baseURL}${endpoint}`, data, {
        headers: this.getHeaders(),
    });
    return response.data;

  }

  static async put(endpoint, data) {
    const response = await axios.put(`${this.baseURL}${endpoint}`, data, {
        headers: this.getHeaders(),
    });
    return response.data;

  }

  static async delete(endpoint) {

    const response = await axios.delete(`${this.baseURL}${endpoint}`, {
        headers: this.getHeaders(),
    });
    return response.data;
  }
}


export default API;
