import React, { useState } from 'react';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px auto;
  flex-wrap: wrap;
`;

const PlayerCard = styled.div<{ isActive: boolean }>`
  background: ${props => props.isActive ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.isActive ? '#4CAF50' : 'transparent'};
  border-radius: 10px;
  padding: 15px;
  min-width: 200px;
  text-align: center;
  transition: all 0.3s ease;
`;

const PlayerName = styled.div`
  margin: 0 0 10px 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const NameInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  font-size: 16px;
  width: 120px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 4px;
  font-size: 14px;

  &:hover {
    color: white;
  }
`;

const Score = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  color: white;
`;

const RoundScore = styled.div`
  font-size: 16px;
  color: #aaa;
`;

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
`;

const AddPlayerButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #ff0000;
  }
`;

export interface Player {
  id: number;
  name: string;
  totalScore: number;
  roundScore: number;
}

interface PlayerControlsProps {
  players: Player[];
  currentPlayer: number;
  onAddPlayer: () => void;
  onRemovePlayer: (id: number) => void;
  onUpdatePlayerName: (id: number, name: string) => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  players,
  currentPlayer,
  onAddPlayer,
  onRemovePlayer,
  onUpdatePlayerName
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleEditStart = (player: Player) => {
    setEditingId(player.id);
    setEditingName(player.name);
  };

  const handleEditSave = () => {
    if (editingId !== null && editingName.trim()) {
      onUpdatePlayerName(editingId, editingName.trim());
      setEditingId(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <div>
      {players.length === 0 ? (
        <EmptyState>
          <p>Ei pelaajia! Lisää pelaajia aloittaaksesi pelin.</p>
          <AddPlayerButton onClick={onAddPlayer}>
            Lisää ensimmäinen pelaaja
          </AddPlayerButton>
        </EmptyState>
      ) : (
        <PlayerContainer>
          {players.map((player) => (
            <PlayerCard key={player.id} isActive={currentPlayer === player.id}>
              <PlayerName>
                {editingId === player.id ? (
                  <NameInput
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={handleEditSave}
                    onKeyDown={handleKeyPress}
                    autoFocus
                  />
                ) : (
                  <>
                    <span>{player.name}</span>
                    <EditButton onClick={() => handleEditStart(player)}>
                      ✎
                    </EditButton>
                  </>
                )}
              </PlayerName>
              <Score>{player.totalScore}€</Score>
              <RoundScore>Tällä kierroksella: {player.roundScore}€</RoundScore>
              {players.length > 1 && (
                <RemoveButton onClick={() => onRemovePlayer(player.id)}>
                  Poista pelaaja
                </RemoveButton>
              )}
            </PlayerCard>
          ))}
          {players.length < 4 && (
            <PlayerCard isActive={false}>
              <AddPlayerButton onClick={onAddPlayer}>
                Lisää pelaaja
              </AddPlayerButton>
            </PlayerCard>
          )}
        </PlayerContainer>
      )}
    </div>
  );
};

export default PlayerControls; 