document.addEventListener('DOMContentLoaded', function () {
    // Appelle la fonction pour générer les boutons lors du chargement de la page
    generateNumberButtons();
});

const checkLoto = (firstname, lastname, email, selectedNumbers) => {
    // Vérification du prénom
    if (!firstname.trim()) {
        return "Veuillez fournir un prénom.";
    }

    // Vérification du nom
    if (!lastname.trim()) {
        return "Veuillez fournir un nom.";
    }

    // Vérification de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    if (!emailRegex.test(email)) {
        return "Votre email n'est pas valide.";
    }

    // Vérification des nombres Loto
    if (selectedNumbers.size !== 6) {
        return "Veuillez sélectionner 6 nombres.";
    }

    // Simulation des nombres gagnants
    const winningNumbers = generateRandomNumbers();

    // Vérification si le joueur a gagné
    if (arraysEqual(Array.from(selectedNumbers), winningNumbers)) {
        return "Félicitations, vous avez gagné 1 million!!!!";
    } else {
        return `Désolé, vous avez perdu, les nombres gagnants sont: ${winningNumbers.join(', ')}`;
    }
};

const validateForm = () => {
    const firstname = getValueById('firstname');
    const lastname = getValueById('lastname');
    const email = getValueById('email');

    const resultMessage = checkLoto(firstname, lastname, email, selectedNumbers);
    setValueById('result', resultMessage);
};

const generateNumberButtons = () => {
    const buttonGroup = document.getElementById('numberButtons');
    
    const row = document.createElement('div');
    row.className = 'row';

    for (let i = 1; i <= 49; i++) {
        const col = document.createElement('div');
        col.className = 'col-2'; // Choisir la largeur en fonction de l'écran
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-secondary btn-block mb-2'; // Ajout de la classe 'btn-block' pour occuper la largeur du parent
        button.dataset.toggle = 'button';
        button.innerHTML = i;
        button.addEventListener('click', () => toggleNumber(i));
        
        col.appendChild(button);
        row.appendChild(col);
    }

    buttonGroup.appendChild(row);
};

const toggleNumber = (number) => {
    if (selectedNumbers.has(number)) {
        selectedNumbers.delete(number);
    } else {
        selectedNumbers.add(number);
    }

    // Met à jour le champ de saisie avec les numéros sélectionnés
    setValueById('lotoNumbers', Array.from(selectedNumbers).join(','));
};

const generateRandomNumbers = () => {
    const numbers = [];
    while (numbers.length < 6) {
        const randomNum = Math.floor(Math.random() * 49) + 1; // Génération d'un nombre entre 1 et 49
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    return numbers;
};

const arraysEqual = (arr1, arr2) => {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
};

// Fonctions utilitaires pour manipuler les éléments DOM
const getValueById = (id) => document.getElementById(id).value;
const setValueById = (id, value) => document.getElementById(id).innerText = value;
