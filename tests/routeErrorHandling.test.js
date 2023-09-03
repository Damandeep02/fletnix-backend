const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Error Route Handling Tests', () => {
  it('should return a 404 status for an invalid route', (done) => {
    chai
      .request(app)
      .get('/nonexistent-route')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should handle errors gracefully for a specific route', (done) => {
    chai
      .request(app)
      .get('/shows/s1')
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });

});
