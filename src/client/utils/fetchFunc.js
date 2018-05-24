import axios from 'axios';

export const fetchJSON = (url = '', init = {}) => fetch(url, init).then(res => res.json());
export const fetchText = (url = '', init = {}) => fetch(url, init).then(res => res.text());
// export const fetchJSON = (init = {}) => axios(init).then(res => res.data);
// export const fetchText = (init = {}) => axios(init).then(res => JSON.stringify(res.data));
