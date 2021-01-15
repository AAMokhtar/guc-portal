import axios from 'axios';

//get Courses
export const getCourses = () => {
  const URL = 'http://localhost:4000/staff/getCourses';
  return axios(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json', // whatever you want
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

// add Course
export const addCourse = (departmentName, code) => {
  const URL = 'http://localhost:4000/hr/addCourse/' + departmentName + '/' + code;
  return axios(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // whatever you want
    }
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

//update Course
export const updateCourse = (departmentName, code, payload) => {
  const URL = 'http://localhost:4000/hr/updateCourse/' + departmentName + '/' +code;
  return axios(URL, {
    method: 'PUT',
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

//remove Course from department
export const removeCourse = (departmentName, code) => {
    const URL = 'http://localhost:4000/hr/removeCourse/' + departmentName + '/' +  code;
    return axios(URL, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json', // whatever you want
      },
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

//delete Course
export const deleteCourse = code => {
    const URL = 'http://localhost:4000/hr/deleteCourse/' + code;
    return axios(URL, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json', // whatever you want
      },
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };