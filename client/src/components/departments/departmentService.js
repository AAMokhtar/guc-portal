import axios from 'axios';

//get Departments
export const getDepartments = () => {
  const URL = 'http://localhost:4000/staff/getDepartments';
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

// add Department
export const addDepartment = (faculty, name) => {
  const URL = 'http://localhost:4000/hr/addDepartment/' + faculty + '/' + name;
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

//update Department
export const updateDepartment = (faculty, departmentName, payload) => {
  const URL = 'http://localhost:4000/hr/updateDepartment/' + faculty + '/' +departmentName;
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

//remove Department from faculty
export const removeDepartment = (name, faculty) => {
    const URL = 'http://localhost:4000/hr/removedepartment/' + faculty + '/' +  name;
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

//delete Department
export const deleteDepartment = Department => {
    const URL = 'http://localhost:4000/hr/deleteDepartment/' + Department;
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