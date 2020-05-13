import mongoCollection from '../mongo/MongoCollection';
import { ObjectId } from 'mongodb';
import * as questionsService from '../questions/QuestionsService';

const COLLECTION_NAME = 'questions';

const collection = mongoCollection(COLLECTION_NAME);

export async function insert(questionId, answer) {
    const question = await questionsService.findById(questionId);

    const document = getDocument(answer);

    question.numberOfAnswers++;

    document.position = question.numberOfAnswers;
    document.creationDate = new Date();
    document.likes = 0;

    if (!question.answers) {
        question.answers = [];
    }

    question.answers.push(document);

    const _id = { _id: new ObjectId(questionId) };

    return await collection.updateOne(_id, question);
}

export async function like(questionId, answerPosition) {
    const queryObject = {
        _id: new ObjectId(questionId),
        'answers.position': parseInt(answerPosition)
    }

    const updateObject = {
        'answers.$.likes': 1
    }

    await collection.incrementOne(queryObject, updateObject);
}

const getDocument = ({ answer, user }) => Object.assign({},
    { answer },
    { user }
);
