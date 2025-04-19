import React from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  background: #1a4f7a;
  padding: 2vh;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PuzzleGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: min(1.5vh, 10px);
  justify-content: center;
  align-items: center;
  padding: 2vh;
`;

const WordContainer = styled.div`
  display: flex;
  gap: min(1.5vh, 10px);
  margin: min(1.5vh, 10px) 0;
`;

const Letter = styled.div<{ isRevealed: boolean; isSpace: boolean }>`
  width: min(5vh, 40px);
  height: min(5vh, 40px);
  background: ${props => props.isSpace ? 'transparent' : '#28a745'};
  border: ${props => props.isSpace ? 'none' : '2px solid #fff'};
  color: white;
  display: ${props => props.isSpace ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  font-size: min(3vh, 24px);
  font-weight: bold;
  text-transform: uppercase;
`;

const Space = styled.div`
  width: min(5vh, 40px);
  height: min(5vh, 40px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Category = styled.div`
  color: white;
  font-size: min(3vh, 24px);
  text-align: center;
  margin-bottom: 2vh;
  text-transform: uppercase;
`;

interface PuzzleBoardProps {
  puzzle: string;
  category: string;
  revealedLetters: Set<string>;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ puzzle, category, revealedLetters }) => {
  // Split puzzle into words and handle spaces
  const words = puzzle.split(' ');

  return (
    <BoardContainer>
      <Category>{category}</Category>
      <PuzzleGrid>
        {words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            <WordContainer>
              {word.split('').map((letter, letterIndex) => (
                <Letter 
                  key={`${wordIndex}-${letterIndex}`}
                  isRevealed={revealedLetters.has(letter.toLowerCase())}
                  isSpace={false}
                >
                  {revealedLetters.has(letter.toLowerCase()) ? letter : ''}
                </Letter>
              ))}
            </WordContainer>
            {wordIndex < words.length - 1 && <Space />}
          </React.Fragment>
        ))}
      </PuzzleGrid>
    </BoardContainer>
  );
};

export default PuzzleBoard; 