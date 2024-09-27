import React from 'react';

interface SquareProps {
  value: number;
  onClick: () => void;
  highlight?: boolean
}

const Square: React.FC<SquareProps> = ({ value, onClick, highlight }) => {
  const color = value === 1 ? 'black' : value === -1 ? 'white' : '#4A7C2B';
  const borderRadius = value === 0 ? '' : '50%'
  const highlightStyle = highlight ? { border: '3px solid yellow' } : {}
  return (
    <button
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: color,
        cursor: 'pointer',
        border: '3px solid #ccc',
        borderRadius: borderRadius,
        ...highlightStyle
      }}
      onClick={onClick}
    >
    </button>
  )
}
export default Square;