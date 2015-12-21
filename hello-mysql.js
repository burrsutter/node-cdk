var http = require('http');
var mysql = require('mysql');

var connectionObject = {}

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // running outside of Openshift, no env vars, connect to localhost
	if (process.env.MYSQL_SERVICE_HOST !== undefined) {
      // if (process.env.MYSQL_SERVICE_PORT !== undefined) {
      //   connectionObject["host"] = process.env.MYSQL_SERVICE_HOST + ':' + process.env.MYSQL_SERVICE_PORT;
      // } else {
		connectionObject["host"] = process.env.MYSQL_SERVICE_HOST;
      // }
	} else {  
    	connectionObject["host"] = '127.0.0.1'	
	}

    if (process.env.MYSQL_USER !== undefined) {
	  connectionObject["user"] = process.env.MYSQL_USER;
    } else {
	  connectionObject["user"] = 'root';
    }

    if (process.env.MYSQL_PASSWORD !== undefined) {
	  connectionObject["password"] = process.env.MYSQL_PASSWORD;
    } else {
	  connectionObject["password"] = 'password';
    }

    if (process.env.MYSQL_DATABASE !== undefined) {
	  connectionObject["database"] = process.env.MYSQL_DATABASE;
    } else {
	  connectionObject["database"] = 'sampledb';
    }


    res.write('Hello, Red Hat Developers World! ' + Date.now() + '\n');
    res.write('POD: ' + process.env.HOSTNAME + '\n');
    res.write('MYSQL_SERVICE_HOST: ' + connectionObject.host + '\n');
    res.write('MYSQL_DATABASE: ' + connectionObject.database + '\n');
    res.write('MYSQL_USER: ' + connectionObject.user + '\n');
    res.write('MYSQL_PASSWORD: ' + connectionObject.password + '\n');
    res.write('--------------------------------\n');
	res.write('Making Connection: \n');
    connection = mysql.createConnection(connectionObject);
    connection.connect();
    connection.query('select table_name from information_schema.tables',[], function(err,rows,fields) {
	   if (err) {
		res.end('Error: ' + err.stack + '\n');
	   } else {
		res.write('Tables in: ' + connectionObject.database + '\n');	
		for (i = 0; i < rows.length; i++) {
			res.write(rows[i].table_name + '\n');
		}
	    res.write('--------------------------------\n');
	    res.end();
	   }
    });


}).listen(8000, '0.0.0.0');
console.log('Server running at http://{IP_ADDRESS_VM}:8000/');
