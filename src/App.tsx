import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Wheel from './components/Wheel';
import PuzzleBoard from './components/PuzzleBoard';
import GameControls from './components/GameControls';
import PlayerControls, { Player } from './components/PlayerControls';
import { PUZZLES } from './data/puzzles';
import { WHEEL_SEGMENTS } from './data/wheelConfig';

const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  padding: 1vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  display: flex;
  flex-direction: column;
  overflow: auto;
  @media (max-width: 768px) {
    padding: 1vh 0.5vh;
  }
`;

const Title = styled.h1`
  font-size: min(4vh, 2.5rem);
  margin: 1vh 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    font-size: min(5vw, 1.8rem);
    margin: 0.5vh 0;
  }
`;

const GameContainer = styled.div`
  flex: 1;
  margin: 0 auto;
  padding: 0 2vw;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  grid-template-rows: auto 1fr auto;
  gap: 2vh;
  width: 100%;
  max-width: 1400px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
    padding: 0 1vw;
    gap: 1vh;
  }
`;

const WheelSection = styled.div`
  grid-column: 1;
  grid-row: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 2;
    margin: 1vh 0;
  }
`;

type MessageType = 'success' | 'error' | 'info';

const Message = styled.div<{ type: MessageType }>`
  grid-column: 1 / -1;
  grid-row: 1;
  padding: 1vh;
  border-radius: 10px;
  background-color: ${props => 
    props.type === 'success' ? 'rgba(0, 255, 0, 0.2)' :
    props.type === 'error' ? 'rgba(255, 0, 0, 0.2)' :
    'rgba(255, 255, 255, 0.2)'
  };
  font-size: min(2.5vh, 1.2rem);
  margin: 0 1vw;
  
  @media (max-width: 768px) {
    font-size: min(3vw, 1rem);
    padding: 0.8vh;
    margin: 0 2vw;
  }
`;

const RightSection = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  height: 100%;
  
  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 3;
    gap: 1vh;
  }
`;

const ControlsSection = styled.div`
  grid-column: 1 / -1;
  grid-row: 3;
  padding: 1vh 0;
  
  @media (max-width: 768px) {
    grid-row: 4;
    padding: 0.5vh 0;
  }
`;

interface GameMessage {
  text: string;
  type: MessageType;
}

