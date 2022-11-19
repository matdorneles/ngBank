import { Router } from "express";
import { CheckBalanceController } from "./controllers/CheckBalanceController";
import { CheckoutController } from "./controllers/CheckoutController";
import { CreateUserController } from "./controllers/CreateUserController";
import { LoginUserController } from "./controllers/LoginUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

router.post('/user/new', new CreateUserController().handle);
router.post('/user/auth', new LoginUserController().handle);

router.post('/account/balance', isAuthenticated, new CheckBalanceController().handle);
router.post('/account/checkout', isAuthenticated, new CheckoutController().handle);

export { router }