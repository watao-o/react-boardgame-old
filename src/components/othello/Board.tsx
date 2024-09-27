import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: Array<number>;
  onClick: (i: number) => void;
  validMoves: Array<number>;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, validMoves }) => {
  const renderSquare = (i: number) => {
    const isValidMove = validMoves.includes(i);
    return <Square value={squares[i]} onClick={() => onClick(i)} highlight={isValidMove} />
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 50px)'} }>
      {Array(64).fill(null).map((_, i) => renderSquare(i))}
    </div>
  )
}
export default Board;