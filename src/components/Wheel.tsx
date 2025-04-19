import React, { useState } from 'react';
import styled from 'styled-components';
import { SPECIAL_SEGMENTS, MONEY_COLORS } from '../data/wheelColors';

interface WheelProps {
  segments: string[];
  onSpinEnd: (segment: string) => void;
  disabled?: boolean;
}

const WheelContainer = styled.div`
  position: relative;
  width: min(45vh, 400px);
  height: min(45vh, 400px);
  margin: 0 auto;
`;

const WheelSVG = styled.div<{ rotation: number }>`
  width: 100%;
  height: 100%;
  transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
  transform: rotate(${props => props.rotation}deg);
`;

const Pointer = styled.div`
  position: absolute;
  top: -2vh;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: min(2vh, 20px) solid transparent;
  border-right: min(2vh, 20px) solid transparent;
  border-top: min(4vh, 40px) solid #ff0000;
  z-index: 2;
`;

const SpinButton = styled.button`
  position: absolute;
  bottom: min(-8vh, -60px);
  left: 50%;
  transform: translateX(-50%);
  padding: 1vh 2vw;
  font-size: min(2.5vh, 18px);
  min-width: min(15vh, 120px);
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const Wheel: React.FC<WheelProps> = ({ segments, onSpinEnd, disabled = false }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const getSegmentColor = (segment: string, index: number) => {
    // If it's a special segment, use its specific color
    if (SPECIAL_SEGMENTS[segment]) {
      return SPECIAL_SEGMENTS[segment];
    }
    // For money segments, cycle through the money colors
    return MONEY_COLORS[index % MONEY_COLORS.length];
  };

  const spinWheel = () => {
    if (isSpinning || disabled) return;

    setIsSpinning(true);
    const spinDegrees = 1800 + Math.random() * 900;
    const finalRotation = rotation + spinDegrees;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const segmentSize = 360 / segments.length;
      const normalizedRotation = finalRotation % 360;
      const winningIndex = Math.floor(((360 - normalizedRotation) % 360) / segmentSize);
      onSpinEnd(segments[winningIndex]);
    }, 4000);
  };

  return (
    <WheelContainer>
      <Pointer />
      <WheelSVG rotation={rotation}>
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="50" r="50" fill="#333" />
          {segments.map((segment, index) => {
            const rotation = (index * 360) / segments.length;
            const color = getSegmentColor(segment, index);
            
            // Calculate optimal text position and path
            const midAngle = ((index + 0.5) * 360) / segments.length;
            const textRadius = 35;
            const textX = 50 + textRadius * Math.cos((midAngle - 90) * Math.PI / 180);
            const textY = 50 + textRadius * Math.sin((midAngle - 90) * Math.PI / 180);

            // Create a path for text to follow - moved closer to outer rim
            const textPath = `
              M ${50 + 40 * Math.cos((rotation - 90) * Math.PI / 180)} 
                ${50 + 40 * Math.sin((rotation - 90) * Math.PI / 180)}
              A 40 40 0 0 1 
                ${50 + 40 * Math.cos(((rotation + 360 / segments.length) - 90) * Math.PI / 180)}
                ${50 + 40 * Math.sin(((rotation + 360 / segments.length) - 90) * Math.PI / 180)}
            `;

            return (
              <g key={index}>
                <path
                  d={`M 50 50 L ${50 + 50 * Math.cos((rotation - 90) * Math.PI / 180)} ${50 + 50 * Math.sin((rotation - 90) * Math.PI / 180)} A 50 50 0 0 1 ${50 + 50 * Math.cos(((rotation + 360 / segments.length) - 90) * Math.PI / 180)} ${50 + 50 * Math.sin(((rotation + 360 / segments.length) - 90) * Math.PI / 180)} Z`}
                  fill={color}
                  stroke="white"
                  strokeWidth="0.3"
                />
                <path
                  id={`textPath-${index}`}
                  d={textPath}
                  fill="none"
                />
                <text
                  fill="white"
                  fontSize="4"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <textPath
                    href={`#textPath-${index}`}
                    startOffset="50%"
                    style={{
                      fontSize: segment === 'ROSVO' || segment === 'OHI' ? '3' : '4',
                      letterSpacing: '0.2px'
                    }}
                  >
                    {segment}
                  </textPath>
                </text>
              </g>
            );
          })}
        </svg>
      </WheelSVG>
      <SpinButton
        onClick={spinWheel}
        disabled={isSpinning || disabled}
      >
        {isSpinning ? 'Pyörii...' : 'PYÖRITÄ!'}
      </SpinButton>
    </WheelContainer>
  );
};

export default Wheel; 