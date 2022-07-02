import { useState, useEffect } from "react";

const CardDeck = () => {
	const [deckId, setDeckId] = useState(null);
	const [cards, setCards] = useState([]);
	return (
		<div>
			<h1>Deck of Cards</h1>
			<button>Gimme a Card!</button>
		</div>
	);
};

export default CardDeck;
