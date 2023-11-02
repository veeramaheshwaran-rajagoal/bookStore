const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../bin/install');
chai.use(chaiHttp);
const expect = chai.expect;
describe('User', () => {
    it('Login', (done) => {
        chai
            .request(app)
            .post('/login')
            .send({ email: 'user1@yopmail.com', password: '12345' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done()
            });
    });
});
