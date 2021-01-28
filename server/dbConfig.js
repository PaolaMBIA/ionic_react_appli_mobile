const mongoose = require('mongoose');

//connexion à la base de données mongodb
mongoose.connect(
    "mongodb://localhost:27017/weTestProject",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log('Mongodb connected');
        else console.log('Connection error :' + err);
    }
)