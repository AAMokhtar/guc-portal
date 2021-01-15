import axios from 'axios';

//get Courses
export const addStaff = (payload) => {
  const URL = 'http://localhost:4000/hr/addStaff';
  return axios(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // whatever you want
    },
    data: payload
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

// get staff
export const getStaff = () => {
  const URL = 'http://localhost:4000/staff/getStaff/'
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

// get staff
export const getStaffAttendance = (staffID) => {
    const URL = 'http://localhost:4000/hr/viewattendance/' + staffID
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

//update staff member
export const updateStaff = payload => {
  const URL = 'http://localhost:4000/hr/updatestaff/'
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

//update staff member's salary
export const updateSalary = (staffID, salary) => {
    const URL = 'http://localhost:4000/hr/updateSalary/' + staffID + '/' + salary;
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

//add missing attendace
export const addSignInOut = (id, payload)=> {
    const URL = 'http://localhost:4000/hr/addmissingattendance/' + id;
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


export const viewAttendance = (id) => {
    const URL = 'http://localhost:4000/hr/viewattendance/' + id;
    return axios(URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json', // whatever you want
      },
    })
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
};


//delete staff member
export const deleteStaff = id => {
    const URL = 'http://localhost:4000/hr/deletestaff/' + id;
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
