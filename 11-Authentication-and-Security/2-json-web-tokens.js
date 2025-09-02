import jwt from 'jsonwebtoken';

// create the token:
const token = jwt.sign({ _id: 'abc123' }, 'tasks-app-user@CodeShowOff', { expiresIn: '5 seconds'});
console.log(token);

// Output: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE3NTY3NDY5ODF9.rFLOQscXh-Z0MqPD_4Vk19HA9M1yYUnv72P7FOPcgR4

/*
contains of 3 parts:
first: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9  ->  base 64 encoded json string known as header, contains meta infos about what type of token it is i.e. jwt. On decoding: {"alg":"HS256","typ":"JWT"}
second: eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE3NTY3NDY5ODF9  ->  base 64 encoded json string known as payload or body, contains data we provided i.e. _id. On decoding: {"_id":"abc123","iat":1756746981}
thirt: rFLOQscXh-Z0MqPD_4Vk19HA9M1yYUnv72P7FOPcgR4  ->  its a signature which is used to verify the token

and these are publicly viewable to anyone who has the token.
*/


// verify the token:
const data = jwt.verify(token, 'tasks-app-user@CodeShowOff');
console.log(data);


// to verify after 5 seconds:
// setTimeout(() => {
// const data = jwt.verify(token, 'tasks-app-user@CodeShowOff');
// console.log(data);
// }, 6000);