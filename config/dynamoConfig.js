'use strict';

const Dynamo = {
    async getItem(table, partitionkey, dynamoClient) {
        try {
            const params = {
                Key: partitionkey, 
                TableName: table
            };
    
            const data = await dynamoClient.getItem(params).promise();

            if(!data) return null;

            return data.Item;
            
        } catch (error) {
            console.log('fail to get table data::', error);
            return 'FAILED';
            
        }
        
    },
    async createItem(table, item, dynamoClient) {
        try {
            const params = {
                Item: item, 
                TableName: table
            };
    
            await dynamoClient.putItem(params).promise();

            return true
            
        } catch (error) {
            console.log('fail to create table data::', error);
            return 'FAILED';
            
        }
        
    },

};

module.exports = Dynamo;