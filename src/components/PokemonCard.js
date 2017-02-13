import React, { Component, PropTypes } from 'react';
import './PokemonCard.css';


class PokemonCard extends Component { 
    static ACTIVE = "CARD/ACTIVE";
    static MATCHED = "CARD/MATCHED";
    static DEFAULT = "CARD/DEFAULT";
    static defaultProps = {
        onClick: Function.prototype,
        card: {},
        type: PokemonCard.DEFAULT
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.card);
    }

    cardIsActive() {
        return this.props.type === PokemonCard.ACTIVE;
    }

    buildClassName() {
        const base = "PokemonCard";
        var classNames = [base];
        if (this.cardIsActive()) {
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
        const isActive = this.cardIsActive();
        return (<div
            className={this.buildClassName()}
            onClick={this.handleClick}>
            { isActive && this.props.card.data }
        </div>);
    }
}

export default PokemonCard;
