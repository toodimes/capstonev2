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
      setInfoVisible: function(exercise) {
        exercise.infoVisible = !exercise.infoVisible;
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
    },
    mounted: function() {
      $.get('/api/v1/exercises/' + this.exerciseID + '.json', function(result) {
        this.exercise = result;
      }.bind(this));
    },
    methods: {
      createNote: function() {
        var that = this;
        // var params = {note: this.newNote};
        $.ajax({
          url: "/api/v1/exercises/" + this.exerciseID + ".json",
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
          data: { deleteGif: true, gifID: image.image_id },
          type: 'PATCH',
          success: function(result) {
            that.exercise = result;
          }
        });
      },

    }
  });

  var app3 = new Vue({
    el: '#goal-app',
    data: {
      userID: window.location.pathname.match(/\d+/)[0],
      message: "",
      userInfo: [],
      newGoal: '',
    },
    mounted: function() {
      $.get('/api/v1/user_profiles/' + this.userID + '/goals.json', function(result) {
        this.userInfo = result;
      }.bind(this));
    },

    methods: {
      addGoal: function() {
        var that = this;
        var params = { name: this.newGoal, addGoal: true };
        $.post('/api/v1/user_profiles/' + this.userID + '/goals.json', params, function(result) {
          that.userInfo = result;
          that.newGoal = '';
        });
      },

      markCompleted: function(goal) {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/goals/' + goal.goal_id + '.json',
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
          data: { markDestroy: true },
          type: 'DELETE',
          success: function(result) {
            that.userInfo = result;
          }
        });
      },

    },
  });

  var app4 = new Vue({
    el: '#index-pp-app',
    data: {
      userID: window.location.pathname.match(/\d+/)[0],
      message: '',
      programPreps: [],
      newQuantity: '',
    },
    mounted: function() {
      $.get('/api/v1/user_profiles/' + this.userID + '/program_preps.json', function(result) {
        this.programPreps = result;
      }.bind(this));
    },

    methods: {
      toggleInfo: function(programPrep) {
        if (programPrep.updateVisible) {
          programPrep.updateVisible = false;
          programPrep.infoVisible = !programPrep.infoVisible;
        } else {
          programPrep.infoVisible = !programPrep.infoVisible;
        }
      },
      toggleUpdate: function(programPrep) {
        if (programPrep.infoVisible) {
          programPrep.infoVisible = false;
          programPrep.updateVisible = !programPrep.updateVisible;
        } else {
          programPrep.updateVisible = !programPrep.updateVisible;
        }
      },
      removeExercise: function(programPrep) {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/program_preps/' + programPrep.id + '.json',
          data: { markDestroy: true },
          type: 'DELETE',
          success: function(result) {
            that.programPreps = result;
          }
        });
      },
      updateQuantity: function(programPrep) {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/program_preps/' + programPrep.id + '.json',
          data: { updateQuantity: true, quantity: this.newQuantity },
          type: 'PATCH',
          success: function(result) {
            that.programPreps = result;
            that.newQuantity = '';
          }
        });
      },

    },
  });

  var app5 = new Vue({
    el: '#new-pp-app',
    data: {
      userID: window.location.pathname.match(/\d+/)[0],
      message: 'Hello worldly!',
      exercises: [],
      searchFilter: '',
      programPrepIDs: [],
    },
    mounted: function() {
      $.get('/api/v1/user_profiles/' + this.userID + '/program_preps/new.json', function(result) {
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
      addToProgram: function(exercise) {
        if (this.programPrepIDs.indexOf(exercise) === -1) {
          this.programPrepIDs.push(exercise.id);
        }
      },
      viewProgram: function() {
        // console.log(this.programPreps);
        var params = {
          program_prep_ids: this.programPrepIDs,
        };
        $.post('/api/v1/user_profiles/' + this.userID + '/program_preps.json', params, function(result) {
        });
        window.location.href = '/user_profiles/' + this.userID + '/program_preps';
        // console.log(params);
      },

    }
  });

});
