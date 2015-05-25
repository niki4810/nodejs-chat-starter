// public/js/index.js
let io = require('socket.io-client')
let socket = io('http://127.0.0.1:8000')
let $ = require('jquery')
let $template = $('#template')

// ESNext in the browser!!!
socket.on('connect', ()=>console.log('connected'))

// Enable the form now that our code has loaded
$('#send').removeAttr('disabled')

// Emit a starter message and log it when the server echoes back
socket.on('im', ({username, msg}) => {
	let $li = $template.clone().show()
	$li.children('i').text(username+': ')
    $li.children('span').text(msg)
    $('#messages').append($li)
})

$('form').submit(() => {
    socket.emit('im', $('#m').val())
    $('#m').val('')
    return false
})

// socket.emit('im', 'hello world!')