import mongoCollection from '../mongo/MongoCollection';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'questions';

const collection = mongoCollection(COLLECTION_NAME);

export async function insert(questionId, answer) {
    const _id = { _id: new ObjectId(questionId) };
    const question = await collection.findOne(_id);

    const document = getDocument(answer);

    question.numberOfAnswers++;

    document.position = question.numberOfAnswers;
    document.creationDate = new Date();

    if (!question.answers) {
        question.answers = [];
    }

    question.answers.push(document);

    return await collection.updateOne(_id, question);
}

const getDocument = ({ answer, user }) => Object.assign({},
    { answer },
    { user }
);
