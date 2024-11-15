import { Router } from 'express'
import wrapAsync from '../utils/ErrorHandlers/wrapAsync.js'
import ExpressFormidable from 'express-formidable';
import { newFileHandler, getDirectUrl, myFilesData, deleteFile } from '../controllers/fileControllers.js';
import { isFileOwner, isLoggedIn } from '../middlewares/auth/auth-mw.js';

const filesRouter = Router();

filesRouter.route("/")
    .get(
        wrapAsync(isLoggedIn),
        wrapAsync(myFilesData)
    )

filesRouter.route("/upload")
    .post(
        wrapAsync(isLoggedIn),
        ExpressFormidable({ maxFileSize: 50 * 1024 * 1024 }),
        wrapAsync(newFileHandler)
    )


filesRouter.route("/info")
    .get(wrapAsync(getDirectUrl))

filesRouter.route('/:id')
    .delete(
        wrapAsync(isLoggedIn),
        wrapAsync(isFileOwner),
        wrapAsync(deleteFile)
    );




export default filesRouter;