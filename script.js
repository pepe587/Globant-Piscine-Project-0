
function initBoard() {
    let divs = document.querySelectorAll('#board .tile');

    let rand1 = Math.random() % 2;
    let rand2 = Math.random() % 2;

    let num1 = Math.random() < 0.5 ? 2 : 4;
    let num2 = Math.random() < 0.5 ? 2 : 4;

    let index1 = Math.floor(Math.random() * 16);
    let index2 = index1;

    while (index1 === index2) {
        index2 = Math.floor(Math.random() * 16);
    }
    divs[index1].textContent = num1.toString();
    divs[index2].textContent = num2.toString();
    refreshClassBoard();
}

function removeClass(div) {
    div.classList.forEach((className, index) => {
        if (className !== 'tile')
            div.classList.remove(className);
    });
}

function refreshClassBoard() {
    let divs = document.querySelectorAll('#board .tile');
    divs.forEach((div, index) => {
        const value = parseInt(div.textContent, 10);
        /*console.log('text content: ', div.textContent);
        console.log('value: ', value);
        console.log('Classes: ', div.classList);*/
        switch (value) {
            case NaN:
                removeClass(div);
                break;
            case 2:
                removeClass(div);
                div.classList.add('tile-2');
                break;
            
            case 4:
                removeClass(div);
                div.classList.add('tile-4');
                break;
            
            case 8:
                removeClass(div);
                div.classList.add('tile-8');
                break;
            
            case 16:
                removeClass(div);
                div.classList.add('tile-16');
                break;
            
            case 32:
                removeClass(div);
                div.classList.add('tile-32');
                break;
            
            case 64:
                removeClass(div);
                div.classList.add('tile-64');
                break;
                
            case 128:
                removeClass(div);
                div.classList.add('tile-128');
                break;
                
            case 256:
                removeClass(div);
                div.classList.add('tile-256');
                break;
                
            case 512:
                removeClass(div);
                div.classList.add('tile-512');
                break;
                
            case 1024:
                removeClass(div);
                div.classList.add('tile-1024');
                break;
                
            case 2048:
                removeClass(div);
                div.classList.add('tile-2048');
                break;
            
            default:
                removeClass(div);
                break;
        }
    });
}

function matrixToDiv(matrix) {
    let divs = document.querySelectorAll('#board .tile');

    matrix.forEach((line, indexLine) => {
        line.forEach((number, indexNum) => {
            divs[(indexLine * 4) + indexNum].textContent = number;
        })
    });
}

