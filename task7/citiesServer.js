import express from 'express';
import MongoClient from 'mongodb';

(() => {
  const app = express();
  const port = process.env.PORT || 8080;
  const url = 'mongodb://localhost:27017/node-cdp';

  app.get('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
      if(err) {
        console.log(err);
      } else {
        console.log('Connected correctly to server');
        db.collection('cities').find({}).toArray((err, cities) => {
          if (err) {
            console.log(err);
          } else {
            const randomIndex = Math.round(Math.random() * (cities.length - 1));
            res.json(cities[randomIndex]);
          }
          db.close();
        });
      }
    });
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  });
})();