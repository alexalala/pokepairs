import React, { Component, PropTypes } from 'react';
import './PokemonCard.css';

class PokemonCard extends Component { 
    static defaultProps = {
        onClick: Function.prototype,
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            active: false,
        };
    }

    handleClick() {
        this.setState({
            active: !this.state.active,
        });
        this.props.onClick();
    }

    buildClassName() {
        const base = "PokemonCard";
        const active = base+"-active";
        var classNames = [base];
        if (this.state.active) {
            classNames.push(active);
        }
        return classNames.join(' ');
    }

    render() {
        return (<div className={this.buildClassName()} onClick={this.handleClick}></div>);
    }
}

export default PokemonCard;
