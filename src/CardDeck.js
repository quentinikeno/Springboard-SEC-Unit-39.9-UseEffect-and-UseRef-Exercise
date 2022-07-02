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
				const { code, image } = res.data.cards[0];
				setCards((cards) => [...cards, { code, image }]);
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
				setDeckId(() => res.data.deck_id);
			} catch (error) {
				console.log(error);
			}
		};
		shuffleDeck();
	}, []);

	const cardComponents = cards.map((card) => (
		<Card key={card.code} src={card.image} />
	));

	return (
		<div>
			<h1>Deck of Cards</h1>
			{cards.length < 52 && (
				<button onClick={handleClick}>Gimme a Card!</button>
			)}
			{cardComponents}
		</div>
	);
};

export default CardDeck;
