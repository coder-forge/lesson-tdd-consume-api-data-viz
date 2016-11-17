"use strict";

const Promise = require('bluebird');

class Consumer{

    constructor(){

    }

    /**
     * Get data from resource.
     * @return {Promise} Resolves to ArrayObject.
     */
    getData(){
        return new Promise((resolve, reject)=>{

            //resolve data
            return resolve({
                test: 'object',
            });
        });
    }
}

module.exports = Consumer;
