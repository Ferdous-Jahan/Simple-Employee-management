var db = require('./connection');

exports.viewProduct = function (req, res) {
    if (req.session.loggedin) {
        db.query(`SELECT * FROM products`, function (error, results, fields) {
            if (error) throw error;
            res.render('employee/home', { products: results });
        })
    }
    else {
        res.redirect('/auth');
    }
}

exports.viewSingleProduct = function(req, res){
    if (req.session.loggedin) {
        db.query(`SELECT * FROM products WHERE id=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            res.render('employee/edit', { products: results });
        })
    }
    else
        res.redirect('/auth');
}

exports.editSingleProduct= function (req, res) {
    if (req.session.loggedin) {
        db.query(`UPDATE products SET productName='${req.body.productName}', quantity=${req.body.quantity}, price=${req.body.price} WHERE id=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            res.redirect('/employee');
        })
    }

    else
        res.redirect('/auth');
}

exports.deleteSingleProduct = function (req, res) {
    if (req.session.loggedin) {
        db.query(`DELETE FROM products WHERE id=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            res.redirect('/employee');
        })
    }
    else {
        res.redirect('/auth');
    }
}

exports.viewAdd = function (req, res) {
    if (req.session.loggedin) {
        res.render('employee/add');
    }
    else
        res.redirect('/auth');
}

exports.add = function (req, res) {
    if (req.session.loggedin) {
        db.query(`INSERT INTO products( productName, quantity, price) VALUES ('${req.body.productName}',${req.body.quantity},${req.body.price})`, function (error, results, fields) {
            if (error) throw error;
            res.redirect('/employee')
        })
    }
    else
    res.redirect('/auth');
}
