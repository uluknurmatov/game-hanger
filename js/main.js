let btn_start = document.querySelector("#btn_start");
let btn_finish = document.querySelector("#btn_finish");
let game_detail = document.querySelector(".game_detail");
let detail_desc = document.querySelector(".statics .description");
let detail_word = document.querySelector(".statics .word");

// game status
let game_status = {
    win() {
        document.querySelector(".game_table .status").innerHTML =
            "Вы выиграли!";
    },
    lose() {
        document.querySelector(".game_table .status").innerHTML =
            "Вы проиграли!";
    },
    start() {
        document.querySelector(".game_table .status").innerHTML = "";
    },
    finish() {
        document.querySelector(".game_table .status").innerHTML =
            "Игра закончена";
    },
};

//get body
//  game_body -отвечает за тело висельника,кости по порядку
//  веревка,голова,тело,левая-рука,правая-рука,леваянога,правая нога

let game_body = [
    document.querySelector(".rope"),
    document.querySelector(".head"),
    document.querySelector(".body"),
    document.querySelector(".left_hand"),
    document.querySelector(".right_hand"),
    document.querySelector(".left_foot"),
    document.querySelector(".right_foot"),
];

let errorCount = 0;
let answer = 0;

let word_list = [
    {
        desc: "Зимой и летом одним цветом",
        word: "ёлка",
    },
    {
        desc: "Висит груша, нельзя скушать",
        word: "лампа",
    },
    {
        desc: "Каких камней нет в море",
        word: "сухих",
    },
];

btn_start.addEventListener("click", startGame);
btn_finish.addEventListener("click", finishGame);

// start_game -запускает игру
//обнуляет все переменные  и удаляет тело висельника

function startGame() {
    game_status.start();
    errorCount = 0;
    answer = 0;
    setWord();

    //удаляет тело при старте игры
    game_body.forEach((item) => {
        item.style.display = "none";
    });
    btn_start.style.display = "none";
    btn_finish.style.display = "block";
}

//finishGame - заканчивает игру
//очищает поля  description и word в блоке statics

function finishGame() {
    detail_desc.innerHTML = "";
    detail_word.innerHTML = "";

    game_status.finish();

    btn_start.style.display = "block";
    btn_finish.style.display = "none";
}

//setWord - устанавливает игровое слово, и устанавливает описание

function setWord() {
    let random_word = word_list[Math.floor(Math.random() * word_list.length)];
    console.log(random_word);

    detail_desc.innerHTML = random_word.desc;

    for (let i = 0; i < random_word.word.length; i++) {
        let btn = document.createElement("button");
        btn.setAttribute("id", i);
        btn.addEventListener("click", (e) => {
            checkWord(e.target, random_word.word);
        });
        btn.innerHTML = "X";
        detail_word.appendChild(btn);
    }
}

function checkWord(target, word) {
    let id = target.id;
    let getlet = prompt("Введите букву").toLocaleLowerCase();
    if (getlet === null) {
        alert("Пожалуйста, введите букву");
    } else if (getlet.length !== 1) {
        alert("Пожалуйства,введите только одну букву!");
    } else if (getlet == word[id]) {
        target.innerHTML = word[id];
        answer++;
    } else {
        game_body[errorCount].style.display = "block";
        console.log(game_body[errorCount]);
        errorCount++;
    }
    if (errorCount === game_body.length) {
        finishGame();
        game_status.lose(word);
    }
    if (answer == word.length) {
        finishGame();
        game_status.win();
    }
}
