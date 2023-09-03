const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const User = require('../models/User'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication API Tests', () => {
  const validUser = {
    email: 'daman@yz.com',
    password: 'daman12345',
    age: 23
  };

  before(async () => {
    
    await User.create(validUser);
  });

  after(async () => {
    await User.deleteOne({ email: validUser.email });
  });

  it('should register a new user', (done) => {
    const validUser = {
        email: 'damand@xyz.com',
        password: 'daman12345',
        age: 23
      };
    chai
      .request(app)
      .post('/auth/register')
      .send(validUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('email', validUser.email);
        done();
      });
  });

  it('should login an existing user with valid credentials', (done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send({ email: validUser.email, password: validUser.password })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should not login with invalid credentials', (done) => {
    const validUser = {
        email: 'daman@yyyz.com',
        password: 'daman12345',
      };
    chai
      .request(app)
      .post('/auth/login')
      .send({ email: validUser.email, password: 'wrongpassword' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

 
});
