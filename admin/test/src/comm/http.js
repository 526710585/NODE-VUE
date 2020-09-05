import axios from "axios";
import Vue from 'vue'
import loginUrl from '../comm/config'

// axios.defaults.timeout = 50000;
// axios.defaults.withCredentials = true;


//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + localStorage.token||'' 
    return config;
  },
  error => {

    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    //拦截错误相应
    Vue.prototype.$message({
      message: error.response.data.msg,
      type: 'error'
    })
    return Promise.reject(error);
  }
);

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {

  return new Promise((resolve, reject) => {
    axios({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: url,
      data: data
    }).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      data
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err);
    })
  })
}

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url,
      data
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err);
    })
  })
}

export function deleteFun(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url,
      data
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err);
    })
  })
}

export function upload(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'post',
      url,
      data
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err);
    })
  })
}