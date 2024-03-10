import React from 'react';

// TODO: still working on this
interface DiceProps {
	id: number;
	isHeld: boolean;
	holdDice: () => void;
	value: number;
}

export default function Die(props: DiceProps) {
	const dieFace = `w-[60px] h-[60px] shadow-[0px_2px_2px_rgba(0,0,0,0.15)] grid items-center justify-items-center gap-1 cursor-pointer p-2 rounded-md;
	grid-template-areas:
	"a . c"
	"e g f"
	"d . b";`;

	const dot = `w-2.5 h-2.5 bg-slate-700 rounded-full`;

	const generateNewSpan = () => {
		return <span className={dot}></span>;
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
			className={`text-2xl p-3 border-slate-300 rounded-lg shadow-lg font-bold hover:bg-teal-100 hover:cursor-pointer active:opacity-75 bg-
			${dieFace}
			${`die--${props.value}`}
			${props.isHeld ? 'bg-teal-200' : 'bg-white'}`}
			onClick={props.holdDice}
		>
			{createSpan()}
		</div>
	);
}
