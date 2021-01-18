import axios from 'axios';

//get Courses
export const addStaff = (payload) => {
  const URL = '/hr/addStaff';
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
  const URL = '/staff/getStaff/'
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
    const URL = '/hr/viewattendance/' + staffID
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
  const URL = '/hr/updatestaff/'
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
    const URL = '/hr/updateSalary/' + staffID + '/' + salary;
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
    const URL = '/hr/addmissingattendance/' + id;
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
    const URL = '/hr/viewattendance/' + id;
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

export const viewMissing = () => {
  const URL = '/hr/viewmissingusers';
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
    const URL = '/hr/deletestaff/' + id;
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
