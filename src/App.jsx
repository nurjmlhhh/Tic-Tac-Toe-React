// /* eslint-disable react/prop-types */
// import { useState } from "react";

// function Square({ valueProps, onSquareClick }) {
//   // const [value, setValue] = useState('');

//   // function handleClick(){
//   //   setValue('X');
//   // }

//   return (
//     <button className="square" onClick={onSquareClick}>
//       {valueProps}
//     </button>
//   );
// }
// export default function Board() {
//   const [squares, setSquares] = useState(Array(9).fill(null));
//   const [xIsNext, setXIsNext] = useState(true);

//   function handleClick(i) {
//     if (squares[i] || CalculateWinner(squares)) {
//       return;
//     }

//     const nextSquares = squares.slice();
//     // if(xIsNext){
//     //   nextSquares[i] = "X";
//     // }else{
//     //   nextSquares[i] = "O";
//     // }

//     nextSquares[i] = xIsNext ? "X" : "O";
//     setSquares(nextSquares);
//     setXIsNext(!xIsNext);
//   }

//   const winner = CalculateWinner(squares);
//   let status = "";
//   if (winner) {
//     status = "Winner : " + winner;
//   } else {
//     status = "Next player : " + (xIsNext ? "X" : "O");
//   }

//   return (
//     <>
//       <div className="status"> {status} </div>
//       <div className="board">
//         <Square valueProps={squares[0]} onSquareClick={() => handleClick(0)} />
//         <Square valueProps={squares[1]} onSquareClick={() => handleClick(1)} />
//         <Square valueProps={squares[2]} onSquareClick={() => handleClick(2)} />
//         <Square valueProps={squares[3]} onSquareClick={() => handleClick(3)} />
//         <Square valueProps={squares[4]} onSquareClick={() => handleClick(4)} />
//         <Square valueProps={squares[5]} onSquareClick={() => handleClick(5)} />
//         <Square valueProps={squares[6]} onSquareClick={() => handleClick(6)} />
//         <Square valueProps={squares[7]} onSquareClick={() => handleClick(7)} />
//         <Square valueProps={squares[8]} onSquareClick={() => handleClick(8)} />
//       </div>
//     </>
//   );
// }


// function CalculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];

//     if (squares[a] && squares[a] === squares[b] && squares[c]) {
//       return squares[a];
//     }
//   }
//   return false;
// }


/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ valueProps, onSquareClick }) {
  // const [value, setValue] = useState('');

  // function handleClick(){
  //   setValue('X');
  // }

  return (
    <button className="square" onClick={onSquareClick}>
      {valueProps}
    </button>
  );
}

function Board({xIsNextProps, squaresProps, onPlay}) { //menyimpan keadaan Square, awalnya tidak ada parameter
  // const [squares, setSquares] = useState(Array(9).fill(null)); //dipindah ke function Game di history (diperbarui menjadi array dalam array)
  // const [xIsNext, setXIsNext] = useState(true); //dipindah ke function Game

  function handleClick(i) {
    if (squaresProps[i] || CalculateWinner(squaresProps)) {
      return;
    }

    const nextSquares = squaresProps.slice();
    // if(xIsNext){
    //   nextSquares[i] = "X";
    // }else{
    //   nextSquares[i] = "O";
    // }

    nextSquares[i] = xIsNextProps ? "X" : "O";
    onPlay(nextSquares);
    //dikomen karena ada parameter (buat yang baru)
    // setSquares(nextSquares); 
    // setXIsNext(!xIsNext);

  }

  const winner = CalculateWinner(squaresProps);
  let status = "";
  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = "Next player : " + (xIsNextProps ? "X" : "O");
  }

  return (
    <>
      <div className="status"> {status} </div>
      <div className="board">
        <Square valueProps={squaresProps[0]} onSquareClick={() => handleClick(0)} />
        <Square valueProps={squaresProps[1]} onSquareClick={() => handleClick(1)} />
        <Square valueProps={squaresProps[2]} onSquareClick={() => handleClick(2)} />
        <Square valueProps={squaresProps[3]} onSquareClick={() => handleClick(3)} />
        <Square valueProps={squaresProps[4]} onSquareClick={() => handleClick(4)} />
        <Square valueProps={squaresProps[5]} onSquareClick={() => handleClick(5)} />
        <Square valueProps={squaresProps[6]} onSquareClick={() => handleClick(6)} />
        <Square valueProps={squaresProps[7]} onSquareClick={() => handleClick(7)} />
        <Square valueProps={squaresProps[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


export default function Game(){ //menyimpan keadaan Board
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // const currentSquares = history[history.length-1]; //keadaan terakhir
  const currentSquares = history[currentMove];

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0 );
  }
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
    // setHistory([...history, nextSquares]); //mengcopy dan menambahkan array baru
    setXIsNext(!xIsNext);
  }

  const moves = history.map((squares, move) => {
    let description = '';
    if(move > 0){
      description = 'Go to move # ' + move;
    }else{
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );

  })


  return(
    <>
    <div className="game">
      <div className="game-board">
        <Board xIsNextProps={xIsNext} squaresProps = {currentSquares} onPlay={handlePlay}/>

      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
    </>
  )
}
function CalculateWinner(squares) {
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

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}

