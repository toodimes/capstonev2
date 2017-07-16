/* global Vue */
/* global $ */
//All the vue code will be stored in this file
document.addEventListener("DOMContentLoaded", function(event) {

  var app4 = new Vue({
    el: '#index-pp-app',
    data: {
      userID: window.location.pathname.match(/\d+/)[0],
      currentUserName: gon.currentUser,
      message: '',
      programPreps: [],
      newQuantity: '',
      newNote: '',
    },
    mounted: function() {
      var that = this;
      $.ajax({
        url: '/api/v1/user_profiles/' + this.userID + '/program_preps.json',
        headers: { "Authorization": 'Token token=' + gon.api },
        type: 'GET',
        success: function(result) {
          that.programPreps = result;
        }
      });
      // $.get('/api/v1/user_profiles/' + this.userID + '/program_preps.json', function(result) {
      //   this.programPreps = result;
      // }.bind(this));
    },

    methods: {
      toggleNote: function(programPrep) {
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
          headers: { "Authorization": 'Token token=' + gon.api },
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
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { updateQuantity: true, quantity: this.newQuantity },
          type: 'PATCH',
          success: function(result) {
            that.programPreps = result;
            that.newQuantity = '';
          }
        });
      },
      updateNote: function(programPrep) {
        var that = this;
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/program_preps/' + programPrep.id + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { updateNote: true, note: this.newNote },
          type: 'PATCH',
          success: function(result) {
            that.programPreps = result;
            that.newNote = '';
          }
        });
      },
      createProgram: function() {
        // var params = { createProgram: true };
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/programs.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { createProgram: true, note: this.newNote },
          type: 'POST',
          success: function(result) {
            window.location.href = '/user_profiles/' + result.client_id + '/programs/' + result.program_id;
          }
        });
        // $.post('/api/v1/user_profiles/' + this.userID + '/programs.json', params, function(result) {
        //   window.location.href = '/user_profiles/' + result.client_id + '/programs/' + result.program_id;
        // });
      },

    },
  });

  var app5 = new Vue({
    el: '#new-pp-app',
    data: {
      userID: window.location.pathname.match(/\d+/)[0],
      currentUserName: gon.currentUser,
      message: 'Hello worldly!',
      exercises: [],
      searchFilter: '',
      programPrepIDs: [],
      programPrepNames: [],
    },
    mounted: function() {
      var that = this;
      $.ajax({
        url: '/api/v1/user_profiles/' + this.userID + '/program_preps/new.json',
        headers: { "Authorization": 'Token token=' + gon.api },
        type: 'GET',
        success: function(result) {
          that.exercises = result;
        }
      });
      $.ajax({
        url: '/api/v1/user_profiles/' + this.userID + '/program_preps.json',
        headers: { "Authorization": 'Token token=' + gon.api },
        type: 'GET',
        success: function(data) {
          for (var i = 0; i < data.length; i++) {
            that.programPrepIDs.push(data[i].exercise_id);
            that.programPrepNames.push(data[i].name);
          }
        }
      });
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
      toggleProgram: function(exercise) {
        if (this.programPrepIDs.indexOf(exercise.id) === -1) {
          this.programPrepIDs.push(exercise.id);
          this.programPrepNames.push(exercise.name);
        } else {
          var index = this.programPrepIDs.indexOf(exercise.id);
          var nameIndex = this.programPrepNames.indexOf(exercise.name);
          this.programPrepIDs.splice(index, 1);
          this.programPrepNames.splice(nameIndex, 1);
        }
      },
      viewProgram: function() {
        var params = {
          program_prep_ids: this.programPrepIDs,
        };
        $.ajax({
          url: '/api/v1/user_profiles/' + this.userID + '/program_preps.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: params,
          type: 'POST',
          success: function(result) {
          }
        });
        window.location.href = '/user_profiles/' + this.userID + '/program_preps';
        // $.post('/api/v1/user_profiles/' + this.userID + '/program_preps.json', params, function(result) {
        // });
        // window.location.href = '/user_profiles/' + this.userID + '/program_preps';
      },
      clearProgramPrepIDs: function() {
        if (confirm("Are you sure you would like to clear the program?") === true) {
          var that = this;
          $.ajax({
            url: '/api/v1/user_profiles/' + this.userID + '/program_preps/clear_all.json',
            headers: { "Authorization": 'Token token=' + gon.api },
            data: { removeExercises: true },
            type: 'PATCH',
            success: function(result) {
              that.programPreps = result;
              that.newNote = '';
              that.programPrepIDs = [];
              that.programPrepNames = [];
            }
          });
        }
      },


    }
  });
});