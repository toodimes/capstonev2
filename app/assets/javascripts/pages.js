/* global Vue */
/* global $ */
/* Latest app is 8 in messages */
//All the vue code will be stored in this file
document.addEventListener("DOMContentLoaded", function(event) {
  var app3 = new Vue({
    el: '#goal-app',
    data: {
      currentUserName: gon.currentUser,
      userID: window.location.pathname.match(/\d+/)[0],
      message: "",
      userInfo: [],
      newGoal: '',
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/goals/")) {
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/goals.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            that.userInfo = result;
          }
        });
      }
    },

    methods: {
      addGoal: function() {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/goals.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { name: this.newGoal, addGoal: true },
          type: 'POST',
          success: function(result) {
            that.userInfo = result;
            that.newGoal = '';
          }
        });
      },

      markCompleted: function(goal) {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/goals/' + goal.goal_id + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { markComplete: true },
          type: 'PATCH',
          success: function(result) {
            that.userInfo = result;
          }
        });
      },
      markIncomplete: function(goal) {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/goals/' + goal.goal_id + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { markIncomplete: true },
          type: 'PATCH',
          success: function(result) {
            that.userInfo = result;
          }
        });
      },
      removeGoal: function(goal) {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/goals/' + goal.goal_id + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { markDestroy: true },
          type: 'DELETE',
          success: function(result) {
            that.userInfo = result;
          }
        });
      },

    },
  });

  var app6 = new Vue({
    el: '#show-p-app',
    data: {
      currentUserName: gon.currentUser,
      userID: window.location.pathname.match(/\d+/)[0],
      programID: window.location.pathname.split("/").slice(-1)[0],
      message: 'Hello worlds!',
      program: [],
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/programs/")) {
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/programs/' + this.programID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            that.program = result;
          }
        });
      }
      // $.get('/api/v1/user_profiles/' + this.userID + '/programs/' + this.programID + '.json', function(result) {
      //   this.program = result;
      // }.bind(this));      
    },

  });

  var app7 = new Vue({
    el: '#index-p-app',
    data: {
      userID: window.location.pathname.match(/\d+/)[0],
      currentUserName: gon.currentUser,
      firstProgram: [],
      remainingPrograms: [],
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/programs/")) {
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/programs.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            that.remainingPrograms = result;
            that.firstProgram = result[0];
            that.remainingPrograms.splice(0, 1);
          }
        });
      }
    },
    methods: {
      goToProgram: function(program) {
        window.location.href = '/user_profiles/' + this.userID + '/programs/' + program.program_id;
      },
    },
  });

});
