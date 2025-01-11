document.getElementById("generate-button").addEventListener("click", generateGameField);

document.getElementById("change-player").addEventListener("click", changePlayer);

let currentPlayer = "X";

function launchConfetti(player) {
    confetti({
        particleCount: 300,
        spread: 85,
        origin: { x: 0.5, y: 0.5 },
        colors: (player === 1) ? ["#FF0000", "#7C0A02"] : ["#000080", "#1035AC"]
    });
}

function showPlayer() {
  let p = document.getElementById("current-player");
  if (currentPlayer === "X") {
    p.innerText = "Играет первый игрок";
    p.classList.remove("Os");
    p.classList.add("Xs");
  }
  else{
    p.innerText = "Играет второй игрок";
    p.classList.remove("Xs");
    p.classList.add("Os");
  }
}

function changePlayer(){
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  showPlayer()
}

function generateGameField() {
  currentPlayer = "X";
  showPlayer()
  const size = parseInt(document.getElementById("game-size").value);
  const game_container = document.getElementById("game-container");
  game_container.innerHTML = "";
  game_container.style.gridTemplateColumns = `repeat(${size}, 50px)`;
  game_container.style.gridTemplateRows = `repeat(${size}, 50px)`;
  for (let i = 0; i < size ** 2; i++) {
    const cell = document.createElement("div");
    cell.id = `cell${i}`;
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(cell, size));
    game_container.appendChild(cell);
  }
  console.log(game_container);
}

function handleClick(cell, size) {
  if (!cell.textContent) {
    showPlayer();
    cell.innerHTML = currentPlayer; // innerHTML - содержимое тега
    cell.classList.add("taken");
    cell.classList.add(`${currentPlayer}s`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (check(size)) {
      generateGameField();
    }
  }
}

function create2dArray(size) {
  const cells = document.getElementsByClassName("cell");
  const arr = [];
  let row = [];
  let index = 0;
  for (let cell of cells) {
    if (index >= size) {
      arr.push(row);
      row = [];
      index = 0;
    }
    row.push(cell.textContent);
    index++;
  }
  arr.push(row);
  return arr;
}

function winner(){
  if (currentPlayer === "X"){
    launchConfetti(2);
    alert("Игра окончена, победил второй игрок");
  }
  else{
    launchConfetti(1);
    alert("Игра окончена, победил первый игрок");
  }
}

function check(size) {
  const arr = create2dArray(size);
  console.log(arr);
  let cnt = 0;
  for (let i = 0; i < size; i++) {
    let cntX = 0;
    let cntO = 0;
    
    for (let j = 0; j < size;j++){
      console.log(arr[i][j]);
      if (arr[i][j] === "X") {
        cntX++;
      }
      else if (arr[i][j] === "O"){
        cntO++;
      }
      else if (arr[i][j] === ""){
        cnt++;
      }
    }
    if (cntX === size || cntO === size){
      //alert(`Игра окончена, победил ${currentPlayer}`);
      winner();
      return true;
    }
    
  }
  // проверка по столбцам
  for (let i = 0; i < size; i++) {
    let cntX = 0;
    let cntO = 0;

    for (let j = 0; j < size;j++){
      if (arr[j][i] === "X") {
        cntX++;
      }
      else if (arr[j][i] === "O"){
        cntO++;
      }
    } 
    if (cntX === size || cntO === size){
      //alert(`Игра окончена, победил ${currentPlayer}`);
      winner()
      return true;
    }
  }

  // проверка на диагонали
  let cntX = 0;
  let cntO = 0;

  // для побочной диагонали
  let cntX1 = 0;
  let cntO1 = 0;


  for (let i = 0; i < size; i++) {
    if (arr[i][i] === "X") {
      cntX++;
    }
    else if (arr[i][i] === "O"){
      cntO++;
    }
    if (arr[i][size - i - 1] === "X"){
      cntX1++;
    }
    else if (arr[i][size - i - 1] === "O"){
      cntO1++;
    }
    if (cntX === size || cntO === size || cntX1 === size || cntO1 === size){
      // alert(`Игра окончена, победил ${currentPlayer}`);
      winner();
      return true;
    }
  }

  if (cnt == 0) {
    alert("Ничья");
    return true;
  }
  
  return false;
}
