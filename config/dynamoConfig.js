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
    async updateItem(table, attributeName, attributeValue, partitionkey,expression, dynamoClient) {
        try {
            const params = {
                ExpressionAttributeNames: attributeName, 
                ExpressionAttributeValues: attributeValue,
                Key: partitionkey, 
                ReturnValues: "ALL_NEW", 
                TableName: table, 
                UpdateExpression: expression
            };
    
            const data = await dynamoClient.updateItem(params).promise();

            return data
            
        } catch (error) {
            console.log('fail to update table data::', error);
            return 'FAILED';
            
        }
        
    },

};

module.exports = Dynamo;