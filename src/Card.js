import React from "react";
import "./Card.css";

const Card = ({ src, angle, xPos, yPos }) => {
	const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
	return <img className="Card" src={src} style={{ transform }} />;
};

export default Card;
