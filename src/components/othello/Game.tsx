import React, { useState,  useEffect } from 'react';
import Board from './Board';
import { toast } from 'react-toastify';

const Game: React.FC = () => {
  const [squares, setSquares] = useState<number[]>(Array(64).fill(0));
  const [player, setPlayer] = useState<number>(1);
  const [validMoves, setValidMoves] = useState<number[]>([]);
  const [gameInfo, setGameInfo] = useState<any>('');

  useEffect(() => {
    initializeSquares()
    // setSquares([0,0,1,0,-1,1,0,0,-1,-1,-1,-1,1,1,-1,-1,-1,-1,-1,1,-1,1,1,-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,-1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,-1])
    // setSquares([1,1,1,1,1,1,0,0,1,1,1,-1,-1,-1,-1,-1,1,1,1,-1,-1,1,-1,1,1,-1,-1,1,-1,-1,1,1,-1,-1,-1,-1,1,1,-1,1,0,-1,1,-1,-1,-1,1,1,-1,1,-1,1,1,1,1,1,1,1,1,1,1,1,1,0])
    // 有効な手を計算
    calculateValidMoves();
  }, [])

  useEffect(() =>{
    // 手番が入れ替わった際に有効な手を再計算
    calculateValidMoves();
    setGameInfo(`手番のプレイヤー:${player === 1 ? '黒' : '白'}`)
  }, [player])

  
  const initializeSquares = () => {
    const initialSquares = Array(64).fill(0);
    initialSquares[27] = 1;
    initialSquares[28] = -1;
    initialSquares[35] = -1;
    initialSquares[36] = 1;
    setSquares(initialSquares);
    setGameInfo(`手番のプレイヤー:${player === 1 ? '黒' : '白'}`)
  }

  const calculateValidMoves = () => {
    const validPositions: number[] = [];
    squares.forEach((_, i) => {
      const [x, y] = [Math.floor(i / 8), i % 8];
      if (squares[i] === 0 && chkInstallable(x, y).valid) {
        validPositions.push(i);
      }
    });
    setValidMoves(validPositions);
  };

  const handleClick = (i: number) => {
    // 設置済みであれば処理終了
    if(squares[i] !== 0) {
      toast.error('設置済みのマスです')
      return
    }

    // 設置するマスを取得
    const [x, y] = [Math.floor(i / 8), i % 8]
    
    // めくれるかチェック
    const { valid, directions } = chkInstallable(x, y);

    if (valid) {
      const newSquares = squares.slice();

      // 自分のコマを設置
      newSquares[i] = player
      console.log(`i: ${i} , newSquares[i]: ${newSquares[i]}`)
      // 相手のコマをめくる
      for (const { dx, dy } of directions) {
        let nx = x + dx;
        let ny = y + dy;

        // 自分のコマのマスに行くまでループ
        while (newSquares[nx * 8 + ny] === (player === 1 ? -1 : 1)) {
          // コマをめくる
          newSquares[nx * 8 + ny] = player;
          nx += dx;
          ny += dy;
        }
      }
      // console.log(JSON.stringify(newSquares))
      setSquares(newSquares);
      // めくった後にゲームオーバーをチェック
      if (checkGameOver(newSquares)) {
        toast.info('ゲーム終了');
        // 勝者判定のロジックをここに追加
        let blackCount = 0;
        let whiteCount = 0;
        for(const square of newSquares) {
          if (square === 1) {
            blackCount++
          } else if (square === -1) {
            whiteCount++
          }
        }

        const winner = `黒: ${blackCount}, 白: ${whiteCount} ` +
         (blackCount > whiteCount ? '黒の勝利です！！' : blackCount === whiteCount ? '引き分けです' :'白の勝利です！！')
        setGameInfo(winner)
      } else {
        // 手番交代
        switchPlayer();
      }
    } else {
      toast.error('無効な手です。'); // トーストメッセージを表示
    }
  };
  // 設置可否
  const chkInstallable = (x: number, y: number) => {
    // 隣接もしくは斜めにコマが存在するか
    const directions = [
      { dx: 1, dy: 0 },  // 右
      { dx: -1, dy: 0 }, // 左
      { dx: 0, dy: 1 },  // 下
      { dx: 0, dy: -1 }, // 上
      { dx: 1, dy: 1 },  // 右下
      { dx: 1, dy: -1 }, // 右上
      { dx: -1, dy: 1 }, // 左下
      { dx: -1, dy: -1 } // 左上
    ];

    // 相手のコマの値
    const opponent = player === 1 ? -1 : 1;
    
    let valid = false;
    const validDirections: Array<{ dx: number; dy: number }> = [];

    // 各方向をチェック
    for(const { dx, dy } of directions) {
      let foundOpponent = false;
      let nx = x + dx;
      let ny = y + dy;

       // 相手のコマが続いているかチェック
       while (nx >= 0 && nx < 8 && ny >=0 && ny < 8) {
        if (squares[nx * 8 + ny] === opponent) {
          foundOpponent = true;
        } else if (squares[nx * 8 + ny] === player) {
          if (foundOpponent) {
            valid = true; // 有効な手
            validDirections.push({ dx, dy })
          }
          break; // 自分のコマがあれば終了
        } else {
          break; // 空マスがあれば終了
        }
        nx += dx;
        ny += dy;
       }
    }

    return {valid, directions: validDirections };
  };

  const switchPlayer = () => {
    setPlayer(player => (player === 1 ? -1 : 1))
  }

  const checkGameOver = (newSquares: Array<number>) => {
    console.log(JSON.stringify(squares))
    console.log(JSON.stringify(newSquares))
    console.log('終了判定:', newSquares.every(square => square !== 0))
    const black = newSquares.find(square => square === 1)
    const white = newSquares.find(square => square === -1)
    return newSquares.every(square => square !== 0) || (black && !white) || (!black && white);
  };

  const resetGame = () => {
    setSquares(Array(64).fill(0));
    initializeSquares();
    setPlayer(1);
  };

  return (
    <div>
      <h1>オセロ</h1>
      <button onClick={resetGame}>リセット</button>
      <p>{gameInfo}</p>
      <Board squares={squares} onClick={handleClick} validMoves={validMoves} />
    </div>
  )
}
export default Game;