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
        db.collection('cities').aggregate(
          { $sample: { size: 1 } },
          (err, cities) => {
            if (err) {
              console.log(err);
            } else {
              res.json(cities[0]);
            }
            db.close();
          }
        );
      }
    });
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  });
})();