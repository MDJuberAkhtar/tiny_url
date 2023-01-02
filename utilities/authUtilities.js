const dynamoConfig = require('../config/dynamoConfig');

module.exports.createSignup = async (data, Responseapi, Helpers, Errorcodes, dynamoClient) => {

    const {password, email} = data;

    const tableName = process.env.DYNAMOTABLE;

    const partitionkey = {
        "email": {
        S: `${email}`
        }
    }

    const userData = await dynamoConfig.getItem(tableName, partitionkey, dynamoClient);

    if(userData) return Responseapi._Error(Errorcodes('1006'));




};