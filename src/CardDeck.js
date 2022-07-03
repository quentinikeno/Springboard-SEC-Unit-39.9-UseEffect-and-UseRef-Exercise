import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const CardDeck = () => {
	const baseUrl = "https://deckofcardsapi.com/api/deck/";
	const [deckId, setDeckId] = useState(null);
	const [cardsRemaining, setCardsRemaining] = useState(null);
	const [cards, setCards] = useState([]);
	const [isDrawing, setIsDrawing] = useState(false);
	const timerId = useRef(null);

	useEffect(() => {
		const shuffleDeck = async () => {
			try {
				const res = await axios.get(
					`${baseUrl}new/shuffle/?deck_count=1`
				);
				const { deck_id, remaining } = res.data;
				setDeckId(() => deck_id);
				setCardsRemaining(() => remaining);
			} catch (error) {
				console.log(error);
			}
		};
		shuffleDeck();
	}, [setDeckId]);

	useEffect(() => {
		const getNewCard = async () => {
			try {
				const res = await axios.get(
					`${baseUrl}${deckId}/draw/?count=1`
				);
				const { remaining } = res.data;
				const { code, image } = res.data.cards[0];

				if (remaining === 0) {
					setIsDrawing(false);
					clearInterval(timerId.current);
				}

				setCards((cards) => [...cards, { code, image }]);
				setCardsRemaining(() => remaining);
			} catch (error) {
				console.log(error);
			}
		};

		if (isDrawing && timerId.current === null) {
			timerId.current = setInterval(() => {
				getNewCard();
			}, 1000);
		} else {
			clearInterval(timerId.current);
		}

		return () => {
			clearInterval(timerId.current);
			timerId.current = null;
		};
	}, [isDrawing, setIsDrawing, deckId]);

	const handleClick = () => setIsDrawing((isDrawing) => !isDrawing);

	const cardComponents = cards.map((card) => (
		<Card key={card.code} src={card.image} />
	));

	return (
		<div className="CardDeck">
			<h1>Deck of Cards</h1>
			<div>
				{cardsRemaining === 0 ? (
					<p>No cards remaining!</p>
				) : (
					<button onClick={handleClick}>
						{isDrawing ? "Stop" : "Start"} Drawing
					</button>
				)}
			</div>
			<div>{cardComponents}</div>
		</div>
	);
};

export default CardDeck;
