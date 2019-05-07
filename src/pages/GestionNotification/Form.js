import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";


export default class Formulaire extends Component {
    state = {
        nom: "",
        date_notification: "",
        date_echeance: "",
        message:"",
        id_ville: ""
    };


    change = e => {
        // this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    validate = () => {
        let isError = false;
        const errors = {
            idError: "",
            nomError: "",
            date_notificationError: "",
            date_echeanceError: "",
            id_villeError:"",
            messageError: ""


        };




        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };

    postNotification(){
        const notification = {
            nom: this.state.nom,
            date_notification:this.state.date_notification,
            date_echeance:this.state.date_echeance,
            message:this.state.message,
            id_ville:this.state.id_ville,


        };
        axios.post(`http://localhost:80/notification`, { notification })
            .then(res => {
                console.log(res);
                console.log(res.notification);
            })
    }



    onSubmit = e => {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
            this.props.onSubmit(this.state);
            // clear form
            this.setState({

                idError: "",
                nom: "",
                nomError: "",
                date_notification: "",
                date_notificationError: "",
                date_echeance:"",
                date_echeanceError:"",
                message:"",
                messageError:"",
                id_ville:"",
                id_villeError:""

            });
            this.postNotification();
        }
    };

    render() {


        return (
            <form>

                <br />
                <TextField
                    name="nom"
                    hintText="Nom"
                    floatingLabelText="Nom"
                    value={this.state.nom}
                    onChange={e => this.change(e)}
                    errorText={this.state.nomError}
                    floatingLabelFixed
                />
                <br />
                <TextField
                    name="date_notification"
                    floatingLabelText="DATE de NOTIFICATION"
                    date="date"
                    label="date_notification"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.date_notification}
                    onChange={e => this.change(e)}
                />
                <TextField
                    name="date_echeance"
                    floatingLabelText="DATE ECHEANCE"
                    date="date"
                    label="date_echeance"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.date_echeance}
                    onChange={e => this.change(e)}
                />
                <TextField
                    name="message"
                    hintText="Votre Message"
                    floatingLabelText="Message"
                    value={this.state.message}
                    onChange={e => this.change(e)}
                    errorText={this.state.messageError}
                    floatingLabelFixed
                />


                <TextField
                    name="id_ville"
                    hintText="Id_Ville"
                    floatingLabelText="Id_ville"
                    value={this.state.id_ville}
                    onChange={e => this.change(e)}
                    errorText={this.state.id_villeError}
                    floatingLabelFixed
                />

                <br />
                <RaisedButton label="Ajouter" onClick={e => this.onSubmit(e)} primary />
            </form>
        );
    }
};
