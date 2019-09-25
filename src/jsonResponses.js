/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const users = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseObjectJSON = {
    users,
  };
  console.dir(responseObjectJSON);
  respondJSON(request, response, 200, responseObjectJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const addUser = (request, response, body) => {
  const responseObjectJSON = {
    message: 'Name and age are both required',
  };

  if (!body.name || !body.age) {
    responseObjectJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseObjectJSON);
  }

  let responseCode = 201;
  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseObjectJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseObjectJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

const notReal = (request, response) => {
  const responseObjectJSON = {
    message: 'Error: 404 not found',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseObjectJSON);
};

const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};


module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notReal,
  notRealMeta,
  notFound,
  notFoundMeta,
};
