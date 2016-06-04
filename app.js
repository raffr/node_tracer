var	Tracer
	,http = require('http')
	,MultipartParser = require('./MultipartParser.js');
Tracer = function(){
	this.server = http.createServer(requestHandler);
	this.server.listen(5003,'localhost');
};
​
var body = '', k = 0;
function requestHandler(req,res) {
		dataHandler = function(chunk) {
			body += chunk;
      k += 1;
		};
	req.on('data',dataHandler);
	req.once('end',function(){
	req.removeListener('data',dataHandler);
		if ( req.headers.hasOwnProperty('content-type') ) {
			var multipartData = new MultipartParser(req.headers['content-type'],body);
      var time = multipartData.parts.name.body;
        try {
          var data = multipartData.parts.trace.body;
          console.log(k + ' - '+ time);
          console.log('---------------------');
          console.log(data);
          console.log('---------------------');
          console.log('\n');
          console.log('\n');
        } catch (error) {
          console.log(k + ' - '+ time);
          console.log('---------------------');
          console.log('Empty data!');
          console.log('---------------------');
          console.log('\n');
          console.log('\n');
        }
        res.end();
		}
	});
}
​
new Tracer();