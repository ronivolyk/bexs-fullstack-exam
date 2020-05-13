import mongoCollection from '../mongo/MongoCollection';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'questions';

const collection = mongoCollection(COLLECTION_NAME);

export async function listAll() {
    return await collection.find({}, { answers: 0 });
}

export async function findById(questionId) {
    return await collection.findOne({ _id: new ObjectId(questionId) });
}

export async function insert(question) {
    const document = getDocument(question);

    document.creationDate = new Date();
    document.numberOfAnswers = 0;
    document.likes = 0;

    return await collection.insertOne(document);
}

export async function like(questionId) {
    const _id = { _id: new ObjectId(questionId) };

    await collection.incrementOne(_id, { likes: 1 });
}

const getDocument = ({ question, user }) => Object.assign({},
    { question },
    { user }
);
