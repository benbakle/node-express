const bodyParser = require('body-parser');
const Account = require('./public/service/account');
const Transaction = require('./public/service/transaction');
const db = require('./public/data/db.json');

class Route {

    constructor(app, router) {
        this._app = app;
        this._router = router;
        this._api = {
            account: new Account(),
            transaction: new Transaction(),
        }

        this._app.set('view engine', 'pug');
        this._app.set('views', __dirname + '/public/views');

        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(bodyParser.json());
        this._app.use('/api', this._router);

        this._router.get(`/db`, (req, res) => {
            res.json(db);
        });
    }

    page(route, file, props, callback) {
        this._app.get(route, (req, res) => {
            res.render(file, props & props);
        });
        callback && callback();
    }

    api(route, method, isPost) {
        if (isPost)
            return this.post(route, method);
        this.get(route, method);
    }

    post(route, post) {
        return this._router.post(`/${route}s/add`, (req, res) => {
            this._api[`${route}`][post](req.body)
                .then(id => res.json(id))
                .catch(() => { console.log(`Error adding ${route}.`) })
        })
    }

    get(route, get) {
        return this._router.get(`/${route}s`, (req, res) => {
            this._api[`${route}`][get]()
                .then((data) => {
                    res.json(data);
                })
                .catch((e) => {
                    res.status(500, {
                        error: e
                    });
                });;
        });
    }
}

module.exports = Route;