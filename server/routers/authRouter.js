import { Router } from 'express'
import { authWithGoogle, loginUser, logoutUser, signupUser } from '../controllers/authControllers.js';
import wrapAsync from '../utils/ErrorHandlers/wrapAsync.js';

const authRouter = Router();


authRouter.route("/google")
    .get(wrapAsync(authWithGoogle));

authRouter.route("/signup")
    .post(wrapAsync(signupUser))

authRouter.route("/login")
    .post(wrapAsync(loginUser))

authRouter.route("/logout")
    .post(wrapAsync(logoutUser))


export default authRouter;