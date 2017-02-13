import React, { Component, PropTypes } from 'react';
import './PokemonCard.css';

class PokemonCard extends Component { 
    static defaultProps = {
        onClick: Function.prototype,
        active: false
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.type);
    }

    buildClassName() {
        const base = "PokemonCard";
        const active = base+"-active";
        var classNames = [base];
        if (this.props.active) {
            classNames.push(active);
        }
        return classNames.join(' ');
    }

    render() {
        return (<div className={this.buildClassName()} onClick={this.handleClick}></div>);
    }
}

export default PokemonCard;
