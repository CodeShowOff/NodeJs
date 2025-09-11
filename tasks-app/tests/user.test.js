import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/user.js';


beforeEach(async () => {
    await User.deleteMany();
})


test('should sign-up a new user', async () => {
    await request(app).post('/users')
                    .send({
                        name: 'Shubham',
                        age: 23,
                        email: 'shubham@mail.com',
                        password: 'shubham123@'
                    })
                    .expect(201);

    
});