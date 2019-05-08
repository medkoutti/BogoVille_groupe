import React from "react";
import Page from "./pages/Page";
import GestionType from "./pages/GestionType";
import {BrowserRouter as Router, Route} from "react-router-dom";
import GestionProbleme from "./pages/GestionProbleme";

import notification from "./pages/GestionNotification/notification";
import evenement from "./pages/GestionEvenement/evenement";


import Accueil from "./pages/Accueil";
import GestionStatut from "./pages/GestionStatut";


function Nav() {
    return (

        <Router>

                <Route exact path="/" component={Page} />
                <Route path="/GestionType" component={GestionType} />
                <Route path="/GestionProbleme" component={GestionProbleme} />
                <Route path="/GestionNotification/notification" component={notification} />
                <Route path="/GestionEvenement/evenement" component={evenement} />

            <Route exact path="/" component={Accueil} />

            <Route path="/Page" component={Page} />

            <Route path="/GestionType" component={GestionType}/>

            <Route path="/GestionProbleme" component={GestionProbleme}/>

            <Route path="/GestionStatut" component={GestionStatut}/>

        </Router>
    );
}

export default Nav;

