/******************************************************************************
								[MODULOS]
******************************************************************************/
let express 		= require('express');
let app 				= express();
let bodyParser 	= require('body-parser');

/******************************************************************************
								[CONFIGURACIÓN]
******************************************************************************/

// Configuración de middlewares
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
// app.use(require('cors')({
// 	credentials : true,
// 	origin : 'http://localhost:3000'
// }));

// Configuraciones Adicionales
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