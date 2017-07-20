/* global Vue */
/* global $ */
document.addEventListener("DOMContentLoaded", function(event) { 
  var ExerciseIndexApp = new Vue({
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


  var EditExerciseApp = new Vue({
    el: "#edit-exercise-app",
    data: {
      exerciseID: window.location.pathname.match(/\d+/)[0],
      currentUserName: gon.currentUser,
      message: '',
      progress: '33%',
      showInformation: true,
      showDescriptions: false,
      showExerciseImages: false,
      exercise: [],
      descriptions: [],
      exerciseImages: [],
      newNote: '',
      newImage: '',
      exerciseName: '',
      exerciseMuscle: '',
      exerciseEquipment: false,
      muscles: [],
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
            that.descriptions = result.descriptions;
            that.exerciseName = result.name;
            that.exerciseMuscle = result.muscle;
            that.exerciseImages = result.images;
            that.exerciseEquipment = result.equipment;
            that.muscles = result.muscles;
          }
        });
      }
    },
    methods: {
      gifMoveOn: function() {
        window.location.href = "/exercises/" + this.exerciseID;
      },
      moveOn: function() {
        var that = this;
        that.showDescriptions = false;
        that.showInformation = false;
        that.showExerciseImages = true;
        that.progress = "100%";
      },
      backToDescriptions: function() {
        var that = this;
        that.showDescriptions = true;
        that.showInformation = false;
        that.showExerciseImages = false;
        that.progress = "66%";
      },
      saveInfo: function() {
        var that = this;
        if (that.exerciseName !== that.exercise.name || that.exerciseMuscle !== that.exercise.muscle.id || that.exerciseEquipment !== that.exercise.equipment) {
          $.ajax({
            url: '/api/v1/exercises/' + that.exerciseID + '.json',
            headers: { "Authorization": 'Token token=' + gon.api },
            data: { updateInfo: true, name: that.exerciseName, muscle_id: that.exerciseMuscle, equipment: that.exerciseEquipment },
            type: 'PATCH',
            success: function(result) {
              that.showInformation = false;
              that.showDescriptions = true;
              that.progress = "66%";
            }
          });
        } else {
          that.showInformation = false;
          that.showDescriptions = true;
          that.progress = "66%";
        }
      },
      backToInformation: function() {
        var that = this;
        //ADD CODE
        that.showInformation = true;
        that.showDescriptions = false;
        that.progress = "33%";
      },
      createNote: function() {
        var that = this;
        $.ajax({
          url: "/api/v1/exercises/" + that.exerciseID + ".json",
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { note: that.newNote, createNote: true },
          type: 'PATCH',
          success: function(result) {
            console.log(result);
            that.descriptions.push(result);
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
            that.exerciseImages.push(result);
            that.newImage = '';
          }
        });
      },

      removeNote: function(description) {
        var that = this;
        var index = that.descriptions.indexOf(description);
        $.ajax({
          url: "/api/v1/exercises/" + this.exerciseID + ".json",
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { deleteNote: true, noteID: description.id },
          type: 'PATCH',
          success: function(result) {
            that.descriptions.splice(index, 1);
          }
        });
      },

      removeGif: function(gif) {
        var that = this;
        var index = that.exerciseImages.indexOf(gif);
        $.ajax({
          url: "/api/v1/exercises/" + that.exerciseID + ".json",
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { deleteGif: true, gifID: gif.id },
          type: 'PATCH',
          success: function(result) {
            that.exerciseImages.splice(index, 1);
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