import { useGameState } from './hooks/useGameState';
import Menu from './components/Menu';
import GameBoard from './components/GameBoard';
import ResultScreen from './components/ResultScreen';

export default function App() {
  const { state, startGame, selectCell, recolorCell, confirmMatch, clearError, reset } = useGameState();

  return (
    <>
      <>
        {state.status === 'menu' && (
          <Menu key="menu" onStart={startGame} />
        )}
        {state.status === 'playing' && (
          <GameBoard
            key="game"
            state={state}
            selectCell={selectCell}
            recolorCell={recolorCell}
            confirmMatch={confirmMatch}
            clearError={clearError}
          />
        )}
      </>

      <>
        {(state.status === 'won' || state.status === 'lost') && (
          <ResultScreen
            key="result"
            won={state.status === 'won'}
            moves={state.moves}
            gridSize={[state.rows, state.cols]}
            onPlayAgain={reset}
          />
        )}
      </>
    </>
  );
}
