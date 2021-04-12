import Grid from './Components/Grid';
import ScoreBoard from './Components/Scoreboard';
import Footer from './Components/Footer';
import './Styles/App.css';
import { useState } from 'react';
import Vendor from './Scripts/vendor';

interface scoreBoard {
	o: number;
	'=': number;
	x: number;
}

function App() {
	const [gridState, setGridState] = useState([
		['', '', ''],
		['', '', ''],
		['', '', ''],
	]);

	const [scoreState, setScoreState] = useState({
		o: 0,
		'=': 0,
		x: 0,
	});

	const [currentPlayer, setCurrentPlayer] = useState('x');

	const [gameState, setGameState] = useState(true);

	const onTileClick = (rowIdx: number, colIdx: number) => {
		if (!gridState[rowIdx][colIdx] && gameState) {
			updateGridState(rowIdx, colIdx);
			switchCurrentPlayer();
			if (Vendor.checkWin(gridState)) {
				updateScore(`${currentPlayer}`);
			} else if (Vendor.checkDraw(gridState)) {
				updateScore('=');
			}
		}
	};

	const updateGridState = (rowIdx: number, colIdx: number) => {
		let updatedGridState = gridState;
		updatedGridState[rowIdx][colIdx] = currentPlayer;
		setGridState(updatedGridState);
	};

	const updateScore = (score: String) => {
		let newScore = scoreState;
		newScore[score as keyof scoreBoard] += 1;
		setScoreState(newScore);
		setGameState(false)
	};

	const resetGame = () => {
		setGridState([
			['', '', ''],
			['', '', ''],
			['', '', ''],
		]);
		setCurrentPlayer('x');
		setGameState(true);
	};

	const switchCurrentPlayer = () => {
		currentPlayer === 'x' ? setCurrentPlayer('o') : setCurrentPlayer('x');
	};

	return (
		<div className='App'>
			<ScoreBoard score={scoreState} />
			<Grid gridState={gridState} onTileClick={onTileClick} />
			<Footer resetGame={resetGame} />
		</div>
	);
}

export default App;
