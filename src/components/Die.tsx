import React from 'react';

// TODO: convert this component to an actual dice-face
interface DiceProps {
	id: number;
	isHeld: boolean;
	holdDice: () => void;
	value: number;
}

export default function Die(props: DiceProps) {
	return (
		<div
			className={`text-2xl p-3 border-slate-300 rounded-lg shadow-lg font-bold hover:bg-teal-100 hover:cursor-pointer active:opacity-75 ${
				props.isHeld ? 'bg-teal-200' : 'bg-white'
			}`}
			onClick={props.holdDice}
		>
			<h2>{props.value}</h2>
		</div>
	);
}
