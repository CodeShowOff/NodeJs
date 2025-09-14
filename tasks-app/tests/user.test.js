import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/user.js';
import { userOneId, userOne, setupDatabase } from './fixtures/db.js';


beforeEach(setupDatabase);


test('should signup a new user', async () => {
    const response = await request(app).post('/users')
        .send({
            name: 'Shubham',
            age: 23,
            email: 'shubham@cso.com',
            password: 'shubham123@'
        })
        .expect(201);


    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();


    // Assertions about the response
    // expect(response.body.user.name).toBe('Shubham');
    expect(response.body).toMatchObject({
        user: {
            name: 'Shubham',
            email: 'shubham@cso.com'
        },
        token: user.tokens[0].token
    });

    // Assert that user password saved in database is not a plain text
    expect(user.password).not.toBe('shubham123@');
});


test('should login existing user', async () => {
    const response = await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);


    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
})


test('should not login nonexistent user', async () => {
    await request(app).post('/users/login')
        .send({
            email: 'noemail@email.com',
            password: 'nopass123@'
        })
        .expect(400);
})


test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})


test('should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
})


test('should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/Profile.jpg')
        .expect(200)

    
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
})


test('should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Bhagwan'
        }) 
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Bhagwan');
})


test('should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Pliladelphia'
        }) 
        .expect(400)
})