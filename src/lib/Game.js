import arrayShuffle from 'array-shuffle';
import uuidV4 from 'uuid/v4';

class Card {
    constructor(data, _id, id) {
        this.data = data;
        this._id = _id || uuidV4();
        this.id = id || uuidV4();
    }
}

const GAME_EXCEPTION_CARD_ACTIVATED = "Card already activated.";
const GAME_EXCEPTION_CARD_MATCHED = "Card already matched.";
export default class Game {
    constructor(cardData, options = {}) {
        this.options = options;
        this.cardData = cardData;
        this.init();
    }

    get activeLimit() {
        return this.options.activeLimit || 2;
    }

    init() {
        this.resetDeck();
        this.resetActiveBuffer();
        this.resetMatchedBuffer();
        this.shuffleDeck();
    }

    resetDeck() {
        this.deck = [];
        var cards = this.cardData.map((data) => new Card(data));
        for(var i = 0; i < this.activeLimit; i++) {
            this.deck = this.deck.concat(cards.map((card) => new Card(card.data, card._id)));
        }
    }
    
    shuffleDeck() {
        this.deck = arrayShuffle(this.deck);
    }

    resetMatchedBuffer() {
        this.matchedBuffer = [];
    }

    resetActiveBuffer() {
        this.activeBuffer = [];
    }

    activeLimitIsReached() {
        return this.activeBuffer.length >= this.activeLimit;
    }

    activeBufferIsValid() {
        var matched = true;
        var buffer = this.activeBuffer.slice(0);
        var identifier = buffer.pop()._id;
        while(matched && buffer.length) { matched = (identifier === buffer.pop()._id) }
        return matched;
    }

    activate(card) {
        if(this.cardIsMatched(card)) {
            throw new Error(GAME_EXCEPTION_CARD_MATCHED);
        }

        if(this.cardIsActive(card)) {
            throw new Error(GAME_EXCEPTION_CARD_ACTIVATED);
        }

        if (this.activeLimitIsReached()) {
            this.resetActiveBuffer();
        }

        this.activeBuffer.push(card);

        if (this.activeLimitIsReached() && this.activeBufferIsValid()) {
            this.matchedBuffer = this.matchedBuffer.concat(this.activeBuffer);
            this.resetActiveBuffer();
        }
    }

    cardIsActive(card) {
        return this.activeBuffer.indexOf(card) !== -1;
    }

    cardIsMatched(card) {
        return this.matchedBuffer.indexOf(card) !== -1;
    }
}
