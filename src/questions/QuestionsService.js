import mongoCollection from '../mongo/MongoCollection';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'questions';

const collection = mongoCollection(COLLECTION_NAME);

export async function list(query) {
    const searchObject = getSearchObject(query);
    return await collection.find(searchObject, { answers: 0 });
}

export async function findById(questionId) {
    return await collection.findOne({ _id: new ObjectId(questionId) });
}

export async function insert({ question, user }) {
    if (!question || !question.trim()) {
        const error = new Error('Question text must not be empty');
        error.status = 400;
        throw error;
    }

    if (!user || !user.trim()) {
        const error = new Error('User must not be empty');
        error.status = 400;
        throw error;
    }

    question = question.trim();
    user = user.trim();
    
    const newQuestion = { question, user };

    newQuestion.creationDate = new Date();
    newQuestion.numberOfAnswers = 0;
    newQuestion.likes = 0;

    return await collection.insertOne(newQuestion);
}

export async function like(questionId) {
    const _id = { _id: new ObjectId(questionId) };

    await collection.incrementOne(_id, { likes: 1 });
}

const getSearchObject = ({ search, hideAnswered }) => Object.assign({},
    search ? { question: { $regex: search.trim().replace(/[\?\.]/g, ''), $options: 'i' } } : {},
    hideAnswered === 'true' ? { numberOfAnswers: 0 } : {}
);
