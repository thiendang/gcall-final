//IP location
$.getJSON('https://ipinfo.io/geo', function(response) {
    if (response.country == 'VN') {
        window.location.href = '/vn';
    }
    else {
    	window.location.href = '/en';
    }
    console.log(response.ip);
});
