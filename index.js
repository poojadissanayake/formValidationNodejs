const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const { title } = require('process');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configuring express to use body-parser
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.render('index', { title: 'Ice cream Review' });
});

app.post('/feedback', (req, res, next) => {
    let name = req.body.name;
    let favourite = req.body.icecreamtype;
    let rating = req.body.rating;
    let feedback = req.body.feedback;

    if (!name && !favourite && !rating && !feedback) {
        return res.render('customError', {
            title: 'Error',
            missing: 'All the fields',
            errorDesc: 'All fields are required'
        });
    }

    if (!name) {
        return res.render('customError', {
            title: 'Error',
            missing: 'name',
            errorDesc: 'name'
        });
    }
    if (!favourite) {
        return res.render('customError', {
            title: 'Error',
            missing: 'Ice cream type',
            errorDesc: 'Ice cream type'
        });
    }
    if (!rating) {
        return res.render('customError', {
            title: 'Error',
            missing: 'Score',
            errorDesc: 'Score'
        });
    }
    if (!feedback) {
        return res.render('customError', {
            title: 'Error',
            missing: 'Feedback',
            errorDesc: 'Feedback'
        });
    }
    if (isNaN(rating) || rating < 1 || rating > 5) {
        return res.render('customError', {
            title: 'Error',
            missing: 'something',
            errorDesc: 'Rating must be a number between 1 and 5'
        });
    }

    if (rating > 2) {
        res.render('thankyou', {
            title: 'Ice Cream Review',
            name,
            favourite,
            rating,
            feedback,
            face: '😄', //smiley only unicode is working
            message: 'Fantastic! This is wonderful you liked the ' + favourite + ' ice cream.',
            style: 'text-success'
        });
    }
    if (rating <= 2) {
        res.render('thankyou', {
            title: 'Ice Cream Review',
            name,
            favourite,
            rating,
            feedback,
            face: '🥲',
            message: 'We are sorry you did\'t like the ' + favourite + ' ice cream',
            style: 'text-danger'
        });
    }


});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
