document.addEventListener("DOMContentLoaded", function () {
    generateNumberButtons();
    generateShuffleResetButtons();
    setBodyBackground(); // Adding the function to set the footer background
});

const selectedNumbers = new Set();

const checkLoto = (firstname, lastname, email, selectedNumbers) => {
    if (!firstname.trim()) {
        return "Veuillez fournir un prénom.";
    }

    if (!lastname.trim()) {
        return "Veuillez fournir un nom.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    if (!emailRegex.test(email)) {
        return "Votre email n'est pas valide.";
    }

    if (selectedNumbers.size !== 6) {
        return "Veuillez sélectionner 6 nombres.";
    }

    const winningNumbers = generateRandomNumbers();

    if (arraysEqual(Array.from(selectedNumbers), winningNumbers)) {
        return "Félicitations, vous avez gagné 1 million!!!!";
    } else {
        return `Désolé, vous avez perdu, les nombres gagnants sont: ${winningNumbers.join(", ")}`;
    }
};

const validateForm = () => {
    const firstname = getValueById("firstname");
    const lastname = getValueById("lastname");
    const email = getValueById("email");

    const resultMessage = checkLoto(firstname, lastname, email, selectedNumbers);
    setValueById("result", resultMessage);
};

const generateNumberButtons = () => {
    const buttonGroup = document.getElementById("numberButtons");
    const buttonsArray = [];

    for (let i = 1; i <= 49; i++) {
        const col = document.createElement("div");
        col.className = "col-2";

        const button = document.createElement("button");
        button.type = "button";
        button.id = `button-${i}`;
        button.className = "btn btn-dark btn-block mb-2";
        const displayNumber = i < 10 ? `0${i}` : `${i}`;
        button.innerText = displayNumber;
        button.addEventListener("click", () => toggleNumber(i));

        col.appendChild(button);
        buttonsArray.push(col);
    }

    shuffle(buttonsArray);

    const row = document.createElement("div");
    row.className = "row";

    buttonsArray.forEach((buttonCol) => {
        row.appendChild(buttonCol);
    });

    buttonGroup.appendChild(row);
};

const generateShuffleResetButtons = () => {
    const shuffleResetContainer = document.getElementById("shuffleResetButtons");

    const addButton = (type, className, innerHTML, clickHandler) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `btn ${className}`;
        button.innerHTML = innerHTML;
        button.addEventListener("click", clickHandler);
        shuffleResetContainer.appendChild(button);
    };

    addButton("warning", "btn-warning", '<i class="bi bi-shuffle"></i> Mélanger les chiffres', shuffleGrid);
    addButton("danger", "btn-danger ms-2", '<i class="bi bi-backspace-fill"></i> Réinitialiser la sélection', resetGrid);
};

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
};

const toggleNumber = (number) => {
    const button = document.getElementById(`button-${number}`);

    if (selectedNumbers.has(number)) {
        selectedNumbers.delete(number);
        button.classList.remove("btn-dark");
        button.classList.add("btn-warning");
    } else {
        if (selectedNumbers.size < 6) {
            selectedNumbers.add(number);
            button.classList.remove("btn-dark");
            button.classList.add("btn-warning");
        }
    }

    setValueById("lotoNumbers", Array.from(selectedNumbers).join(","));
};

const resetGrid = () => {
    selectedNumbers.clear();

    for (let i = 1; i <= 49; i++) {
        const button = document.getElementById(`button-${i}`);
        button.classList.remove("btn-primary");
        button.classList.add("btn-secondary");
    }

    setValueById("lotoNumbers", "");
};

const shuffleGrid = () => {
    const buttonGroup = document.getElementById("numberButtons");
    const buttonsArray = [];

    for (let i = 1; i <= 49; i++) {
        const button = document.getElementById(`button-${i}`);
        buttonsArray.push(button);
    }

    shuffle(buttonsArray);

    buttonsArray.forEach((button, index) => {
        const number = index + 1;
        const displayNumber = number < 10 ? `0${number}` : `${number}`;
        button.innerText = displayNumber;

        if (selectedNumbers.has(number)) {
            button.classList.remove("btn-secondary");
            button.classList.add("btn-primary");
        } else {
            button.classList.remove("btn-primary");
            button.classList.add("btn-secondary");
        }
    });
};

const generateRandomNumbers = () => {
    const numbers = [];
    while (numbers.length < 6) {
        const randomNum = Math.floor(Math.random() * 49) + 1;
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    return numbers;
};

const arraysEqual = (arr1, arr2) => {
    return (
        arr1.length === arr2.length &&
        arr1.every((value, index) => value === arr2[index])
    );
};

const setBodyBackground = () => {
    const body = document.querySelector("body");
    body.style.backgroundColor = "#001f3f"; // Dark blue color
    body.style.backgroundImage = "url('cry_over_cpf.png')"; // Use url() to specify the image path
    body.style.color = "white";
    body.style.padding = "10px";
    body.classList.add("animated-background");
};

const getValueById = (id) => document.getElementById(id).value;
const setValueById = (id, value) => (document.getElementById(id).innerText = value);

