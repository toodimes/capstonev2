/* global Vue */
/* global $ */
document.addEventListener("DOMContentLoaded", function(event) {
  var UserProfileShowApp = new Vue({
    el: '#user-profile-show-app',
    data: {
      userID: window.location.pathname.match(/\d+/)[0],
      user: [],
      message: "Add A New Goal",
      newGoal: '',
      newGoalForm: false,
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/user_profiles/")) {
        $.ajax({
          url: '/api/v1/user_profiles/' + that.userID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            that.user = result;
          }
        });
      }
    },
    methods: {
      toggleComplete: function(goal) {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + that.userID + '/goals/' + goal.id + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { markComplete: true },
          type: 'PATCH',
          success: function(result) {
            that.userInfo = result;
          }
        });
        goal.completed = !goal.completed;
      },
      removeGoal: function(goal) {
        var that = this;
        var index = that.user.goals.indexOf(goal);
        $.ajax({
          url: '/api/v1/user_profiles/' + that.userID + '/goals/' + goal.id + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { markDestroy: true },
          type: 'DELETE',
          success: function(result) {
            that.user.goals.splice(index, 1);
          }
        });
      },
      showNewGoalForm: function() {
        var that = this;
        if (that.message === "Add A New Goal") {
          that.newGoalForm = true;
          that.message = "Hide Form";
        } else {
          that.newGoalForm = false;
          that.message = "Add A New Goal";
        }
      },
      submitNewGoal: function() {
        var that = this;
        if (that.newGoal !== '') {
          $.ajax({
            url: '/api/v1/user_profiles/' + that.userID + '/goals.json',
            headers: { "Authorization": 'Token token=' + gon.api },
            data: { name: this.newGoal, addGoal: true },
            type: 'POST',
            success: function(result) {
              that.user.goals.unshift(result);
              that.newGoal = '';
            }
          });
        }
      },

    },
  });

  var UserProfileEditApp = new Vue({
    el: '#edit-user-profile-app',
    data: {
      userID: window.location.pathname.match(/\d+/)[0],
      newName: '',
      progress: '50%',
      newGender: '',
      newAvatar: '',
      newGoal: '',
      goals: [],
      newEquipment: false,
      showInformation: true,
      showGoals: false,
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/user_profiles/") && window.location.pathname.includes("/edit")) {
        $.ajax({
          url: '/api/v1/user_profiles/' + that.userID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            that.newName = result.name;
            that.newGender = result.gender;
            that.newEquipment = result.equipment;
            that.goals = result.goals;
            that.newAvatar = result.avatar;
          }
        });
      }
    },
    methods: {
      saveInfo: function() {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + that.userID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: {updateProfile: true, name: that.newName, gender: that.newGender, equipment: that.newEquipment, avatar: that.newAvatar},
          type: 'PATCH',
          success: function(result) {
            console.log(result);
            that.showInformation = false;
            that.showGoals = true; 
            if (that.goals.length < 1) {
              that.progress = '90%';
            } else {
              that.progress = '100%';      
            }
          }
        });
      },
      backToInformation: function() {
        var that = this;
        that.showInformation = true;
        that.showGoals = false;
        that.progress = '50%';
      },
      toggleComplete: function(goal) {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + that.userID + '/goals/' + goal.id + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { markComplete: true },
          type: 'PATCH',
          success: function(result) {
            that.userInfo = result;
          }
        });
        goal.completed = !goal.completed;
      },
      removeGoal: function(goal) {
        var that = this;
        var index = that.goals.indexOf(goal);
        $.ajax({
          url: '/api/v1/user_profiles/' + that.userID + '/goals/' + goal.id + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { markDestroy: true },
          type: 'DELETE',
          success: function(result) {
            that.goals.splice(index, 1);
          }
        });
      },
      submitNewGoal: function() {
        var that = this;
        if (that.newGoal !== '') {
          $.ajax({
            url: '/api/v1/user_profiles/' + that.userID + '/goals.json',
            headers: { "Authorization": 'Token token=' + gon.api },
            data: { name: that.newGoal, addGoal: true },
            type: 'POST',
            success: function(result) {
              that.goals.unshift(result);
              that.newGoal = '';
            }
          });
        }
      },
      submitAndMoveOn: function() {
        var that = this;
        if (that.newGoal !== '') {
          $.ajax({
            url: '/api/v1/user_profiles/' + that.userID + '/goals.json',
            headers: { "Authorization": 'Token token=' + gon.api },
            data: { name: that.newGoal, addGoal: true },
            type: 'POST',
            success: function(result) {
              window.location.href = "/user_profiles" + that.userID;
            }
          });
        } else {
          window.location.href = "/user_profiles/" + that.userID;
        }
      },
    },
  });
  
});
