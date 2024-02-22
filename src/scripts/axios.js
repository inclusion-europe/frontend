import axios from 'axios';

// import { ToastProgrammatic as Toast } from 'buefy'

// create axios instance with base Url
let baseURL = process.env.VUE_APP_BACKEND_URL;
if (baseURL && baseURL.endsWith('/')) {
    // Remove any trailing slash
    baseURL = baseURL.slice(0, -1);
}
const instance = baseURL ? axios.create({ baseURL }) : axios.create();

// interceptors for request and response
// still need to find out if toast can be fired from here

instance.interceptors.request.use(
    // Do something before request is sent
    (config) => config,
    // Do something with request error
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    (response) => response,
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    /* if (error.response.status !== 404) {
        // can update message key in store and use it in toast
        Toast.open({
            duration: 5000,
            message: `Something's not good, also I'm on <b>bottom</b>`,
            position: 'is-bottom-right',
            type: 'is-danger'
        })
        //store.commit('API_MESSAGE', error.response.data)
    }
    // Do something with response error */
    (error) => Promise.reject(error),
);

export default instance;
