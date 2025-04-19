import React, { useState } from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  padding: 2vh;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  width: 100%;
`;

const LetterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(4vh, 40px), 1fr));
  gap: min(1vh, 10px);
  margin-bottom: 2vh;
`;

const LetterButton = styled.button<{ isUsed: boolean }>`
  width: min(4vh, 40px);
  height: min(4vh, 40px);
  font-size: min(2vh, 20px);
  background: ${props => props.isUsed ? '#666' : '#4CAF50'};
  opacity: ${props => props.isUsed ? 0.5 : 1};
  border-radius: 5px;
  cursor: ${props => props.isUsed ? 'not-allowed' : 'pointer'};
  padding: 0;
`;

const ActionButton = styled.button`
  width: 100%;
  margin: 1vh 0;
  padding: min(1.5vh, 15px);
  font-size: min(2vh, 18px);
`;

const Input = styled.input`
  width: 100%;
  padding: min(1vh, 10px);
  margin: 1vh 0;
  font-size: min(2vh, 18px);
  border: none;
  border-radius: 5px;
`;

const SectionTitle = styled.h3`
  font-size: min(2.5vh, 20px);
  margin: 1vh 0;
`;

interface GameControlsProps {
  onBuyVowel: (letter: string) => void;
  onGuessConsonant: (letter: string) => void;
  onSolvePuzzle: (solution: string) => void;
  usedLetters: Set<string>;
  canBuyVowel: boolean;
  canGuessConsonant: boolean;
  currentMoney: number;
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y', 'ä', 'ö', 'å']);
const CONSONANTS = 'bcdfghjklmnpqrstvwxz'.split('');

const GameControls: React.FC<GameControlsProps> = ({
  onBuyVowel,
  onGuessConsonant,
  onSolvePuzzle,
  usedLetters,
  canBuyVowel,
  canGuessConsonant,
  currentMoney
}) => {
  const [showSolve, setShowSolve] = useState(false);
  const [solution, setSolution] = useState('');

  const handleSolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSolvePuzzle(solution);
    setSolution('');
    setShowSolve(false);
  };

  return (
    <ControlsContainer>
      <SectionTitle>Konsonantit</SectionTitle>
      <LetterGrid>
        {CONSONANTS.map(letter => (
          <LetterButton
            key={letter}
            onClick={() => onGuessConsonant(letter)}
            isUsed={usedLetters.has(letter)}
            disabled={!canGuessConsonant || usedLetters.has(letter)}
          >
            {letter.toUpperCase()}
          </LetterButton>
        ))}
      </LetterGrid>

      <SectionTitle>Vokaalit (250€ kpl)</SectionTitle>
      <LetterGrid>
        {Array.from(VOWELS).map(letter => (
          <LetterButton
            key={letter}
            onClick={() => onBuyVowel(letter)}
            isUsed={usedLetters.has(letter)}
            disabled={!canBuyVowel || usedLetters.has(letter)}
          >
            {letter.toUpperCase()}
          </LetterButton>
        ))}
      </LetterGrid>

      {showSolve ? (
        <form onSubmit={handleSolveSubmit}>
          <Input
            type="text"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Kirjoita ratkaisusi..."
            autoFocus
          />
          <ActionButton type="submit">Lähetä ratkaisu</ActionButton>
          <ActionButton type="button" onClick={() => setShowSolve(false)}>Peruuta</ActionButton>
        </form>
      ) : (
        <ActionButton onClick={() => setShowSolve(true)}>Ratkaise arvoitus</ActionButton>
      )}

      <SectionTitle>Rahaa: {currentMoney}€</SectionTitle>
    </ControlsContainer>
  );
};

export default GameControls; 