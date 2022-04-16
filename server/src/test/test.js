const { assert } = require("chai");
const chai = require("chai");
let chaiHttp = require("chai-http");
const { type } = require("express/lib/response");
let server = require("../server.js");
let should = chai.should();

chai.use(chaiHttp);

describe("NFT-DEX", () => {

    describe('/POST register', () => {
        it('it should register a user', (done) => {
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

    describe('/POST login', () => {
        it('it should log in a user', (done) => {
            let user = {
                email: "template@at.com",
                password: "pass"
            }
          chai.request(server)
              .post('/login')
              .send(user)
              .end((err, res) => {
                    assert(res.status === 200);
                    res.should.to.be.json;
                    assert(res.body['text'] === `Logged in ${user['email']}`);
                done();
              });
        });

        it('it should return status code 401 if invalid credentials are provided', (done) => {
            let user = {
            }
          chai.request(server)
              .post('/login')
              .send(user)
              .end((err, res) => {
                    assert(res.status === 401);
                done();
              });
           
        });

    });


    describe('/GET nfts', () => {
        it('it should get all nfts', (done) => {
            chai.request(server)
            .get('/nfts')
            .end((err, res) => {
                  assert(res.status === 200);
                  res.should.to.be.json;
                  res.body.should.have.property('nfts');
              done();
            });      
        });

    });



    describe('/GET home', () => {
        it('it should get all nfts', (done) => {
            chai.request(server)
            .get('/home')
            .end((err, res) => {
                  assert(res.status === 200);
                  res.should.to.be.json;
                  res.body.should.have.property('nfts');
              done();
            });      
        });

    });





});


