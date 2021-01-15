import axios from 'axios';

//get Faculties
export const getFaculties = () => {
  const URL = 'http://localhost:4000/staff/getFaculties';
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

// add Faculty
export const addFaculty = name => {
  const URL = 'http://localhost:4000/hr/addFaculty/' + name;
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

//update Faculty
export const updateFaculty = (facultyName, payload) => {
  const URL = 'http://localhost:4000/hr/updateFaculty/' + facultyName;
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

//delete Faculty
export const deleteFaculty = faculty => {
    const URL = 'http://localhost:4000/hr/deleteFaculty/' + faculty;
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