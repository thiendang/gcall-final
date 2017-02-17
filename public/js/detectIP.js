//IP location
$.getJSON('https://ipinfo.io/geo', function(response) {
    if (response.country == 'VN') {
        window.location.href = '/vn';
    }
});
