// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

console.log('# FIREBASE ADMIN');
let rawdata = fs.readFileSync('firebase-adminsdk.json');
let configs = JSON.parse(rawdata);
for (var key in configs) {
  console.log('FIREBASEADMIN_' + key.toUpperCase() + '=' + JSON.stringify(configs[key]));
}
console.log('# FIREBASE CLIENT');
rawdata = fs.readFileSync('firebase-config.json');
configs = JSON.parse(rawdata);
for (var key in configs) {
  console.log('FIREBASECLIENT_' + key.toUpperCase() + '=' + JSON.stringify(configs[key]));
}
