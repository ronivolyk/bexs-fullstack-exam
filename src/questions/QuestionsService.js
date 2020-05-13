import mongoCollection from '../mongo/MongoCollection';

const COLLECTION_NAME = 'questions';

const collection = mongoCollection(COLLECTION_NAME);

export async function listAll() {
    return await collection.find({});
}

export async function insert(question) {
    const document = getDocument(question);

    document.creationDate = new Date();
    document.numberOfAnswers = 0;

    return await collection.insertOne(document);
}

const getDocument = ({ question, user }) => Object.assign({},
    { question },
    { user }
);
