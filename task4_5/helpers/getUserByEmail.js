import fs from 'fs';

const usersJSONpath = './task4_5/models/users.json';

export default function getUserByEmail(email, onSuccess, onError, notFoundCallback) {
  let usersData = '';
  let currentUser;

  if(email) {
    fs.createReadStream(usersJSONpath)
      .on('data', (chunk) => {
        usersData += Buffer.from(chunk).toString();
      })
      .on('end', () => {
        currentUser = JSON.parse(usersData).data.find(user => user.email === email);

        if(currentUser) {
          return onSuccess(currentUser);
        } else {
          return notFoundCallback();
        }
      });
  } else {
    return onError();
  }
}