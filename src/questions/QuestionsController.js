import express from 'express';
import * as service from './QuestionsService';

const CONTROLLER_NAME = '/questions';

let router = express.Router();

router.route(CONTROLLER_NAME)
    .get(async (req, res, next) => {
        try {
            req.result = await service.listAll();
            next();
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            req.result = await service.insert(req.body);
            next();
        } catch (err) {
            next(err);
        }
    })

router.route(`${CONTROLLER_NAME}/:questionId`)
    .get(async (req, res, next) => {
        try {
            req.result = await service.findById(req.params.questionId);
            next();
        } catch (err) {
            next(err);
        }
    })

export default router;