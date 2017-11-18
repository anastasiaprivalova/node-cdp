import fs from 'fs';
import { errorMessages } from './../config';

const usersJSONpath = './task4_5/models/users.json';

export default function getUserByEmail(email) {
  let usersData = '';
  let currentUser;

  return new Promise((resolve, reject) => {
    if(email) {
      fs.createReadStream(usersJSONpath)
        .on('data', (chunk) => {
          usersData += Buffer.from(chunk).toString();
        })
        .on('end', () => {
          currentUser = JSON.parse(usersData).data.find(user => user.email === email);

          if(currentUser) {
            resolve(currentUser);
          } else {
            reject(errorMessages.NOT_FOUND);
          }
        });
    } else {
      reject(errorMessages.WRONG_INPUT);
    }
  });
}