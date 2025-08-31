import bcypt from 'bcryptjs';


const password = 'Red12345!';
const hashedPassword = await bcypt.hash(password, 8);

console.log(password);    
console.log(hashedPassword);


const isMatch = await bcypt.compare('Red12345!', hashedPassword);
console.log(isMatch);
