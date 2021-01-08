import axios from 'axios';

//login
export const onLogin = payload => {
  const URL = 'http://localhost:4000/general/login';
  return axios(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // whatever you want
    },
    data: payload,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

//TODO: logout
// export const onLogout = payload => {
//   const URL = 'http://localhost:4000/staff/logout';
//   return axios(URL, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json', // whatever you want
//     },
//   })
//     .then(response => response.data)
//     .catch(error => {
//       throw error;
//     });
// };