
import request from 'supertest';
import {app,server} from '../../backend/server';

describe('Auth Routes', () => {
    afterAll(async () => {
        server.close();
    })

    //Register a new user
    /* it('should register a new user', (done) => {
        request(app)
            .post('/auth/register')
            .send({username: 'testuser',password:'testpassword'})
            .expect(201)
            .end((err,res) => {
                if(err) return done(err);
                expect(res.body.message).toEqual('User registered successfully');
                done();
            });
    }); */

    //Login user
    it('should login a user', (done) => {
        request(app)
            .post('/auth/login')
            .send({username:'testuser',password:'testpassword'})
            .expect(200)
            .end((err,res) => {
                if(err) return done(err);
                expect(res.body).toHaveProperty('token');
                done();
            });
    });
});