function App() {
  const [currentPuzzle, setCurrentPuzzle] = useState({ phrase: "", category: "" });
  const [revealedLetters, setRevealedLetters] = useState<Set<string>>(new Set());
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<GameMessage>({ text: "", type: "info" });
  const [canSpin, setCanSpin] = useState(true);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  
  // Player management
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<number | null>(null);

  const getCurrentPlayer = (): Player | null => {
    if (!players.length || currentPlayerId === null) return null;
    const player = players.find(p => p.id === currentPlayerId);
    return player || null;
  };
  
  const nextPlayer = () => {
    if (players.length === 0) return;
    
    const currentIndex = players.findIndex(p => p.id === currentPlayerId);
    const nextIndex = (currentIndex + 1) % players.length;
    setCurrentPlayerId(players[nextIndex].id);
    setCanSpin(true);
  };

  const updatePlayerScore = (playerId: number, roundScore: number) => {
    setPlayers(players.map(player => 
      player.id === playerId
        ? { ...player, roundScore: player.roundScore + roundScore }
        : player
    ));
  };

  const bankPlayerScore = (playerId: number) => {
    setPlayers(players.map(player => 
      player.id === playerId
        ? { 
            ...player, 
            totalScore: player.totalScore + player.roundScore,
            roundScore: 0
          }
        : player
    ));
  };

  const handleAddPlayer = () => {
    const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
    const newPlayer = {
      id: newId,
      name: `Player ${newId}`,
      totalScore: 0,
      roundScore: 0
    };
    setPlayers([...players, newPlayer]);
    
    // If this is the first player, make them the current player
    if (players.length === 0) {
      setCurrentPlayerId(newId);
    }
  };

  const handleRemovePlayer = (id: number) => {
    setPlayers(players.filter(p => p.id !== id));
    if (currentPlayerId === id) {
      nextPlayer();
    }
  };

  const handleUpdatePlayerName = (id: number, name: string) => {
    setPlayers(players.map(player =>
      player.id === id
        ? { ...player, name }
        : player
    ));
  };

  const startNewGame = () => {
    const randomPuzzle = PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
    setCurrentPuzzle(randomPuzzle);
    
    // Initialize revealed letters with special characters and spaces
    const specialChars = new Set(
      randomPuzzle.phrase
        .split('')
        .filter(char => !char.match(/[a-zA-Z]/) || char === '-' || char === ',' || char === ' ')
    );
    setRevealedLetters(specialChars);
    
    setUsedLetters(new Set());
    
    // Reset round scores
    if (players.length > 0) {
      setPlayers(prevPlayers => 
        prevPlayers.map(p => ({ ...p, roundScore: 0 }))
      );
    }
    
    setMessage({ 
      text: players.length === 0 
        ? "Lisää pelaajia aloittaaksesi pelin!" 
        : "Pyöritä pyörää aloittaaksesi!", 
      type: "info" 
    });
  };

  // Initialize game when component mounts
  useEffect(() => {
    startNewGame();
  }, []); // Only run once when component mounts

  // Update message when players change
  useEffect(() => {
    if (players.length === 0) {
      setMessage({ text: "Lisää pelaajia aloittaaksesi pelin!", type: "info" });
    }
  }, [players.length]);

  const handleSpinEnd = (result: string) => {
    if (!getCurrentPlayer()) {
      setMessage({ text: "Lisää pelaajia aloittaaksesi pelin!", type: "error" });
      return;
    }

    setSpinResult(result);
    if (result === 'ROSVO') {
      updatePlayerScore(currentPlayerId!, -getCurrentPlayer()!.roundScore);
      setCanSpin(true);
      setMessage({ text: "Voi ei! Rosvo vei rahat!", type: "error" });
      nextPlayer();
    } else if (result === 'OHI') {
      setCanSpin(true);
      setMessage({ text: "Vuoro meni ohi!", type: "error" });
      nextPlayer();
    } else {
      setMessage({ text: `Valitse konsonantti summalla ${result}!`, type: "info" });
      setCanSpin(false);
    }
  };

  const handleGuessConsonant = (letter: string) => {
    const newUsedLetters = new Set(usedLetters).add(letter);
    setUsedLetters(newUsedLetters);

    const occurrences = (currentPuzzle.phrase.toLowerCase().match(new RegExp(letter, 'g')) || []).length;
    
    if (occurrences > 0) {
      const newRevealedLetters = new Set(revealedLetters).add(letter);
      setRevealedLetters(newRevealedLetters);
      const moneyWon = parseInt(spinResult!.replace('€', '')) * occurrences;
      updatePlayerScore(currentPlayerId!, moneyWon);
      setMessage({ 
        text: `Löytyi ${occurrences} kpl kirjainta ${letter.toUpperCase()}! Voitit ${moneyWon}€!`,
        type: "success"
      });
    } else {
      setMessage({ text: `Ei kirjainta ${letter.toUpperCase()}!`, type: "error" });
      nextPlayer();
    }
    setCanSpin(true);
  };

  const isVowel = (letter: string): boolean => {
    return ['a', 'e', 'i', 'o', 'u'].includes(letter.toLowerCase());
  };

  const countLetterOccurrences = (letter: string, puzzle: { phrase: string }): number => {
    return (puzzle.phrase.toLowerCase().match(new RegExp(letter.toLowerCase(), 'g')) || []).length;
  };

  const handleBuyVowel = (letter: string) => {
    const currentPlayer = getCurrentPlayer();
    
    // Early validation checks
    if (!currentPlayer) {
      setMessage({ text: "Ei aktiivista pelaajaa!", type: "error" });
      return;
    }

    if (!currentPuzzle) {
      setMessage({ text: "Ei aktiivista arvoitusta!", type: "error" });
      return;
    }

    if (!isVowel(letter)) {
      setMessage({ text: "Voit ostaa vain vokaaleja!", type: "error" });
      return;
    }

    if (Array.from(usedLetters).includes(letter)) {
      setMessage({ text: "Tämä vokaali on jo käytetty!", type: "error" });
      return;
    }

    if (currentPlayer.roundScore < 250) {
      setMessage({ text: "Tarvitset 250€ ostaaksesi vokaalin!", type: "error" });
      return;
    }

    // Deduct money first
    const updatedPlayers = [...players];
    const playerIndex = updatedPlayers.findIndex(p => p.id === currentPlayer.id);
    if (playerIndex !== -1) {
      updatedPlayers[playerIndex].roundScore -= 250;
      setPlayers(updatedPlayers);
    }

    // Add to used letters
    setUsedLetters(new Set([...Array.from(usedLetters), letter]));

    // Check if the vowel is found
    const occurrences = countLetterOccurrences(letter, currentPuzzle);
    if (occurrences === 0) {
      setMessage({ text: `Ei kirjainta ${letter.toUpperCase()}! Vuoro siirtyy seuraavalle.`, type: "error" });
      nextPlayer();
    } else {
      setRevealedLetters(new Set([...Array.from(revealedLetters), letter]));
      setMessage({ 
        text: `Löytyi ${occurrences} kpl kirjainta ${letter.toUpperCase()}!`,
        type: "success"
      });
      // Don't move to next player if vowel was found
    }
    
    // Always allow spinning after buying a vowel
    setCanSpin(true);
  };

  const handleSolvePuzzle = (solution: string) => {
    if (solution.toLowerCase() === currentPuzzle.phrase.toLowerCase()) {
      // Reveal all letters, including spaces and special characters
      const allLetters = new Set([
        ...currentPuzzle.phrase.toLowerCase()
          .split('')
          .filter(c => c.match(/[a-zA-Z]/) || c === ' ' || !c.match(/[a-zA-Z\s]/))
      ]);
      setRevealedLetters(allLetters);
      
      // Bank the current player's score
      bankPlayerScore(currentPlayerId!);
      
      setMessage({ 
        text: `Onneksi olkoon! ${getCurrentPlayer()!.name} ratkaisi arvoituksen ja voitti ${getCurrentPlayer()!.roundScore}€!`,
        type: "success"
      });
      
      // Start new game after delay
      setTimeout(() => {
        startNewGame();
        // First player starts the new round
        setCurrentPlayerId(players[0].id);
      }, 3000);
    } else {
      setMessage({ text: "Väärin meni!", type: "error" });
      nextPlayer();
    }
  };

  return (
    <AppContainer>
      <Title>Onnenpyörä</Title>
      <GameContainer>
        <Message type={message.type}>
          {message.text}
        </Message>
        <WheelSection>
          <Wheel
            segments={WHEEL_SEGMENTS}
            onSpinEnd={handleSpinEnd}
            disabled={!canSpin || players.length === 0}
          />
        </WheelSection>
        <RightSection>
          <PlayerControls
            players={players}
            currentPlayer={currentPlayerId ?? -1}
            onAddPlayer={handleAddPlayer}
            onRemovePlayer={handleRemovePlayer}
            onUpdatePlayerName={handleUpdatePlayerName}
          />
          <PuzzleBoard
            puzzle={currentPuzzle.phrase}
            category={currentPuzzle.category}
            revealedLetters={revealedLetters}
          />
        </RightSection>
        <ControlsSection>
          <GameControls
            onBuyVowel={handleBuyVowel}
            onGuessConsonant={handleGuessConsonant}
            onSolvePuzzle={handleSolvePuzzle}
            usedLetters={usedLetters}
            canBuyVowel={Boolean(getCurrentPlayer()?.roundScore ?? 0 >= 250)}
            canGuessConsonant={Boolean(!canSpin && spinResult && spinResult !== 'ROSVO' && spinResult !== 'OHI')}
            currentMoney={getCurrentPlayer()?.roundScore ?? 0}
          />
        </ControlsSection>
      </GameContainer>
    </AppContainer>
  );
}

export default App;
