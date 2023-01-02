'use strict';
const AWS = require('aws-sdk');
const {errorWithCode} = require('./common/Errorcodes');
const Helpers = require('./common/Helpers');
const Responseapi = require('./common/ResponsesApi');
const {createTinyUrl, getTinyUrl} = require('./utilities/tinyurlUtilities');

const dynamoClient = new AWS.DynamoDB();

module.exports.handler = async (event) => {

  try {
    let response = {};
    const requestContext  = Helpers.convertStringToJson(event.requestContext);
    if(!requestContext) return Responseapi._Error(errorWithCode('1002'));

    const path  = requestContext.http.path;
    const method  = requestContext.http.method;
    const data = Helpers.convertStringToJson(event.body);

    if(method === 'POST') {

      if(!data.website || !data.website.length || !data.email) return Responseapi._Error(errorWithCode('1001'));
      response = await createTinyUrl(data, Responseapi, Helpers, errorWithCode, dynamoClient);

    }

    if(method === 'GET') {

      const userdata = await getTinyUrl(path, Responseapi, Helpers, errorWithCode, dynamoClient);

      if(!userdata) {
        response = Responseapi._Error(errorWithCode('1003'));
      }else {
        console.log('user data::', userdata)
        return Responseapi._Redirect(userdata);
      }

    }

    return response;
    
  } catch (error) {
    console.log('error::', error)
    return error
  }

};
