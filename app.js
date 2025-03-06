const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));


// Функция для генерации случайного пароля
const generatePassword = (length = 12) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

// Объект для хранения паролей
const passwordStorage = {
    easy: generatePassword(6),
    medium: generatePassword(10),
    hard: generatePassword(16)
};

// Читаем HTML-шаблоны
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const loginHtmlTemplate = fs.readFileSync(path.join(__dirname, 'login.html'), 'utf8');
const hydraHelpHtml = fs.readFileSync(path.join(__dirname, 'hydra_help.html'), 'utf8');

app.get('/', (req, res) => {
    res.send(indexHtml);
});

app.get('/hydra-help', (req, res) => {
    res.send(hydraHelpHtml);
});

app.post('/login', (req, res) => {
    const { difficulty } = req.body;
    
    if (!passwordStorage[difficulty]) {
        return res.send('Неверный выбор сложности');
    }

    const selectedPassword = passwordStorage[difficulty];
    
    const loginHtml = loginHtmlTemplate.replace('{{selectedPassword}}', selectedPassword);
    
    res.send(loginHtml);
});

app.post('/authenticate', (req, res) => {
    const { username, password, selectedPassword } = req.body;

    if (username !== 'admin') {
        return res.send('<h1>Неверный логин!</h1>');
    }

    if (password === selectedPassword) {
        res.send('<h1>Добро пожаловать! Вы успешно авторизовались.</h1>');
    } else {
        res.send('<h1>Ошибка авторизации! Попробуйте еще раз.</h1>');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Сгенерированные пароли:`, passwordStorage);
});
