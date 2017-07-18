/* global Vue */
/* global $ */
document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      exercises: [],
      searchFilter: '',
      isActive: false,
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/exercises")) {
        $.ajax({
          url: '/api/v1/exercises.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            that.exercises = result;
          }
        });
      }
    },
    methods: {
      isSetMuscle: function(exercise) {
        if (exercise.muscle.toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1 || exercise.name.toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1) {
          return true;
        } else {
          return false;
        }
      },
      setFilter: function(search) {
        this.searchFilter = search;
      },
      setInfoVisible: function(exercise) {
        exercise.infoVisible = !exercise.infoVisible;
      },
    }
  });

  var app2 = new Vue({
    el: "#edit-exercise-app",
    data: {
      exerciseID: window.location.pathname.match(/\d+/)[0],
      currentUserName: gon.currentUser,
      message: '',
      exercise: [],
      newNote: '',
      newImage: '',
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/exercises/")) {
        $.ajax({
          url: '/api/v1/exercises/' + this.exerciseID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            that.exercise = result;
          }
        });
      }
    },
    methods: {
      createNote: function() {
        var that = this;
        // var params = {note: this.newNote};
        $.ajax({
          url: "/api/v1/exercises/" + this.exerciseID + ".json",
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { note: this.newNote, createNote: true },
          type: 'PATCH',
          success: function(result) {
            that.exercise = result;
            that.newNote = '';
          }
        });
      },

      createGif: function() {
        var that = this;
        $.ajax({
          url: "/api/v1/exercises/" + this.exerciseID + ".json",
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { url: this.newImage, createImage: true },
          type: 'PATCH',
          success: function(result) {
            that.exercise = result;
            that.newImage = '';
          }
        });
      },

      removeNote: function(description) {
        var that = this;
        $.ajax({
          url: "/api/v1/exercises/" + this.exerciseID + ".json",
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { deleteNote: true, noteID: description.note_id },
          type: 'PATCH',
          success: function(result) {
            that.exercise = result;
          }
        });
      },

      removeGif: function(image) {
        var that = this;
        $.ajax({
          url: "/api/v1/exercises/" + this.exerciseID + ".json",
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { deleteGif: true, gifID: image.image_id },
          type: 'PATCH',
          success: function(result) {
            that.exercise = result;
          }
        });
      },

    }
  });

  var app11 = new Vue({
    el: '#show-exercise-app',
    data: {
      exerciseID: window.location.pathname.match(/\d+/)[0],
      message: 'Hello Show Message',
      exercise: [],
      firstGif: '',
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/exercises/")) {
        $.ajax({
          url: '/api/v1/exercises/' + this.exerciseID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            that.exercise = result;
            that.firstGif = that.exercise.images[0].url;
          }
        });
      }
    },
  });

});