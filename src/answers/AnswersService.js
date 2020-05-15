import mongoCollection from '../mongo/MongoCollection';
import { ObjectId } from 'mongodb';
import * as questionsService from '../questions/QuestionsService';

const COLLECTION_NAME = 'questions';

const collection = mongoCollection(COLLECTION_NAME);

export async function insert(questionId, { answer, user }) {
    if (!answer || !answer.trim()) {
        const error = new Error('Answer text must not be empty')
        error.status = 400
        throw error
    }

    if (!user || !user.trim()) {
        const error = new Error('User must not be empty')
        error.status = 400
        throw error
    }
    
    const question = await questionsService.findById(questionId);
    
    answer = answer.trim();
    user = user.trim();

    const newAnswer = { answer, user };

    question.numberOfAnswers++;

    newAnswer.position = question.numberOfAnswers;
    newAnswer.creationDate = new Date();
    newAnswer.likes = 0;

    if (!question.answers) {
        question.answers = [];
    }

    question.answers.push(newAnswer);

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
