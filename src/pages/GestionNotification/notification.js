import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import orderBy from "lodash/orderBy";

import Formulaire from "./Form";
import Table from "./Table";
import Cdrawer from "../../component/Cdrawer";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";



const invertDirection = {
    asc: "desc",
    desc: "asc"
};

class Notification extends Component {
    state = {
        open: false,
        data: [
            {
                Id: "Tann",
                nom: "Gounin",
                date_notification: "tgounin0",
                date_echeance: "tgounin0",
                id_ville: "7"

            },
            {
                Id: "Tann",
                nom: "Gounin",
                date_notification: "tgounin0",
                date_echeance: "tgounin0",
                id_ville: "7"
            },
            {
                Id: "Tann",
                nom: "Gounin",
                date_notification: "tgounin0",
                date_echeance: "tgounin0",
                id_ville: "7"
            },
            {
                Id: "Tann",
                nom: "Gounin",
                date_notification: "tgounin0",
                date_echeance: "tgounin0",
                id_ville: "7"
            }

        ],
        editIdx: -1,
        columnToSort: "",
        sortDirection: "desc"
    };
    drawerButton = this.drawerButton.bind(this);
    drawerButton() {
        console.log("drawer Button");
        this.setState({open: !this.state.open});
    }

    handleRemove = i => {
        this.setState(state => ({
            data: state.data.filter((row, j) => j !== i)
        }));
    };

    startEditing = i => {
        this.setState({ editIdx: i });
    };

    stopEditing = () => {
        this.setState({ editIdx: -1 });
    };

    handleChange = (e, name, i) => {
        const { value } = e.target;
        this.setState(state => ({
            data: state.data.map(
                (row, j) => (j === i ? { ...row, [name]: value } : row)
            )
        }));
    };

    handleSort = columnName => {
        this.setState(state => ({
            columnToSort: columnName,
            sortDirection:
                state.columnToSort === columnName
                    ? invertDirection[state.sortDirection]
                    : "asc"
        }));
    };

    render() {
        console.log(this.state.data);
        return (
            <MuiThemeProvider>
                <div className="App">
                    <Cdrawer drawer={this.state.open} drawerButton={this.drawerButton}/>
                    <Header  title={"Gestion des notifications"}  />
                    <NavBar drawerButton={this.drawerButton}/>
                    <Formulaire
                        onSubmit={submission =>
                            this.setState({
                                data: [...this.state.data, submission]
                            })
                        }
                    />
                    <Table
                        handleSort={this.handleSort}
                        handleRemove={this.handleRemove}
                        startEditing={this.startEditing}
                        editIdx={this.state.editIdx}
                        stopEditing={this.stopEditing}
                        handleChange={this.handleChange}
                        columnToSort={this.state.columnToSort}
                        sortDirection={this.state.sortDirection}
                        data={orderBy(
                            this.state.data,
                            this.state.columnToSort,
                            this.state.sortDirection
                        )}
                        header={[

                            {
                                name: "NOM",
                                prop: "nom"
                            },
                            {
                                name: "DATE_NOTIFICATION",
                                prop: "date_notification"
                            },
                            {
                                name: "DATE_ECHEANCE",
                                prop: "date_echeance"
                            },
                            {
                                name: "MESSAGE",
                                prop: "message"
                            },
                            {
                                name: "ID_VILLE",
                                prop: "id_ville"
                            }
                        ]}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Notification;