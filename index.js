var admin = require("firebase-admin");

var serviceAccount = require('./projectx-2ba7b-firebase-adminsdk-n0cfq-840ebea739.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:  "https://projectx-2ba7b.firebaseio.com"
});

const firebaseConfig = {
  
    apiKey: "AIzaSyCk8FTmdLPXVNGKOV5uQ7LQHaY3bXckT2A",
    authDomain: "projectx-2ba7b.firebaseapp.com",
    projectId: "projectx-2ba7b",
    storageBucket: "projectx-2ba7b.appspot.com",
    messagingSenderId: "46462732251",
    appId: "1:46462732251:web:719ce0da459935791f09fe"

  };
  
  app.get('/adverts', (req, res) => {
    
    const limit = req.query['limit'];
    const page = req.query['page'];
    const cityId = req.query['cityId'];
    const regionId = req.query['regionId'];
    const priceFrom = req.query['priceFrom'];
    const priceTo = req.query['priceTo'];
    const onlyWithImages = req.query['withImages'];
    const categoryIndex = req.query['categoryIndex'];
    
    var result = [];
    
    admin.firestore().collection('adverts').get().then((e) => {
        for (let i = page * limit; i < e.docs.length; i++) {
            var item = e.docs[i].data();
            if (onlyWithImages == '1' && item['images'].length == 0) {
                console.log(onlyWithImages, item['images'].length);
                continue;
            }

            if (priceFrom &&  item['price'] < priceFrom) {
                console.log(priceFrom, item['price']);
                continue;
            }

            if (priceTo && item['price'] > priceTo) {
                console.log(priceTo, item['price']);
                continue;
            }

            if (regionId && item['region']['key'] != regionId) {
                console.log(regionId, item['region']['key']);
                continue;
            }

            if (cityId && item['city']['id'] != cityId) {
                console.log(cityId, item['city']['id']);
                continue;
            }

            if (categoryIndex && item['categoryIndex'] != categoryIndex) {
                console.log('Category index mismatch');
                continue;
            }

            result.push(item);

            if (result.length == limit) {
                break;
            }
        }

        res.json(result);
    });
})
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
