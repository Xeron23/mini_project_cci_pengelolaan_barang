import e from "express";
import routerCategory from "./domain/category/category.route.js";
import RouterItem from "./domain/items/items.route.js";
import RouterItemIncome from "./domain/items/item_income/itemIncome.route.js";
import RouterItemOutcome from "./domain/items/item_outcome/itemOutcome.route.js";
import RouterAuth from "./domain/auth/auth.route.js";
import authMiddelware from "./middleware/auth-middleware.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error-middleware.js";

const App = e();

App.use(e.json());
App.use(cookieParser());
App.use(e.urlencoded({ extended: true }));



// Set up the route
App.use('/api/auth', RouterAuth);

// auth middleware
App.use(authMiddelware);

App.use("/api/category", routerCategory);
App.use("/api/items", RouterItem)

App.use("/api/item-income", RouterItemIncome)
App.use("/api/item-outcome", RouterItemOutcome)


// error middlware
App.use(errorMiddleware);

App.listen(3000, () => {
    console.log("Server is running on port 3000");
});