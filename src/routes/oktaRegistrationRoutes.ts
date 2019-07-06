import * as express from "express";
import * as api from "./api";

export const initializeOktaOIDCRouter = ( app: express.Application ) => {
    const oidc = app.locals.oidc;

    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        /* The OIDC middleware will attach a userContext object to all requests
            as well as an isAuthenticated() bool
        */
        const user = req.userContext ? req.userContext.userinfo : null;

        res.render( "index", { isAuthenticated: req.isAuthenticated(), user } );
    } );

    // define a secure route handler for the login page that redirects to /guitars
    app.get( "/login", oidc.ensureAuthenticated(), ( req, res ) => {
        res.redirect( "/guitars" );
    } );

    // define a route to handle logout
    app.get( "/logout", ( req: any, res ) => {
        req.logout();
        res.redirect( "/" );
    } );

    // define a secure route handler for the guitars page
    app.get( "/guitars", oidc.ensureAuthenticated(), ( req: any, res ) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        res.render( "pages/guitars", { isAuthenticated: req.isAuthenticated(), user } );
    } );

    api.registerGuitarCRUDAPI(app);
};
