var xhr = new XMLHttpRequest();
xhr.open('GET', '/orders.json', true);
xhr.onload = function() {
	alert(xhr.responseText);
};
xhr.send(null);