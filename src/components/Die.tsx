import React from 'react';

interface DiceProps {
	id: number;
	isHeld: boolean;
	holdDice: () => void;
	value: number;
}

export default function Die(props: DiceProps) {
	const generateNewSpan = () => {
		return <span className='dot'></span>;
	};

	const createSpan = () => {
		const newSpan = [];
		for (let i = 0; i < props.value; i++) {
			newSpan.push(generateNewSpan());
		}
		return newSpan;
	};

	return (
		<div
			className={`text-2xl p-3 border-slate-300 rounded-lg shadow-lg font-bold hover:bg-blue-100 hover:cursor-pointer active:opacity-75
			${`die--${props.value}`} ${`die-face`}
			${props.isHeld ? 'bg-slate-100 ring-slate-950/[.60]' : 'bg-white'}`}
			onClick={props.holdDice}
		>
			{createSpan()}
		</div>
	);
}
