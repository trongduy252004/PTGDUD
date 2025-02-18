import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class Mycomponent extends React.Component {
    state = {
        listUser: [
            {id: 1, Name: "Duy", Age: 29},
            {id: 2, Name: "Hoa", Age: 24},
            {id: 3, Name: "Cuong", Age: 22},
        ],
        valueInput: 'abc'
    }

    handleAddnewUser = (userObject) => {
        this.setState({
            listUser: [userObject, ...this.state.listUser]
        });
    }

    handleDeleteUser = (userID) => {
        let listUserClone = this.state.listUser.filter(item => item.id !== userID);
        this.setState({
            listUser: listUserClone
        });
    }

    handleInput = (event) => {
        this.setState({
            valueInput: event.target.value
        });
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        let { valueInput, listUser } = this.state;
        return (
            <div>
                <AddUserInfor handleAddnewUser={this.handleAddnewUser}></AddUserInfor>
                <DisplayInfor 
                    listUser={listUser} 
                    handleDeleteUser={this.handleDeleteUser}
                ></DisplayInfor>
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <input 
                        type="text" 
                        value={valueInput} 
                        onChange={(event) => this.handleInput(event)} 
                    />
                    <button>Submit</button>
                </form>
                <div>
                    <span>{}</span>
                </div>
            </div>
        );
    }
}
export default Mycomponent;
