import React, { Component } from 'react';
import Row from './Row';
import PokemonCard from './PokemonCard';

class GameArea extends Component {
    constructor(props) {
        super(props);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.state = {
            active: []
        };
    }
    handleCardClick(type) {
        var active = this.state.active.slice(0);
        var existingIndex = active.indexOf(type);
        if(existingIndex !== -1) {
            active.splice(existingIndex, 1);
        } else {
            active.push(type);
        }
        this.setState({active});
    }
    generateCards() {
        const { active } = this.state;
        var cards = [];
        for ( var i = 0; i < 9; i++ ) {
            cards.push(<PokemonCard type={i} active={active.indexOf(i) !== -1} onClick={this.handleCardClick} key={i}/>);
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
