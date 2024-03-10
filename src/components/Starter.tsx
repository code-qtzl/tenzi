import React, { useState, useEffect } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

interface timerProps {
	m: number;
	s: number;
}

export default function Starter() {
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(true);
	const [numRolls, setNumRolls] = useState(0);
	const [time, setTime] = useState<timerProps>({ m: 0, s: 0 });
	const [timeOn, setTimeOn] = useState<boolean>(false);
	const [timeStop, setTimeStop] = useState<boolean>(false);
	const [runInterval, setRunInterval] = useState<NodeJS.Timeout | undefined>(
		undefined,
	); // is declared as a state variable using the useState hook. It is typed as NodeJS.Timeout | undefined, which means it can hold either the ID of the interval or undefined.

	// Matching all the dice
	useEffect(() => {
		const allHeld = dice.every((dice) => dice.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((dice) => dice.value === firstValue);

		if (allSameValue && allHeld) {
			setTenzies(true);
			setTimeOn(false);
			setTimeStop(true);
		}
	}, [dice]);

	// Timer Start/Stop
	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (!timeOn || timeStop) {
			clearInterval(runInterval);
		} else {
			intervalId = setInterval(() => {
				setTime((prev) => {
					return prev.s === 59
						? { m: prev.m + 1, s: 0 }
						: { m: prev.m, s: prev.s + 1 };
				});
			}, 1000);
		}

		// Cleanup function
		return () => clearInterval(intervalId);
	}, [timeOn, timeStop, runInterval]);

	function displayTime(time: timerProps) {
		/* 00: 00 */
		return `${time.m < 10 ? '0' : ''}${time.m}:${time.s < 10 ? '0' : ''}${
			time.s
		}`;
	}

	function generateNewDice() {
		return {
			id: nanoid(),
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
		};
	}

	function allNewDice() {
		const newArray = [];
		for (let i = 0; i < 10; i++) {
			newArray.push(generateNewDice());
		}
		return newArray;
	}

	function rollButton() {
		if (!tenzies) {
			setDice((prevDice) =>
				prevDice.map((die) => {
					return die.isHeld ? die : generateNewDice();
				}),
			);
			setNumRolls((prev) => prev + 1);
		} else {
			resetGame();
		}
	}

	function resetGame() {
		setTenzies(false);
		setDice(allNewDice());
		setTime({ m: 0, s: 0 });
		setNumRolls(0);
		setTimeOn(true);
		setTimeStop(false);
	}

	function holdDice(id) {
		console.log('Selected', id);
		setDice((prevDice) =>
			prevDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			}),
		);
	}

	const diceElem = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			id={die.id}
			holdDice={() => holdDice(die.id)}
		/>
	));

	const startGame = () => {
		setVisible(false);
		setTimeOn(true);
	};

	const handleStop = () => {
		clearInterval(runInterval);
		setTimeOn(false);
		setTimeStop(false);
	};

	return (
		<div className='flex flex-col min-h-screen justify-center bg-gradient-to-r from-slate-800 to-slate-900 items-center p-5'>
			{tenzies && <Confetti />}

			<div className='relative flex flex-col justify-center text-center bg-neutral-100 p-5 rounded-lg content-center max-w-lg '>
				<h1 className='text-indigo-800 text-4xl font-bold'>Tenzies</h1>
				<p className='text-lg font-light my-6'>
					Roll until all dice are the same. Click each die to freeze
					it at its current value between rolls.
				</p>
				<p className='scores'>
					Rolls: {numRolls} | Time: {displayTime(time)}
				</p>
				<div
					className={
						visible
							? 'w-full h-4/6 absolute bottom-0 left-0 rounded-lg backdrop-blur flex justify-between bg-neutral-100/75'
							: 'hidden'
					}
				>
					<button
						className='bg-gradient-to-r items-center text-white m-auto p-3 font-black text-lg rounded-lg from-orange-400 to-orange-500 w-40 mt-20 shadow-lg hover:opacity-80'
						onClick={startGame}
					>
						Start Game
					</button>
				</div>
				<div className='grid grid-rows-2 grid-cols-5 gap-2 my-8'>
					{diceElem}
				</div>
				<button
					className='bg-gradient-to-r from-indigo-700 to-indigo-800 items-center w-full text-white m-auto p-3 font-black text-lg rounded-lg hover:opacity-75 active:opacity-90'
					onClick={rollButton}
				>
					{tenzies ? 'Restart Game' : 'Roll'}
				</button>
			</div>

			{!visible && !tenzies ? (
				<button
					className='items-center w-1/3 my-2 mx-auto p-3 font-normal text-sm rounded-sm hover:opacity-75 active:opacity-40 underline text-white'
					onClick={resetGame}
				>
					{'Reset'}
				</button>
			) : null}
		</div>
	);
}
