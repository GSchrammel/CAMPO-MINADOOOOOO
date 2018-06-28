const boardConfig = {
  height: 3,
  width: 3,
  bombsAmount: 2,
}

const randomNotRepeat = ( array, random ) => {
  const randomNum = random()
  return !array.includes( randomNum ) ? randomNum : randomNotRepeat( array, random ) // isso nem funciona mas valeu a tentativa hskauhs
}

const randomBombsPositions = ( bombsAmount, boardSize ) => {
  const positions = Array.from( { length: bombsAmount } ) // desnecessario? sim, vou arrumar? nao 
  return positions.map( () => 
    randomNotRepeat( positions, () => Math.floor( Math.random() * boardSize ) ) )
  }

function* boardSlices( board, width ) { // mt loco isso aqui 
  while( board.length / width ) {
    yield board.splice( 0, width )
  }
}

const diff = ( num1, num2 ) => Math.abs( num1 - num2 ) 

const getCoordinates = ( i, width, height ) => { // vou fazer umas contas loca e deixa o negocio complicado pq sim
  const index = i + 1
  return {
    x: ( index % width === 0 ) ? index/height : ( index + ( width - ( index % width ) ) ) / width,
    y: ( index % height === 0 ) ? index/height : ( index % height )
  }
}

const setWarningsToBomb = ( boardArray, bombIndex, boardWidth, boardHeight, isBomb ) => { // coloquei td aqui mesmo me julgue
  const bombCoords = getCoordinates( bombIndex, boardWidth, boardHeight )
  return boardArray.map( ( v, i ) => {
    const indexCoords = getCoordinates( i, boardWidth, boardHeight )
    if ( isBomb( i ) ) {
      return 'bomb'
    }
    if ( indexCoords.x === bombCoords.x ) {
      return diff(i, bombIndex) === 1 && v + 1 || v
    }
    if ( indexCoords.y === bombCoords.y ) {
      return diff( indexCoords.x, bombCoords.x ) === 1 && v + 1 || v
    }
    if ( diff( indexCoords.y, bombCoords.y ) === 1 && diff( indexCoords.x, bombCoords.x ) == 1 ) {
      return v + 1
    }
    return 0
  })
}

const isBomb = bombsPositions => i => bombsPositions.includes( i )

const buildBoard = boardConfig => {
  const boardSize = ( boardConfig.height * boardConfig.width )

  const boardInitArray = Array.from( { length: boardSize }, () => 0 )
  const bombsPositions = randomBombsPositions( boardConfig.bombsAmount, boardConfig.width )
  
  const theBoardMyMaaan = bombsPositions.reduce( ( acumulator, bombIndex ) => //ai que começa as gambiarra ne 
    setWarningsToBomb( acumulator, 
      bombIndex, 
      boardConfig.width, 
      boardConfig.height, 
      isBomb( bombsPositions ) 
    ), 
    boardInitArray )

  const board2d = [ ...boardSlices( theBoardMyMaaan, boardConfig.width ) ]
  return board2d
  }

const board = buildBoard( boardConfig )