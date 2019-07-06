"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeOktaOIDCRouter = (app) => {
    const oidc = app.locals.oidc;
    // define a route handler for the default home page
    app.get("/", (req, res) => {
        /* The OIDC middleware will attach a userContext object to all requests
            as well as an isAuthenticated() bool
        */
        const user = req.userContext ? req.userContext.userinfo : null;
        res.render("index", { isAuthenticated: req.isAuthenticated(), user });
    });
    // define a secure route handler for the login page that redirects to /guitars
    app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
        res.redirect("/guitars");
    });
    // define a route to handle logout
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    // define a secure route handler for the guitars page
    app.get("/guitars", oidc.ensureAuthenticated(), (req, res) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        res.render("pages/guitars", { isAuthenticated: req.isAuthenticated(), user });
    });
};
//# sourceMappingURL=oktaRegistrationRoutes.js.map