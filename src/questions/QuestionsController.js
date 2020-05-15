import express from 'express';
import * as service from './QuestionsService';

const CONTROLLER_NAME = '/questions';

let router = express.Router();

router.route(CONTROLLER_NAME)
    .get(async (req, res, next) => {
        try {
            req.result = await service.list(req.query);
        } catch (err) {
            req.error = err;
        }

        next();
    })
    .post(async (req, res, next) => {
        try {
            req.result = await service.insert(req.body);
        } catch (err) {
            req.error = err;
        }

        next();
    })

router.route(`${CONTROLLER_NAME}/:questionId`)
    .get(async (req, res, next) => {
        try {
            req.result = await service.findById(req.params.questionId);
        } catch (err) {
            req.error = err;
        }

        next();
    })

router.route(`${CONTROLLER_NAME}/:questionId/like`)
    .post(async (req, res, next) => {
        try {
            req.result = await service.like(req.params.questionId);
        } catch (err) {
            req.error = err;
        }

        next();
    })

export default router;