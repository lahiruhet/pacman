document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 28
    let score = 0

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1


    ]

    const squares = []


    function createBoard(){
        for(i=0; i<layout.length; i++){
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)

            if(layout[i] == 0){
                squares[i].classList.add('pac-dot')
            }
            else if(layout[i] == 1){
                squares[i].classList.add('wall')
            }
            else if(layout[i] == 2){
                squares[i].classList.add('ghost-lair')
            }
            else if(layout[i] == 3){
                squares[i].classList.add('power-pellet')
            }
        }
    }

    createBoard()

    let pacmanCurrentIndex = 240
    squares[pacmanCurrentIndex].classList.add('pac-man')

    function movePacman(e){
        squares[pacmanCurrentIndex].classList.remove('pac-man')

        switch(e.key){
            case 'ArrowLeft':
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex-1].classList.contains('wall')) 
                pacmanCurrentIndex-=1
                if((pacmanCurrentIndex - 1) === 363){
                    pacmanCurrentIndex = 391
                }
                break

            case 'ArrowRight':
                if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex+1].classList.contains('wall')) 
                pacmanCurrentIndex+=1
                if((pacmanCurrentIndex + 1) === 392){
                    pacmanCurrentIndex = 364
                }
                break

            case 'ArrowUp':
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex-width].classList.contains('wall')) 
                pacmanCurrentIndex-=width
                break

            case 'ArrowDown':
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex+width].classList.contains('wall') && !squares[pacmanCurrentIndex+width].classList.contains('ghost-lair')) 
                pacmanCurrentIndex+=width
                break 
        }

        squares[pacmanCurrentIndex].classList.add('pac-man')
        pacDotEaten()


        
    }

    document.addEventListener('keyup', movePacman)

    function pacDotEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
            score++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove('pac-dot')
        }
    }
})