import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="flex flex-col items-center justify-center h-16 w-16 bg-teal-400 rounded-lg p-4 text-center">
      {value}
    </button>
  );
}
const blockX = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="text-white pointer-events-none select-none duration-300 h-full w-full"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 20 20 4M4 4 20 20"></path>
  </svg>
);

const blockY = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="text-white pointer-events-none select-none duration-300 h-full w-full"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728"></path>
  </svg>
);
export const Board = ({ value, isNextPlayer, onPlay }) => {
  const winner = calculateWinner(value);
  let status;
  if (winner) {
    status = (
      <div className="flex justify-center items-center">
        <span className="text-3xl font-bold mr-4">Winner: </span>
        <div className='className="flex flex-col items-center justify-center h-16 w-16 bg-teal-400 rounded-lg p-4 text-center">'>
          {winner}
        </div>
      </div>
    );
  } else {
    status = (
      <div className="flex justify-center items-center">
        <span className="text-3xl font-bold mr-4"> Next Player </span>
        <div className='className="flex flex-col items-center justify-center h-16 w-16 bg-teal-400 rounded-lg p-4 text-center">'>
          {isNextPlayer ? blockY : blockX}
        </div>
      </div>
    );
  }

  function handleClick(i) {
    if (value[i] || calculateWinner(value)) {
      return;
    }
    const updatedValue = [...value];
    !isNextPlayer
      ? (updatedValue[i] = blockX)
      : (updatedValue[i] = blockY);
    onPlay(updatedValue);
  }
  return (
    <div className="bg-white-300">
      <div>{status}</div>
      <div className="mt-10 flex flex-col px-5 items-center justify-center">
        <div className="flex gap-2 pb-3">
          <Square
            value={value[0]}
            onSquareClick={() => handleClick(0)}
          />
          <Square
            value={value[1]}
            onSquareClick={() => handleClick(1)}
          />
          <Square
            value={value[2]}
            onSquareClick={() => handleClick(2)}
          />
        </div>
        <div className="flex gap-2 pb-3">
          <Square
            value={value[3]}
            onSquareClick={() => handleClick(3)}
          />
          <Square
            value={value[4]}
            onSquareClick={() => handleClick(4)}
          />
          <Square
            value={value[5]}
            onSquareClick={() => handleClick(5)}
          />
        </div>
        <div className="flex gap-2 pb-3">
          <Square
            value={value[6]}
            onSquareClick={() => handleClick(6)}
          />
          <Square
            value={value[7]}
            onSquareClick={() => handleClick(7)}
          />
          <Square
            value={value[8]}
            onSquareClick={() => handleClick(8)}
          />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isNextPlayer, setIsNextPlayer] = useState(false);
  const [current, setCurrent] = useState(0);

  const currentSquare = history[current];

  function handlePlay(updatedValue) {
    setIsNextPlayer((prev) => !prev);
    const nextHistory = [
      ...history.slice(0, current + 1),
      updatedValue,
    ];
    setHistory(nextHistory);
    setCurrent(nextHistory.length - 1);
    // setHistory([...history, updatedValue]);
  }

  function jumpTo(move) {
    setCurrent(move);
    setIsNextPlayer(move % 2 !== 0);
  }

  const moves = history.map((squares, index) => {
    let desc;
    if (index > 0) {
      desc = `Goto move #${index}`;
    } else {
      desc = ` Start`;
    }

    return (
      <li className="my-1" key={index}>
        <button
          className="px-3 py-1 shadow-lg shadow-gray-500/50 bg-black text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
          onClick={() => jumpTo(index)}>
          {desc}
        </button>
      </li>
    );
  });
  return (
    <div>
      <div>
        <Board
          value={currentSquare}
          isNextPlayer={isNextPlayer}
          onPlay={handlePlay}
        />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const squareA = squares[a];
    const squareB = squares[b];
    const squareC = squares[c];

    // Check if squares are not null and have the same type and content
    if (
      squareA &&
      squareB &&
      squareC &&
      squareA.props.children === squareB.props.children &&
      squareA.props.children === squareC.props.children
    ) {
      return squareA; // Return the content of the winning square
    }
  }
  return null;
}

{
  /* <svg
        width="120"
        height="120"
        viewBox="0 0 105 105"
        xmlns="http://www.w3.org/2000/svg"
        fill="#10b981">
        <circle cx="12.5" cy="12.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="0s"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="12.5" cy="52.5" r="12.5" fillOpacity=".5">
          <animate
            attributeName="fill-opacity"
            begin="100ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="52.5" cy="12.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="300ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="52.5" cy="52.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="600ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="92.5" cy="12.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="800ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="92.5" cy="52.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="400ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="12.5" cy="92.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="700ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="52.5" cy="92.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="500ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="92.5" cy="92.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="200ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
     */
}
