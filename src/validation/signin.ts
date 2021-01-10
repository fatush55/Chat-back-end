// Core
import {check, oneOf} from "express-validator"


export default oneOf([
    [
        check('email').isEmail().withMessage('is not email'),
    ]
])
