// Core
import {check, oneOf} from "express-validator"


export default oneOf([
    [
        check('email').isEmail().withMessage('is not email'),
        check('password').isLength({min: 8, max: 50}).withMessage('min 8, max 50 symbols'),
        check('full_name').isLength({min: 8, max: 30}).withMessage('min 3, max 30 symbols'),
    ]
])
