const express = require('express');
const {access} = require('fs/promises');
const {constants} = require('fs');
const cors = require('cors');

const app = express();
const port = 3014;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/getlanguage', async (req, res, next) => {
    try {

        const lang = req.query.lang
        console.log('Entering getlanguage endpoint with a request for ' + lang);

        const languagefile = './languages/' + lang + '.js';

        await access(languagefile, constants.R_OK);
        const selectedLanguage = await import(languagefile);
        res.send(selectedLanguage.default[lang].translation);

    } catch (error) {
        console.error(error.message);
        const languagefile = './languages/en-US.js'; // Fallback
        const selectedLanguage = await import('./languages/en-US.js');
        res.send(selectedLanguage.default);

    }
})


app.listen(port, () => {
    console.log(`Ract i18next TestServer App listening at http://localhost:${port}`)
})