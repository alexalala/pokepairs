import React, { Component } from 'react';
import Row from './Row';
import PokemonCard from './PokemonCard';
import Button from './button'

import './GameArea.css'

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
    buildClassName() {
        const base = "GameArea";
        var classNames = [base];
        if (this.props.className) {
            classNames.push(this.props.className);
        }
        return classNames.join(' ');
    }
    render() {
        return (<div className={this.buildClassName()}>
                    <Button />
                    { this.renderRows() }
                </div>);
    }
}

export default GameArea;
