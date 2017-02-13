import arrayShuffle from 'array-shuffle';
import uuidV4 from 'uuid/v4';

class Card {
    // you can supply a custom private identifier if you want
    constructor(data, _id) {
        // data is whatever you want to store as the card, none of this code touches it
        this.data = data;
        // this is the private identifier for the card, use this to determine cloned cards
        this._id = _id || uuidV4();
        // this is the public identifier for this card, each card will have it's own unique number
        this.id = uuidV4();
    }
}

const GAME_EXCEPTION_CARD_ACTIVATED = "Card already activated.";
const GAME_EXCEPTION_CARD_MATCHED = "Card already matched.";
export default class Game {
    constructor(cardData, options = {}) {
        // options for configuring game rules
        this.options = options;
        // array of data items for each (unique) card in the game
        this.cardData = cardData;
        // initialize a new game immediately
        this.init();
    }

    // this function returns the number of selections required to make a match
    get activeLimit() {
        // default to 2
        return this.options.activeLimit || 2;
    }

    init() {
        // reset the deck: build cards from the cardData, duplicate cards to match activeLimit
        this.resetDeck();
        // resets the 'hand' or 'active cards' list
        this.resetActiveBuffer();
        // resets the 'matched' cards list
        this.resetMatchedBuffer();
        // finally, shuffle the deck
        this.shuffleDeck();
    }

    resetDeck() {
        this.deck = [];
        // make base set of cards
        var cards = this.cardData.map((data) => new Card(data));
        for(var i = 0; i < this.activeLimit; i++) {
            // duplicate the base set activeLimit number of times 
            // clone the card by giving the private identifier to a new Card call
            this.deck = this.deck.concat(cards.map((card) => new Card(card.data, card._id)));
        }
    }
    
    shuffleDeck() {
        // calls a library to shuffle the array
        this.deck = arrayShuffle(this.deck);
    }

    resetMatchedBuffer() {
        // empty all matched cards
        this.matchedBuffer = [];
    }

    resetActiveBuffer() {
        // reset all cards in the 'hand'
        this.activeBuffer = [];
    }

    activeLimitIsReached() {
        // check if the cards in the 'hand' are at the selection limit
        return this.activeBuffer.length >= this.activeLimit;
    }

    activeBufferIsValid() {
        var matched = true;
        // copy the 'hand'
        var buffer = this.activeBuffer.slice(0);
        // grab the first id (any id really)
        var identifier = buffer.pop()._id;
        // check if the cards in the 'hand' all match the first private identifier
        while(matched && buffer.length) { matched = (identifier === buffer.pop()._id) }
        // return true or false
        return matched;
    }

    activate(card) {
        // check if the card is matched, if it is, error
        if(this.cardIsMatched(card)) {
            throw new Error(GAME_EXCEPTION_CARD_MATCHED);
        }
        // check if the card is already activated / in the 'hand', if it is, error
        if(this.cardIsActive(card)) {
            throw new Error(GAME_EXCEPTION_CARD_ACTIVATED);
        }

        // check if our 'hand' has reached the active/selection limit
        if (this.activeLimitIsReached()) {
            // if it has, reset the whole hand before continuing
            this.resetActiveBuffer();
        }

        // push the card into the hand
        this.activeBuffer.push(card);

        // check for limit, if the limit is reached then check for validity
        if (this.activeLimitIsReached() && this.activeBufferIsValid()) {
            // if it's valid, push the whole hand into the matched array
            this.matchedBuffer = this.matchedBuffer.concat(this.activeBuffer);
            // reset the hand
            this.resetActiveBuffer();
        }
    }

    // returns whether a card is active
    cardIsActive(card) {
        return this.activeBuffer.indexOf(card) !== -1;
    }

    // returns whether a card is matched
    cardIsMatched(card) {
        return this.matchedBuffer.indexOf(card) !== -1;
    }
}
