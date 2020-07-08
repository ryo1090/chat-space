$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html = 
      `<div class="messages-area">
        <div class="messages-area__name-date">
          <div class="messages-area__name-date__name">
            ${message.user_name}
          <div>
          <div class="messages-area__name-date__date">
            ${message.created_at}
          <div>
        <div>
        <div class="messages-area__comment">
          <p class="messages-area__comment__content">
            ${message.content}
          </p>
          <img class="message-area__comment__image" src="${message.image}">
        <div>
      <div>`
      return html;
    } else {
      let html =
      `<div class="messages-area">
        <div class="messages-area__name-date">
          <div class="messages-area__name-date__name">
            ${message.user_name}
          <div>
          <div class="messages-area__name-date__date">
            ${message.created_at}
          <div>
        <div>
        <div class="messages-area__comment">
          <p class="messages-area__comment__content">
            ${message.content}
          </p>
        <div>
      <div>`
      return html;
    };
  }

  $(".Form").on("submit", function(e) {
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.send-btn').prop('disabled', false);
    })
  });
});