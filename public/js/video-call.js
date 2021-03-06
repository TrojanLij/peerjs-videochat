/**
 * Created by rishabhkhanna on 05/12/16.
 */

/**
* Edited by TrojanLij on 30/10/2018.
*/

navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var peer = new Peer({host: location.hostname,
    port: location.port || (location.protocol === 'https:' ? 443 : 80),
    path: '/peer'
});
peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    $('#peer-id').html(id);
});
var erroCallback = function (e) {
    console.log("media rejected" , e);
};


function callPeer () {
    console.log("call");
    navigator.getUserMedia({ video:true},
        function (localMediaStream) {
            var dest = $('#dest-id').val();
            console.log(dest);
            var call =  peer.call(dest , localMediaStream);
            callback(call);
        } , erroCallback);
}

peer.on('call' , function (call) {
    navigator.getUserMedia({ video:true},
        function (localMediaStream) {
            call.answer(localMediaStream);
            callback(call);
        } , erroCallback);

});

function callback(call) {
    console.log("hi");
    console.log(call);
    call.on('stream' , function (stream) {
        console.log("below");
        var video = document.querySelector('video');
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        
        //video.src with window.URL.createObjectURL and a stream doesn't work with Firefox Nightly 65.0a1 (2018-10-29) (64-bit)
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
    })
}

