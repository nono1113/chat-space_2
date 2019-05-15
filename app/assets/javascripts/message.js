$(document).on("turbolinks:load", function () {
  function buildHTML(message) {
    image = (message.image) ? `<image class="lower-message__image" src= ${message.image}>` : " ";
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class= "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class= "upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class = "lower-message">
                    <p class = "lower-message__content">
                      ${message.content}
                    </p>
                    <div>
                      ${image}
                    </div>
                  </div>
                </div>`
    return html;
  }

  $('.msg_form').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.href;
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function (data) {
        // console.log(data)
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.form__message').val('');
        $('.form__submit').prop('disabled', false);
        $('.messages').animate({
          scrollTop: $('.messages')[0].scrollHeight
        }, 'fast');

      })

      .fail(function () {
        alert('error');
      })
  })
})