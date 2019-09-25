/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/addUser': jsonHandler.addUser,
    '/getUsers': jsonHandler.getUsers,
    '/notReal': jsonHandler.notReal,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    '/notReal': jsonHandler.notRealMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

// const handlePost = (request, response, parsedUrl) => {
//   if (parsedUrl.pathname === '/addUser') {
//     const res = response;
//     const body = [];

//     request.on('error', (err) => {
//       console.dir(err);
//       res.statusCode = 400;
//       res.end();
//     });

//     request.on('data', (chunk) => {
//       body.push(chunk);
//     });

//     request.on('end', () => {
//       const bodyString = Buffer.concat(body).toString();
//       const bodyParams = query.parse(bodyString);
//       jsonHandler.addUser(request, res, bodyParams);
//     });
//   }
// };

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  // console.dir(parsedUrl);
  console.dir(`url if ${urlStruct[request.method][parsedUrl.pathname]}`);

  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
