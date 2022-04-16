const { assert } = require("chai");
const chai = require("chai");
let chaiHttp = require("chai-http");
const { type } = require("express/lib/response");
let server = require("../server.js");
let should = chai.should();

chai.use(chaiHttp);

describe("NFT-DEX", () => {

    describe('/POST /nft/:id/buy', () => {
        it('it should buy an NFT', (done) => {
            let user = {
                name: "Dido",
                email: "template@at.com",
                password: "pass"
            }
            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    assert(res.status === 201);
                    res.should.to.be.json;
                    assert(res.body['text'] === `User ${user['name']} registered`);
                    done();
                });
        });

        it('it should return 401 status code for missing credentials', (done) => {
            let user = {}
            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    assert(res.status === 401);
                    done();
                });
        });

    });




});