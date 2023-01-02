const dynamoConfig = require('../config/dynamoConfig');

module.exports.createTinyUrl = async (data, Responseapi, Helpers, Errorcodes, dynamoClient) => {

  const {website, email} = data
  const urlCheck = Helpers.urlValidate(website);
  if(!urlCheck) return Responseapi._Error(Errorcodes('1004'));

  const randomeUrl = Helpers.makeid(8);
  const tableName = process.env.DYNAMOTABLE;

  const newDate = new Date();
  const unixTimeToday = parseInt((newDate.getTime() / 1000).toFixed(0));

  const item = {
    "tinyurl": {
      S: `${randomeUrl}`
    }, 
    "email": {
      S: `${email}`
    },
    "original_url":{
      S: `${website}`
    },
    "updated_on":{
      N: `${unixTimeToday}`
    } 
  }

  const createdata = await dynamoConfig.createItem(tableName, item, dynamoClient);

  if(createdata === 'FAILED') return Responseapi._Error(Errorcodes('1005'));

  return{
    "tiny_url": randomeUrl
  }


};

module.exports.getTinyUrl = async (data, Responseapi, Helpers, Errorcodes, dynamoClient) => {

  // console.log('origin::', data)
  const tinyUrl = data.split('/')[1];

  if(!tinyUrl) return Responseapi._Error(Errorcodes('1001'));

  const tableName = process.env.DYNAMOTABLE;

  const partitionkey = {
    "tinyurl": {
      S: `${tinyUrl}`
    }
  }

  const userData = await dynamoConfig.getItem(tableName, partitionkey, dynamoClient);

  if(userData) {
    const newDate = new Date();
    const unixTimeToday = parseInt((newDate.getTime() / 1000).toFixed(0));

    const attributeName ={
      "#T": "updated_on"
    }
    const attributeValue = {
      ":t": {
        N: `${unixTimeToday}`
      }
    }
    const expression = "SET #T = :t"

    await dynamoConfig.updateItem(tableName, attributeName, attributeValue, partitionkey,expression, dynamoClient)
  }

  return userData

};