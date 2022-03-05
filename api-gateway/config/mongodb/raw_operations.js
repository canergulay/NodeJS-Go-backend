const mongoose = require('mongoose')

 function checkIfCollectionExistsAndInsert(advert,collectionName,displayName){

   mongoose.connection.db.listCollections({name:collectionName}).next(function(err,collection){
        try{
            if(!collection){
                console.log(collectionName)
                mongoose.connection.db.createCollection(collectionName)
                mongoose.connection.db.collection(collectionName).insertOne({displayName:displayName})
            }
            console.log(collectionName)
        }catch(e){
            console.log(e)
        }     
        insertAdvert(advert,collectionName)
    })
}


 function insertAdvert(advert,collection){
     return mongoose.connection.db.collection(collection).insertOne(advert) 
}


module.exports = {checkIfCollectionExistsAndInsert}