import React from 'react';
import './index.css';

class WallForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wall_index:1,
            width: 0,
            height: 0,
            windows: 0,
            doors: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
       if(this.props.wall_number) {
        this.setState({wall_index: this.props.wall_number});
       }
       
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value}, () => {
            let wallObject = this.state;
            
            if(this.props.onChange) {
                this.props.onChange(wallObject);
            }
        });
    }

    handleSubmit(event) {
        alert('Medida registrada: ',this.state.width);
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="wall-number">
                    Parede {this.props.wall_number}
                </div>
                <form onSubmit={this.handleSubmit} className="wall-form">
                    <label>
                        Altura:
                        <input type="text" name="height" value={this.state.height} onChange={this.handleChange} className="wall-input"></input>
                    </label>
                    <label>
                        Largura:
                        <input type="text" name="width" value={this.state.width} onChange={this.handleChange} className="wall-input"></input>
                    </label>
                    <label>
                        Janelas:
                        <input type="text" name="windows" value={this.state.windows} onChange={this.handleChange} className="windows-doors"></input>
                    </label>
                    <label>
                        Portas:
                        <input type="text" name="doors" value={this.state.doors} onChange={this.handleChange} className="windows-doors"></input>
                    </label>
                </form>
            </div>
        )
    }
}

export default WallForm;