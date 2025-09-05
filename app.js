
const app = Vue.createApp({

    data() {
        return {
            start: true,
            playingGame: false,
            gameOver: false,
            submitScoreCheck: false,
            pipeInterval: null,
            birdInterval: null,
            birdLocation: null,
            pipeLocation1: null,
            pipeLocation2: null,
            pipeLocation3: null,
            pipeLocation4: null,
            score: 0,
        }
    },
    methods: {
        startGame() {
            if(!this.playingGame) {
                this.start = false
                this.playingGame = true
            }
            this.beginPipeMove()
            this.birdUp()
        },
        getScoreImage(score, idx) {
            let digitArray = Array.from(String(score), Number)
            let valueAtIdx = digitArray[idx]
            return `images/${valueAtIdx}.png`
        },
        movePipes() {
            let topPipe1 = document.getElementById('pipe1')
            let topPipe2 = document.getElementById('pipe3')
            let bottomPipe1 = document.getElementById('pipe2')
            let bottomPipe2 = document.getElementById('pipe4')

            this.pipeLocation1 = topPipe1.style.left = `${topPipe1.offsetLeft - 1}px`
            this.pipeLocation2 = topPipe2.style.left = `${topPipe2.offsetLeft - 1}px`
            this.pipeLocation3 = bottomPipe1.style.left = `${bottomPipe1.offsetLeft - 1}px`
            this.pipeLocation4 = bottomPipe2.style.left = `${bottomPipe2.offsetLeft - 1}px`

            if(topPipe1.offsetLeft < -72) {
                topPipe1.style.left = "288px"
                bottomPipe1.style.left = "288px"
            }
            if(topPipe2.offsetLeft < -72) {
                topPipe2.style.left = "288px"
                bottomPipe2.style.left = "288px"
            }
            if((this.pipeLocation1 <= "0px" && this.birdLocation <= "160px")){
                let bird = document.getElementById("bird");
                clearInterval(this.pipeInterval)
                clearInterval(this.birdInterval)
                bird.style.display = "none"
                this.gameOver = true

            }
            else if((this.pipeLocation2 <= "0px" && this.birdLocation <= "210px")){
                let bird = document.getElementById("bird");
                clearInterval(this.pipeInterval)
                clearInterval(this.birdInterval)
                bird.style.display = "none"
                this.gameOver = true
            }
            else if((this.pipeLocation3 <= "0px" && this.birdLocation >= "290px")){
                let bird = document.getElementById("bird");
                clearInterval(this.pipeInterval)
                clearInterval(this.birdInterval)
                bird.style.display = "none"
                this.gameOver = true
            }
            else if((this.pipeLocation4 <= "0px" && this.birdLocation >= "340px")){
                let bird = document.getElementById("bird");
                clearInterval(this.pipeInterval)
                clearInterval(this.birdInterval)
                bird.style.display = "none"
                this.gameOver = true
            }
            else if(this.birdLocation === "450px") {
                let bird = document.getElementById("bird");
                clearInterval(this.pipeInterval)
                clearInterval(this.birdInterval)
                bird.style.display = "none"
                this.gameOver = true
            }
            else if(this.pipeLocation1 === "-40px" || this.pipeLocation2 === "-40px" || this.pipeLocation3 === "-40px" || this.pipeLocation4 === "-40px") {
                this.score++;
            }

        },
        beginPipeMove(){
            this.pipeInterval = setInterval(this.movePipes, 10)
        },
        birdDown() {
            let bird = document.getElementById("bird");
            bird.style.position = "absolute";
            this.birdLocation = bird.style.top = `${bird.offsetTop + 2}px`;

            if(this.birdLocation === "450px") {
                clearInterval(this.pipeInterval)
                clearInterval(this.birdInterval)
                bird.style.display = "none"
                this.gameOver = true
            }
        },
        birdUp() {
            clearInterval(this.birdInterval)
            this.birdInterval = setInterval(this.birdDown, 15)
            let bird = document.getElementById("bird");
            bird.style.position = "absolute";
            this.birdLocation = bird.style.top = `${bird.offsetTop - 60}px`;
        },
        restartGame(){
            location.reload();
        },
        submitScore() {
            this.submitScoreCheck = true;
        },
        submitData() {
            const dataForm = document.getElementById("dataForm")
            dataForm.addEventListener("submit", e => {
                e.preventDefault()
                let userName = dataForm.playerName.value
                let userScore = this.score
                db.collection('score').add({
                    'Player Name: ' : userName,
                    'Player Score: ': userScore
                })
                dataForm.playerName.value = ""
            })
        }
    },
    mounted() {
        window.onload = function() {
            let today = new Date();
            let time = today.getHours();
            let imgSrc;
            let imgAlt = "background"
            if (time > 18) {
                imgSrc = "images/background-night.png"
            }
            else {
                imgSrc = "images/background-day.png"
            }

            let backgroundImg = document.getElementById('backgroundImg')
            backgroundImg.src = imgSrc
            backgroundImg.alt = imgAlt
            backgroundImg.style.position = 'relative'
        }
    },
})

app.mount('#app')