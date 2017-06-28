/* global Vue */
/* global $ */
//All the vue code will be stored in this file
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
      $.get('/api/v1/exercises.json', function(result) {
        this.exercises = result;
      }.bind(this));
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
    }
  });

  var app2 = new Vue({
    el: "#edit-app",
    data: {
      exerciseID: window.location.pathname.match(/\d+/)[0],
      message: '',
      exercise: [],
      newNote: '',
      newImage: '',
      needsEquipment: false,
    },
    mounted: function() {
      $.get('/api/v1/exercises/' + this.exerciseID + '.json', function(result) {
        this.exercise = result;
      }.bind(this));
      console.log(this.exercise);
    },
  });
});