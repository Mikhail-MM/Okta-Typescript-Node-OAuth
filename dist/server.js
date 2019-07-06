"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const authenticationMiddleware = __importStar(require("./middleware/authentication-schemes"));
const okta_routes = __importStar(require("./routes/oktaRegistrationRoutes"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "/../.env") });
const app = express_1.default();
app.use(express_1.default.json());
const port = process.env.SERVER_PORT; // default port to listen;
// Configure Express to use EJS
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Configure Session Management - OKTA + OIDC Sessions
authenticationMiddleware.createOktaOIDCSession(app);
// Initialize Okta Pathway Routes
okta_routes.initializeOktaOIDCRouter(app);
// define a route handler for the default home page
app.get("/", (req, res) => {
    // render the index template
    res.render("index");
});
// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map