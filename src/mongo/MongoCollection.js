let collection = collectionName => global.connection.collection(collectionName);

let mongoCollection = (collectionName) => {
    return {
        find: async (document, projection, sort) => await collection(collectionName).find(document, { projection }).sort(sort).toArray(),
        findFirst: async (document, projection, sort) => await collection(collectionName).find(document, { projection }).sort(sort).limit(1).toArray(),
        findOne: async (document, projection) => await collection(collectionName).findOne(document, { projection }),
        insertOne: async (document) => await collection(collectionName).insertOne(document),
        updateOne: async (id, document) => await collection(collectionName).updateOne(id, { $set: document }),
        deleteOne: async (id) => await collection(collectionName).deleteOne(id),
        count: async (document) => await collection(collectionName).aggregate([{ $match: document }, { $count: "size" }]).toArray()
    }
};

export default mongoCollection;
