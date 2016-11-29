"use strict";

const request = require('request'),
    Promise = require('bluebird');

/**
 * Consumer Class.
 */
class Consumer{

    /**
     * Make a get request to resource.
     * @param {Object} opts Request modules options object.
     * @return {Promise} Resolves to Request.response object.
     */
    get(opts){

        // definite headers needed by API
        (opts.headers) ?
            opts.headers['User-Agent'] = 'coder-forge test' :
            opts.headers = {
                'User-Agent': 'coder-forge test',
            };
        opts.method = 'GET';
        opts.json = true;

        return new Promise((resolve, reject)=>{

            request(opts, (err, res, body)=>{
                if(err) return reject(err);
                if(res.statusCode!=200) return reject({
                    statusCode: res.statusCode,
                    body: body,
                });

                return resolve(res);
            });
        });
    }

}

module.exports = Consumer;
