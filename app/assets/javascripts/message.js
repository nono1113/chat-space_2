$(document).on("turbolinks:load", function () {
  function buildHTML(message) {
    image = (message.image) ? `<image class="lower-message__image" src= ${message.image}>` : " ";
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class= "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class= "upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class = "lower-message">
                    <p class = "lower-message__content" data-id=${message.id}>
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
        var html = buildHTML(data);
        var id = document.getElementById('new_message');
        id.reset();
        $('.messages').append(html);
        $('.form__submit').prop('disabled', false);
        $('.messages').animate({
          scrollTop: $('.messages')[0].scrollHeight
        }, 'fast');
      })

      .fail(function () {
        alert('error');
      })
    var reloadMessages = function () {
      lastMessage = $(".lower-message__content").filter(":last");
      last_message_id = lastMessage.attr('data-id')
      if (lastMessage.attr('data-id')) {
        $.ajax({
            url: 'api/messages',
            type: 'get',
            dataType: 'json',
            data: {
              id: last_message_id
            }
          })
          .done(function (messages) {
            if (messages.length !== 0) {
              messages.forEach(function (message) {
                var html = buildHTML(message);
                $('.messages').append(html)
              });
              $('.messages').animate({
                scrollTop: $('.messages')[0].scrollHeight
              }, 'fast');
            }
          })
          .fail(function () {
            alert('error');
          });
      }
    };
    setInterval(reloadMessages, 5000);
  });
});