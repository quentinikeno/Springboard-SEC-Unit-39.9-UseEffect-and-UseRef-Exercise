import { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const CardDeck = () => {
	const baseUrl = "https://deckofcardsapi.com/api/deck/";
	const [deckId, setDeckId] = useState(null);
	const [cards, setCards] = useState([]);

	const handleClick = () => {
		const getNewCard = async () => {
			try {
				const res = await axios.get(
					`${baseUrl}${deckId}/draw/?count=1`
				);
				setCards((cards) => [...cards, res.data.cards[0].image]);
			} catch (error) {
				console.log(error);
			}
		};
		getNewCard();
	};

	useEffect(() => {
		const shuffleDeck = async () => {
			try {
				const res = await axios.get(
					`${baseUrl}new/shuffle/?deck_count=1`
				);
				setDeckId(() => res.data.deckId);
			} catch (error) {
				console.log(error);
			}
		};
		shuffleDeck();
	}, []);

	const cardComponents = cards.map((image) => <Card src={image} />);

	return (
		<div>
			<h1>Deck of Cards</h1>
			<button onClick={handleClick}>Gimme a Card!</button>
			{cardComponents}
		</div>
	);
};

export default CardDeck;
