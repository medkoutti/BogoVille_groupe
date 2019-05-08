import React from "react";
import Cdrawer from '../component/Cdrawer';
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import DynamicTable from "../component/DynamicTable";
import Footer from "../component/Footer";
import FormType from "../component/FormType";

export default class GestionType extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,

            header: [{id: "ID", nom: "nom" , description: "Description"}],
            listRow: [
                {id: 1, nom: "Nid de poule" , description: "Genre de trou dans la rue yo"},
                {id: 2, nom: "Borne fontaine" , description: "Je sais pas c quoi mais criss ca coule"},
                {id: 3, nom: "Arbre dans rue" , description: "Ca peux tu etre plus precis?"},
                {id: 4, nom: "Yolaine" , description: "Yolaine a pas encore corriger calisse"},
                {id: 5, nom: "Hold up a une banque" , description: "POW POW ca fait du bruit et ca fait peur"},
            ],

            header: [{id: "ID", nom: "Nom" , description: "Description"}],
            listRow: [],
            model: "type",

        };
        this.drawerButton = this.drawerButton.bind(this);
        this.parentGetDataFromChild = this.parentGetDataFromChild.bind(this);
        this.getDataFromChildPut = this.getDataFromChildPut.bind(this);
    }

    /**
     * Fonction qui change le state du Drawer.
     * la fonction est aussi passé à l'enfant pour lui permettre de changer le state
     */
    drawerButton(){
        this.setState({open: !this.state.open});
    }

    /**
     * Fonction passée en props à l'enfant (DynamicTable) pour passer
     * l'enregistrement qui doit être modifiée dans la base de données.
     *
     * @param data l'enregistrement modifiée.
     */
    getDataFromChildPut(data){
        const axios = require('axios');
        console.log(data);
        axios({
            method: 'put',
            url: 'http://localhost:80/type/' + data.idType.toString(),
            data: {
                nom: data.nom.toString(),
                description : data.description.toString()
            }
        }).then((resp) => {
            console.log(resp.data);
        });
    }

    /**
     * Fonction passée en props à l'enfant (FormType) pour recevoir
     * les données que l'utilisateur à entré. Fait un appel POST
     * au backend qui fait appel au REST API.
     *
     * @param data les données de l'utilisateur en format tableau.
     */
    parentGetDataFromChild(data){
        console.log(data);
        const axios = require('axios');
        axios.post('http://localhost:80/type', {
            nom: data[0].toString(),
            description: data[1].toString()
        })
            .then(function (response) {
                console.log(response);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

    }

    render(){
        return(
            <div className="App">
                <Cdrawer drawer={this.state.open} drawerButton={this.drawerButton} />
                <Header title={"Gestion des types"} />
                <NavBar drawerButton={this.drawerButton}/>
                <div className="Horizontal">
                    <div className="LeftFlex">
                        <FormType parentGetDataFromChild={this.parentGetDataFromChild} />
                    </div>

                    <DynamicTable getDataFromChildPut={this.getDataFromChildPut} header={this.state.header} model={this.state.model}/>
                </div>
                <Footer/>
            </div>
        );
    }
}