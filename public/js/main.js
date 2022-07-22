const socket = io(window.location.href)

socket.on(`${fingerprintId}`, function (msg) {
  $('#textOutput').append(`${msg}\n`)
})

function formSubmit() {
  $.ajax({
    url: '/',
    type: 'POST',
    data: {
      fingerprint: fingerprintId,
    },
    success: function (data) { }
  })
}