/******************************************************************************
								[MODULOS]
******************************************************************************/
let express 	= require('express');
let app 	= express();
let bodyParser 	= require('body-parser');
let helmet 	= require('helmet');

/******************************************************************************
								[CONFIGURACIÓN]
******************************************************************************/
// Configuración de middlewares
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(require('cors')({
	credentials : true,
	origin : '*'
}));

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});


// Configuraciones Adicionales
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
app.set('appName', 'Backend_Semillero');
app.set('version', '1.0');
app.set('port', process.env.PORT || 8000);
app.set('env', 'development');
app.disable('x-powered-by');

// Router API
require('./router/router.js')(app);

// Error Handler
app.use((err, req, res, next)=>{
	res.status(err.status || 500);
	res.json({
		message : err.message,
		err 	: req.app.get('env') === 'development' ? err : {}
	})
})

/******************************************************************************
							[SERVIDOR HTTP]
******************************************************************************/
var server = app.listen(app.get('port'), ()=> {
	console.log('[BACKEND]: Server listening on port [%d]', app.get('port'));
});
