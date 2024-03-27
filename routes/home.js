const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {

    try {
        fs.readFileSync('message.txt').toString();
    } catch {
        fs.writeFileSync('message.txt', 'No chats exists');
    }
    const allMessages = fs.readFileSync('message.txt').toString();

    res.send(`
    <form action="/" onsubmit="document.getElementById('name').value=localStorage.getItem('username')"
    method="POST">
        <ul id=ul style="listStyle: none;>
            <li id="listitem">${allMessages}</li>
        </ul>
        <input type="text" name="message" id="msg">
        <input  id="name" type="hidden" name="name">
        <button type="submit">Send Message</button>
    </form>`)
});

router.post('/', (req, res, next) => {
    const message = req.body.message;
    const username = req.body.name;

    const messageWithUser = `${username}: ${message} `;

    if (fs.readFileSync('message.txt').toString() === 'No chats exists'){
        fs.writeFileSync('message.txt', messageWithUser);
    } else {
        fs.appendFileSync('message.txt', messageWithUser);
    }
    

    res.redirect('/');
});


module.exports = router;