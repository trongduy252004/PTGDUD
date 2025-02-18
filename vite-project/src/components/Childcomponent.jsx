import React from "react";

class Childcomponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueInput: 'abc' // giá trị mặc định
        };
    }

    handleInput = (event) => {
        this.setState({
            valueInput: event.target.value // hiển thị đúng giá trị được nhập vào
        });
    }

    render() {
        let { valueInput, sum } = this.props; // tối ưu hóa code
        return (
            <>
                <h1>
                    Call function Sum: 6 + 7 = {sum(6, 7)} {/* Gọi hàm sum từ component cha */}
                </h1>
                <div>
                    <input 
                        value={this.state.valueInput} 
                        onChange={(event) => this.handleInput(event)} 
                        type="text" 
                    />
                </div>
                <div>
                    <span>{this.state.valueInput}</span> {/* Hiển thị giá trị input */}
                </div>
            </>
        );
    }
}

export default Childcomponent;
