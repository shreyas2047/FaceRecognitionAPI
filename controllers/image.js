const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd299f4e716774f3c846c3f17a1d368d1'
   });

const handleApiCall = (req, res)=> {
    const {input} = req.body;
   app.models 
   .predict(Clarifai.FACE_DETECT_MODEL, input)
   .then(data => {
        res.json(data);
   })
   .catch(err => {
        console.log(err);
        res.status(400).json('Unable to work with API');
    });
}

const handleImage = (req, res, db)=> {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
         res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}