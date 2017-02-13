import React, { Component, PropTypes } from 'react';
import './PokemonCard.css';


class PokemonCard extends Component { 
    static ACTIVE = "CARD/ACTIVE";
    static MATCHED = "CARD/MATCHED";
    static DEFAULT = "CARD/DEFAULT";
    static defaultProps = {
        onClick: Function.prototype,
        card: {},
        type: PokemonCard.DEFAULT,
        active: false
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.card);
    }

    buildClassName() {
        const base = "PokemonCard";
        var classNames = [base];
        if (this.props.type === PokemonCard.ACTIVE) {
            const active = base+"-active";
            classNames.push(active);
        }
        if (this.props.type === PokemonCard.MATCHED) {
            const matched = base+"-matched";
            classNames.push(matched);
        }
        return classNames.join(' ');
    }

    render() {
        return (<div className={this.buildClassName()} onClick={this.handleClick}></div>);
    }
}

export default PokemonCard;
