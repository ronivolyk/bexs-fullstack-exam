import express from 'express';
import * as service from './AnswersService';

const CONTROLLER_NAME = '/questions/:questionId/answers';

let router = express.Router();

router.route(CONTROLLER_NAME)
    .post(async (req, res, next) => {
        try {
            req.result = await service.insert(req.params.questionId, req.body);
            next();
        } catch (err) {
            next(err);
        }
    })

export default router;