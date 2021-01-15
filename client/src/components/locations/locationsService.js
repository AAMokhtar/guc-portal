import axios from 'axios';

//get locations
export const getLocations = () => {
  const URL = 'http://localhost:4000/staff/getlocations';
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

// add location
export const addLocation = payload => {
  const URL = 'http://localhost:4000/hr/addlocation';
  return axios(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // whatever you want
    },
    data: payload
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

//update location
export const updateLocation = (locationName, payload) => {
  const URL = 'http://localhost:4000/hr/updatelocation/' + locationName;
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

//delete location
export const deleteLocation = location => {
    const URL = 'http://localhost:4000/hr/deletelocation/' + location;
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