// for this we'll use a npm package 'yargs'

// so first install yargs. 


import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

console.log('Raw args:', process.argv);
console.log('Parsed args:', argv);

/*
C:\Users\shukr\Desktop\Node JS\Codes\2-FileSystem>node 3-arguments-parsing.js add --title="my nam is ggg"

Raw args: [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\shukr\\Desktop\\Node JS\\Codes\\2-FileSystem\\3-arguments-parsing.js',
  'add',
  '--title=my nam is ggg'
]
  
Parsed args: {
  _: [ 'add' ],
  title: 'my nam is ggg',
  '$0': '3-arguments-parsing.js'
}
*/