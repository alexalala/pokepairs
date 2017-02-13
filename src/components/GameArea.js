import React, { Component } from 'react';
import PokemonCard from './PokemonCard';

class GameArea extends Component {
    renderCards() {
        var cards = [];
        for ( var i = 0; i < 9; i++ ) {
            cards.push(<PokemonCard key={i}/>);
        }
        return cards;
    }
    render() {
        return (<div className="GameArea">{ this.renderCards() }</div>);
    }
}

export default GameArea;
