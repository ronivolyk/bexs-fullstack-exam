import express from 'express';
import * as service from './AnswersService';

const CONTROLLER_NAME = '/questions/:questionId/answers';

let router = express.Router();

router.route(CONTROLLER_NAME)
    .post(async (req, res, next) => {
        try {
            req.result = await service.insert(req.params.questionId, req.body);
        } catch (err) {
            req.error = err;
        }

        next();
    })

router.route(`${CONTROLLER_NAME}/:position/like`)
    .post(async (req, res, next) => {
        try {
            req.result = await service.like(req.params.questionId, req.params.position);
        } catch (err) {
            req.error = err;
        }

        next();
    })

export default router;