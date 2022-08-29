chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	if (request.action == 'lutim_done') {
		lutim_done(request.data);
	}
});
function lutim_done(data) {
	var btn = document.createElement('button');
	var elm = document.getElementsByTagName("body")[0];
	elm.appendChild(btn);
	btn.setAttribute('ttt', JSON.stringify(data));
	btn.setAttribute('onclick', "var data = JSON.parse(this.getAttribute('ttt'));$('.messages').append(buildMessage(data.success, data.msg));$('#del-'+data.msg.real_short).on('click', delImage);if (data.success) {if (data.msg.ext !== 'xcf') {addToShortHash(data.msg.short+'.'+data.msg.ext);}addItem(data.msg);}");
	btn.click();
	elm.removeChild(btn);
}
