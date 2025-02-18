import React from "react";

class AddUserInfor extends React.Component {
    state = {
        Name: '',
        Age: ''
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleOnSubmit = (event) => {
        event.preventDefault(); // ngăn việc tải lại trang
        this.props.handleAddnewUser({
            id: Math.floor((Math.random() * 100) + 1) + "user",
            Name: this.state.Name,
            Age: this.state.Age
        });
        this.setState({ Name: '', Age: '' }); // Reset input fields
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleOnSubmit(event)}>
                <input 
                    type="text" 
                    name="Name" 
                    placeholder="Enter Name" 
                    value={this.state.Name} 
                    onChange={(event) => this.handleOnChangeInput(event)} 
                />
                <input 
                    type="number" 
                    name="Age" 
                    placeholder="Enter Age" 
                    value={this.state.Age} 
                    onChange={(event) => this.handleOnChangeInput(event)} 
                />
                <button type="submit">Add User</button>
            </form>
        );
    }
}
export default AddUserInfor; 
