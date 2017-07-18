/* global Vue */
/* global $ */
document.addEventListener("DOMContentLoaded", function(event) {

  var app10 = new Vue({
    el: '#messages-index-app2',
    data: {
      message: "",
      currentUserID: gon.currentUserID,
      trainers: [],
      users: [],
      messaging: [],
      newMessage: '',
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/messages/new")) {
        $.ajax({
          url: '/api/v1/messages/new.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            for (var i = 0; i < result.length; i++) {
              if (result[i].trainer) {
                that.trainers.push(result[i]);
              } else {
                that.users.push(result[i]);
              }
            }
          }
        });
      }
    },
    methods: {
      bringPopUpIn: function(recipient) {
        var that = this;
        that.messaging = recipient;
      },
      sendMessage: function() {
        var that = this;
        $.ajax({
          url: '/api/v1/messages.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { recipient_id: that.messaging.id, sender_id: that.currentUserID, content: that.newMessage},
          type: 'POST',
          success: function(result) {
            that.newMessage = '';
          }
        });
      },

    },
  });

  var app8 = new Vue({
    el: '#messages-index-app',
    data: {
      currentUserName: gon.currentUser,
      currentUserID: gon.currentUserID,
      allNames: [],
      unreadMessages: 0,
      messages: [],
      allMessages: [],
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/messages")) {
        $.ajax({
          url: '/api/v1/messages.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { current_user_id: that.currentUserID },
          type: 'GET',
          success: function(result) {
            that.messages = result;
            for (var i = 0; i < that.messages.length; i++) {
              if (that.messages[i].sender_name !== that.currentUserName && JSON.stringify(that.allNames).indexOf(that.messages[i].sender_name) === -1) {
                that.allNames.push([that.messages[i].sender_name, that.messages[i].sender_id, that.messages[i].sender_avatar]);
              }
            } 
            for (var j = 0; j < that.messages.length; j++) {
              if (that.messages[j].recipient_name !== that.currentUserName && JSON.stringify(that.allNames).indexOf(that.messages[j].recipient_name) === -1) {
                that.allNames.push([that.messages[j].recipient_name, that.messages[j].recipient_id, that.messages[j].recipient_avatar]);
              }
            }
          }
        });
      }
    },
    methods: {

    },
  });

  var app9 = new Vue({
    el: '#messages-show-app',
    data: {
      userID: window.location.pathname.match(/\d+/)[0],
      currentUserName: gon.currentUser,
      currentUserID: gon.currentUserID,
      currentUserAvatar: gon.currentUserAvatar,
      fellowUserName: '',
      fellowUserAvatar: '',
      fellowUserID: '',
      fellowUserTrainer: '',
      message: "Conversation between you and ",
      messages: [],
      newMessageContent: '',
      showNewForm: false,
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/messages/")) {  
        $.ajax({
          url: '/api/v1/messages/' + that.userID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { current_user_id: that.currentUserID },
          type: 'GET',
          success: function(result) {
            that.messages = result;
            for (var i = 0; i < that.messages.length; i++) {
              if (result[i].sender_name !== that.currentUserName) {
                that.fellowUserName = result[i].sender_name;
                that.fellowUserAvatar = result[i].sender_avatar;
                that.fellowUserID = result[i].sender_id;
                break;
              } else {
                that.fellowUserName = result[i].recipient_name;
                that.fellowUserAvatar = result[i].recipient_avatar;
                that.fellowUserID = result[i].recipient_id;
              }
            }
          }
        });
      }
    },
    methods: {
      sendNewMessage: function() {
        var that = this;
        if (that.newMessageContent !== '') {
          $.ajax({
            url: '/api/v1/messages.json',
            headers: { "Authorization": 'Token token=' + gon.api },
            data: { recipient_id: that.userID, sender_id: that.currentUserID, content: that.newMessageContent },
            type: 'POST',
            success: function(result) {
              that.messages.push(result);
              that.newMessageContent = '';
            }
          });
        }
      },
      removeMessage: function(message) {
        var that = this;
        var index = that.messages.indexOf(message);
        $.ajax({
          url: '/api/v1/messages/' + message.id + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { removeMessage: true, current_user: gon.currentUserID },
          type: 'DELETE',
          success: function(result) {
            that.messages.splice(index, 1);
          }
        });
      },
    },
  });
});
