"use strict";

const Consumer, ConsumerClass;

describe('Consumer Class', ()=>{

    beforeEach(()=>{

        const config = {
            client_id: 'foobar',
            client_secret: 'bizbaz',
            app_name: 'test',
        }

        Consumer = new ConsumerClass(config);
    })

    it('will authenticate', ()=>{

        return Consumer.authenticate(config)
            .then((token)=>{

                // test token
            })
            .catch((err)=>{
                throw err;
            });
    });

    it('will validate token', ()=>{

        return Consumer.isValid(config)
            .then((valid)=>{

                // test is valid
            })
            .catch((err)=>{
                throw err;
            });
    });
});