function refreshPositionsBoard(key) {
    let divs = document.querySelectorAll('#board .tile');
    let scoreElement = document.getElementById('score');
    let matrix = [
        [divs[0].textContent, divs[1].textContent, divs[2].textContent, divs[3].textContent],
        [divs[4].textContent, divs[5].textContent, divs[6].textContent, divs[7].textContent],
        [divs[8].textContent, divs[9].textContent, divs[10].textContent, divs[11].textContent],
        [divs[12].textContent, divs[13].textContent, divs[14].textContent, divs[15].textContent]
    ];
    console.log('Matrix before: ', matrix);
    let i;
    let x;
    switch (key) {
        case 'ArrowRight':
            matrix.forEach((line, index) => {
                i = 3;
                while (i >= 0) {
                    if (line[i] !== "")
                    {
                        let j = 0;
                        while (line[i + j + 1] === "")
                        {
                            j++;
                        }
                        if (line[i + j + 1] === line[i])
                        {
                            scoreElement.textContent = (parseInt(scoreElement.textContent, 10) + parseInt(line[i], 10)).toString();
                            line[i + j + 1] = (parseInt(line[i], 10) * 2).toString();
                            line[i] = "";
                        }
                        else if (j > 0)
                        {
                            line[i + j] = line[i];
                            line[i] = "";
                        }
                        
                    }
                    i--;
                }
            });
            break;
        
        case 'ArrowLeft':
            matrix.forEach((line, index) => {
                i = 3;
                while (i >= 0) {
                    if (line[i] !== "")
                    {
                        let j = 0;
                        while (line[i - j - 1] === "")
                        {
                            j++;
                        }
                        if (line[i - j - 1] === line[i])
                        {
                            scoreElement.textContent = (parseInt(scoreElement.textContent, 10) + parseInt(line[i], 10)).toString();
                            line[i - j - 1] = (parseInt(line[i], 10) * 2).toString();
                            line[i] = "";
                        }
                        else if (j > 0)
                        {
                            line[i - j] = line[i];
                            line[i] = "";
                        }
                        
                    }
                    i--;
                }
            });
            break;

        case 'ArrowUp':
            j = 0;
            i = 0;
            
            // Iterar sobre las columnas
            while (i <= 3) {
                j = 3; // Comienza desde la fila inferior para mover hacia arriba
                while (j >= 0) {
                    x = 0;
            
                    // Buscar la primera celda vacía (hacia arriba)
                    while (j - x - 1 >= 0 && matrix[j - x - 1][i] === '') {
                        x++;
                    }
            
                    // Si encontramos un número igual arriba, combinarlo
                    if (j - x - 1 >= 0 && matrix[j - x - 1][i] === matrix[j][i]) {
                        scoreElement.textContent = (parseInt(scoreElement.textContent, 10) + parseInt(matrix[j][i], 10)).toString();
                        matrix[j - x - 1][i] = (parseInt(matrix[j][i], 10) * 2).toString();
                        matrix[j][i] = ''; // Vaciar la celda original
                    }
                    // Si hay espacio (x > 0), mover el número hacia arriba
                    else if (x > 0) {
                        matrix[j - x][i] = matrix[j][i];
                        matrix[j][i] = ''; // Vaciar la celda original
                    }
                    j--;
                }
                i++;
            }
            break;

        case 'ArrowDown':
            j = 0;
            i = 0;
            
            // Iterar sobre las columnas
            while (i <= 3) {
                j = 0; // Comienza desde la fila inferior para mover hacia arriba
                while (j <= 3) {
                    x = 0;
            
                    // Buscar la primera celda vacía (hacia arriba)
                    while (j + x + 1 <= 3 && matrix[j + x + 1][i] === '') {
                        x++;
                    }
            
                    // Si encontramos un número igual arriba, combinarlo
                    if (j + x + 1 <= 3 && matrix[j + x + 1][i] === matrix[j][i]) {
                        scoreElement.textContent = (parseInt(scoreElement.textContent, 10) + parseInt(matrix[j][i], 10)).toString();
                        matrix[j + x + 1][i] = (parseInt(matrix[j][i], 10) * 2).toString();
                        matrix[j][i] = ''; // Vaciar la celda original
                    }
                    // Si hay espacio (x > 0), mover el número hacia arriba
                    else if (x > 0) {
                        matrix[j + x][i] = matrix[j][i];
                        matrix[j][i] = ''; // Vaciar la celda original
                    }
                    j++;
                }
                i++;
            }
            break;

        default:
            return false;
    }
    console.log('Matrix after: ', matrix);
    matrixToDiv(matrix);
    return true;
}

function addNewNumber() {
    let divs = document.querySelectorAll('#board .tile');
    let rand = Math.floor(Math.random() * 16);
    let check = false;

    divs.forEach((div, index) => {
        if (div.textContent === "")
            check = true;
    });
    if (check == false)
    {
        const popupMessage = document.getElementById('popup-message');
        popupMessage.textContent = 'You lose!!';  // Establece el mensaje del pop-up
        popup.style.display = 'flex';
        return false;
    }
    //añadir pop-up con el final del juego
    while (divs[rand].textContent !== "")
        rand = Math.floor(Math.random() * 16);
    divs[rand].textContent = Math.random() < 0.5 ? 2 : 4;
    return true;
}

function uWin() {
    let divs = document.querySelectorAll('#board .tile');

    divs.forEach((div, index) => {
        if (div.textContent === '2048')
        {
            const popupMessage = document.getElementById('popup-message');
            popupMessage.textContent = 'You Win!!';  // Establece el mensaje del pop-up
            popup.style.display = 'flex';
        }
    });
}

function handleKeys(event) {

    if (!refreshPositionsBoard(event.key))
        return ;
    if (uWin())
        return ;
    if (!addNewNumber())
        return ;
    refreshClassBoard();
}

function buttonClicked() {
    let divs = document.querySelectorAll('#board .tile');

    divs.forEach((div, index) => {
        div.textContent = "";
    });
    initBoard();
}

function lose() {
    const closePopupBtn = document.getElementById('close-popup-btn');
    popup.style.display = 'none';
    let divs = document.querySelectorAll('#board .tile');

    divs.forEach((div, index) => {
        div.textContent = "";
    });
    initBoard();
}

const closePopupBtn = document.getElementById('close-popup-btn');
const button = document.getElementById('restart-btn');


document.addEventListener('DOMContentLoaded', initBoard);
document.addEventListener('keydown', handleKeys);
button.addEventListener('click', buttonClicked);
closePopupBtn.addEventListener('click', lose);