import axios from "axios";

// axios.defaults.timeout = 50000;
// axios.defaults.withCredentials = true;


//http request 拦截器
axios.interceptors.request.use(
  config => {
    // config.headers = {
    //   "Content-Type": 'application/x-www-form-urlencoded'
    //   // "Content-Type": 'application/json'
    //   // "Content-Type": "multipart/form-data"
    // };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: "/",
        querry: {
          redirect: router.currentRoute.fullPath
        } //从哪个页面跳转
      });
    }
    //储存token
    if (response.config.url.indexOf('/match/') != '-1' && response.headers.msdktoken) {
      localStorage.setItem('msdktoken', response.headers.msdktoken);
    }
    return response;
  },
  error => {
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