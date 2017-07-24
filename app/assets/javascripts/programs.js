/* global Vue */
/* global $ */
document.addEventListener("DOMContentLoaded", function(event) {   
  var NewExerciseApp = new Vue({
    el: '#new-exercise-app',
    data: {
      message: 'New Exercise',
      exercise: [],
      exercisePreview: false,
      descriptions: [],
      exerciseImages: [],
      progress: '33%',
      newExerciseName: '',
      newExerciseMuscle: '',
      newExerciseEquipment: false,
      newExerciseImage: '',
      newExerciseDescription: '',
      showInformation: true,
      showExerciseImages: false,
      showDescriptions: false,
      disableBackToInformation: false,
      // disableBackToDescription: false,
      muscles: [],
    },
    methods: {
      saveInfo: function() {
        var that = this;
        $.ajax({
          url: '/api/v1/exercises.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { createExercise: true, name: that.newExerciseName, muscle_id: that.newExerciseMuscle, equipment: that.newExerciseEquipment },
          type: 'POST',
          success: function(result) {
            that.exercise = result;
            that.exerciseImages = result.images;
            that.descriptions = result.descriptions;
            that.showInformation = false;
            that.showDescriptions = true;
            that.disableBackToInformation = true;
            that.exercisePreview = true;
            that.progress = '66%';
          }
        });
      },
      backToInformation: function() {
        var that = this;
        that.showDescriptions = false;
        that.showInformation = true;
        that.progress = '33%';
      },
      moveOn: function() {
        var that = this;
        //ADD CODE BELOW
        //ADD CODE BELOW
        that.showDescriptions = false;
        that.showExerciseImages = true;
        that.progress = '100%';
      },
      backToDescriptions: function() {
        var that = this;
        that.showExerciseImages = false;
        that.showDescriptions = true;
        that.progress = '66%';
      },
      createNote: function() {
        var that = this;
        console.log(that.exercise);
        $.ajax({
          url: "/api/v1/exercises/" + that.exercise.id + ".json",
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { note: that.newExerciseDescription, createNote: true },
          type: 'PATCH',
          success: function(result) {
            console.log(result);
            that.descriptions.push(result);
            that.newExerciseDescription = '';
          }
        });
      },
      createGif: function() {
        var that = this;
        $.ajax({
          url: "/api/v1/exercises/" + that.exercise.id + ".json",
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { url: that.newExerciseImage, createImage: true },
          type: 'PATCH',
          success: function(result) {
            that.exerciseImages.push(result);
            that.newExerciseImage = '';
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
    },    
  });
});
