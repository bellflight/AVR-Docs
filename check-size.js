import getFolderSize from 'get-folder-size';
import assert from 'assert';

var size = await getFolderSize.loose('public/');
console.log(`The folder is ${(size / 1000 / 1000).toFixed(2)} MB`);
assert(size < 1000000000);