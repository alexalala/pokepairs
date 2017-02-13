import React, { Component } from 'react';
import Row from './Row';
import PokemonCard from './PokemonCard';
import Game from '../lib/Game.js';
import Button from './Button'

import './GameArea.css'

class GameArea extends Component {
    constructor(props) {
        super(props);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.state = {
            active: [],
            game: new Game(['a', 'b', 'c'])
        };
    }

    handleCardClick(card) {
        const { game } = this.state;
        game.activate(card);
        this.setState({game});
    }

    buildGrid() {
        const { game } = this.state;
        return game.deck.reduce((reduction, gameCard, i) => {
            var cardType = PokemonCard.DEFAULT;
            switch(true) {
                case game.cardIsMatched(gameCard):
                    cardType = PokemonCard.MATCHED;
                    break;
                case game.cardIsActive(gameCard):
                    cardType = PokemonCard.ACTIVE;
                    break;
            }

            const card = <PokemonCard
                card={gameCard}
                key={i}
                type={cardType}
                onClick={this.handleCardClick} />
            const row = (i+1)%3;
            reduction[row] = reduction[row] || [];
            reduction[row].push(card);
            return reduction;
        }, []);
    }
    renderRows() {
        const cards = this.buildGrid();
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
