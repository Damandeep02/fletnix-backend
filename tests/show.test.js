const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const Show = require('../models/Show'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Show API Tests', () => {


  it('should fetch all shows with pagination', (done) => {
    chai
      .request(app)
      .get('/shows')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('shows').to.be.an('array');
        expect(res.body).to.have.property('totalPages').to.be.a('number');
  
        
        const { shows, totalPages } = res.body;
  
        
        expect(shows).to.not.be.empty;
        shows.forEach((show) => {
          expect(show).to.have.property('title').to.be.a('string');
        });
  
        
        expect(totalPages).to.be.gte(0);
  
        done();
      });
  });
  

  it('should fetch details of a show by ID', (done) => {
    chai
      .request(app)
      .get(`/shows/64f0d8af7f61e1be128a552b`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
  
        
        const show = res.body;
  
        
        expect(show).to.have.property('_id').to.be.a('string');
        expect(show).to.have.property('title').to.be.a('string');
        expect(show).to.have.property('director').to.be.a('string');
  
        done();
      });
  });
  
});
