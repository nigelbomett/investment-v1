import request from 'supertest';
import { app, server } from '../../backend/server';

let token: string;

beforeAll((done) => {
    request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' })
        .end((err, res) => {
            if (err) return done(err);
            token = res.body.token;
            done();
        });
});

describe('Investment Routes', () => {
    

    afterAll(async () => {
        server.close();
    })

    it('should fetch investments', (done) => {
        request(app)
            .get('/investments')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.body).toBeInstanceOf(Array);
                done();
            });
    });

    it('should add a new investment', async () => {
        const newInvestment = {name: 'Test Investment', amount: 1000};
        const response = await request(app)
            .post('/investments')
            .send(newInvestment)
            .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('name',newInvestment.name);
            expect(response.body).toHaveProperty('amount',newInvestment.amount);
    });
});