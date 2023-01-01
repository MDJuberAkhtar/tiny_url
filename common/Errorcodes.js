'use strict'

const errorWithCode = (err) => {
    let error = {};
    error['1001'] = {code: '1001', status:400, message:'INSUFFICIENT_DETAILS', description:'please provide all the required details'};
    error['1002'] = {code: '1002', status:400, message:'UNKNOWN_ERROR', description:'Something went wrong , please check again'};
    error['1003'] = {code: '1003', status:400, message:'URL_ERROR', description:'Sorry! requested url do not exits!'};
    error['1004'] = {code: '1004', status:400, message:'URL_VALIDATION_ERROR', description:'Please provide a valid url'};
    error['1005'] = {code: '1005', status:400, message:'DB_INSERTION_ERROR', description:'fail to create data'};
    
    if (err && error[err]) {
        let final_error = {};
        final_error['errorcode'] = err;
        final_error['status'] = error[err]['status'];
        final_error['message'] = error[err]['message'];
        final_error['description'] = error[err]['description'];
        return final_error;
    }
    else {
        let final_error = {};
        final_error['errorcode'] = '1000';
        final_error['reason'] = 'Unknown Error Occured';
        return final_error;

    }
};

module.exports = {
    errorWithCode:errorWithCode
}