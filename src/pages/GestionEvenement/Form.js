import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";



export default class FormEvent extends Component {
    state = {
        nom: "",
        Date: "",
        Adresse: "",
        Ville:""
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
            dateError: "",
            AdresseError: "",
            VilleError: ""




        };




        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };



    postEvenement(){
        const evenement = {
            nom: this.state.name,
            Date:this.state.Date,
            Adresse:this.state.Adresse,
            Ville:this.state.Ville

        };
        axios.post(`http://localhost:80/evenement`, { evenement })
            .then(res => {
                console.log(res);
                console.log(res.evenement);
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
                Date: "",
                dateError: "",
               Adresse: "",
                AdresseError: "",
                Ville: "",
                VilleError: ""
            });
            this.postEvenement();
        }
    };

    render() {


        return (
            <form>

                <br />
                <TextField
                    name="Nom"
                    hintText="Nom"
                    floatingLabelText="Nom"
                    value={this.state.nom}
                    onChange={e => this.change(e)}
                    errorText={this.state.nomError}
                    floatingLabelFixed
                />
                <br />
                <TextField
                    name="Date"
                    date="date"
                    label="Date"
                    type="date"
                    InputLabelProps={{
                    shrink: true,
                }}
                    value={this.state.date}
                    onChange={e => this.change(e)}
                />
                <TextField
                    name="Adresse"
                    hintText="Adresse"
                    floatingLabelText="Adresse"
                    value={this.state.Adresse}
                    onChange={e => this.change(e)}

                    floatingLabelFixed
                />

                <TextField
                    name="Ville"
                    hintText="Ville"
                    floatingLabelText="Ville"
                    value={this.state.Ville}
                    onChange={e => this.change(e)}

                    floatingLabelFixed
                />

                <br />
                <RaisedButton label="Ajouter" onClick={e => this.onSubmit(e)} primary />
            </form>
        );
    }
};
