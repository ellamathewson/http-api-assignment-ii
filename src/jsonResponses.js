/* eslint-disable linebreak-style */
const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const getUsers = (request, response) => {
  const responseObjectJSON = {
    users,
  };

  respondJSON(request, response, 200, responseObjectJSON);
};

module.exports = {
  getUsers,
};
