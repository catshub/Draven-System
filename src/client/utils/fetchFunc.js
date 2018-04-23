export const fetchJSON = (url = '', init = {}) => fetch(url, init).then(res => res.json());
export const fetchText = (url = '', init = {}) => fetch(url, init).then(res => res.text());
