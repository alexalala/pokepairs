import React, { Component } from 'react';
import Row from './Row';
import PokemonCard from './PokemonCard';

class GameArea extends Component {
    generateCards() {
        var cards = [];
        for ( var i = 0; i < 9; i++ ) {
            cards.push(<PokemonCard key={i}/>);
        }
        return cards;
    }
    buildGrid(cards) {
        return cards.reduce((reduction, val, i) => {
            var row = (i+1)%3;
            reduction[row] = reduction[row] || [];
            reduction[row].push(val);
            return reduction;
        }, []);
    }
    renderRows() {
        const cards = this.buildGrid(this.generateCards());
        return cards.map((row, i) => <Row key={i}>{ row }</Row>);
    }
    render() {
        return (<Row className="GameArea">{ this.renderRows() }</Row>);
    }
}

export default GameArea;
