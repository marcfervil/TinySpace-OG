

getRandomNum=function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


readFile=function (path){
	try {
		return fs.readFileSync(path).toString();
	}catch(err) {
    	return fs.readFileSync("WebContent/error.html").toString();
	}
}



parseCookies=function(request) {
    var list = {},
    rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}

