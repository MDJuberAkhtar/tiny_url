'use strict';

const Responses = {
    _Success(data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: data['status'] ? data['status'] : 200,
            body: JSON.stringify(data),
        };
    },

    _Error(data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: data['status'] ? data['status'] : 404,
            body: JSON.stringify(data),
        };
    },

    _Redirect(data = {}) {
        return {
            headers: {
                "Location": data['original_url'] ? `${data['original_url']['S']}` : ''
            },
            statusCode: 301,
        };
    },
};

module.exports = Responses;