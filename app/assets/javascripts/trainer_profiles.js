/* global Vue */
/* global $ */

document.addEventListener("DOMContentLoaded", function(event) {
  var app12 = new Vue({
    el: '#edit-trainer-profile-app',
    data: {
      trainerID: window.location.pathname.match(/\d+/)[0],
      message: "Let's get some trainer information",
      newName: '',
      newGender: '',
      newBio: '',
      newAvatar: '',
      newExperienceStartDate: '',
      newExperienceEndDate: '',
      newExperienceTitle: '',
      newExperienceCompany: '',
      newExperienceDescription: '',
      newQualificationName: '',
      editExperienceID: '',
      editExperienceIndex: '',
      experiences: [],
      qualifications: [],
      progress: '33%',
      showInformation: true,
      showExperience: false,
      editExperience: false,
      showQualifications: false,
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/trainer_profiles/")) {
        $.ajax({
          url: '/api/v1/trainer_profiles/' + that.trainerID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            that.newName = result.name;
            that.newGender = result.gender;
            that.newBio = result.bio;
            that.newAvatar = result.avatar;
            that.experiences = result.experiences;
            that.qualifications = result.qualifications;
          },
        });
      }
    },
    methods: {
      saveInfo: function() {
        var that = this;
        $.ajax({
          url: '/api/v1/trainer_profiles/' + that.trainerID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { updateProfile: true, name: that.newName, gender: that.newGender, bio: that.newBio, avatar: that.newAvatar },
          type: 'PATCH',
          success: function(result) {
            that.showInformation = false;
            that.showExperience = true;
            that.progress = '66%';
          }
        });
      },
      backToInformation: function() {
        var that = this;
        that.showExperience = false;
        that.showInformation = true;
        that.progress = '33%';
      },
      saveExperienceAddNew: function() {
        var that = this;
        if (that.newExperienceTitle !== '' || that.newExperienceDescription !== '' || that.newExperienceCompany !== '') {
          $.ajax({
            url: '/api/v1/trainer_profiles/' + that.trainerID + '/experiences.json',
            headers: { "Authorization": 'Token token=' + gon.api },
            data: {
              addExperience: true,
              start_date: that.newExperienceStartDate,
              end_date: that.newExperienceEndDate,
              title: that.newExperienceTitle,
              description: that.newExperienceDescription,
              company: that.newExperienceCompany,
            },
            type: 'POST',
            success: function(result) {
              that.experiences.push(result);
              that.newExperienceStartDate = '';
              that.newExperienceEndDate = '';
              that.newExperienceTitle = '';
              that.newExperienceCompany = '';
              that.newExperienceDescription = '';
            }
          });
        }
      },
      showEditExperience: function(experience) {
        var that = this;
        that.newExperienceStartDate = experience.start_date,
        that.newExperienceEndDate = experience.end_date,
        that.newExperienceTitle = experience.title,
        that.newExperienceCompany = experience.company,
        that.newExperienceDescription = experience.description,
        that.editExperienceID = experience.id,
        that.editExperienceIndex = that.experiences.indexOf(experience),
        that.progress = "66%";
        that.editExperience = true;
        that.showInformation = false;
        that.showExperience = false;
        that.showQualifications = false;
      },
      saveEditedExperienceAddNew: function() {
        var that = this;
        $.ajax({
          url: '/api/v1/trainer_profiles/' + that.trainerID + '/experiences/' + that.editExperienceID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { updateExperience: true, title: that.newExperienceTitle, description: that.newExperienceDescription, company: that.newExperienceCompany, start_date: that.newExperienceStartDate, end_date: that.newExperienceEndDate },
          type: 'PATCH',
          success: function(result) {
            that.experiences.splice(that.editExperienceIndex, 1);
            that.experiences[that.editExperienceIndex] = result;
          }
        });
      },
      saveEditedExperienceMoveOn: function() {
        var that = this;
        $.ajax({
          url: '/api/v1/trainer_profiles/' + that.trainerID + '/experiences/' + that.editExperienceID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          data: { updateExperience: true, title: that.newExperienceTitle, description: that.newExperienceDescription, company: that.newExperienceCompany, start_date: that.newExperienceStartDate, end_date: that.newExperienceEndDate },
          type: 'PATCH',
          success: function(result) {
            that.experiences.splice(that.editExperienceIndex, 1);
            that.experiences[that.editExperienceIndex] = result;
            that.editExperience = false;
            that.showQualifications = true;
            if (that.qualifications.length < 1) {
              that.progress = "90%";
            } else {
              that.progress = "100%";
            }
          }
        });
      },
      saveExperienceMoveOn: function() {
        var that = this;
        if (that.newExperienceTitle !== '' || that.newExperienceDescription !== '' || that.newExperienceCompany !== '') {
          $.ajax({
            url: '/api/v1/trainer_profiles/' + that.trainerID + '/experiences.json',
            headers: { "Authorization": 'Token token=' + gon.api },
            data: {
              addExperience: true,
              start_date: that.newExperienceStartDate,
              end_date: that.newExperienceEndDate,
              title: that.newExperienceTitle,
              description: that.newExperienceDescription,
              company: that.newExperienceCompany,
            },
            type: 'POST',
            success: function(result) {
              that.experiences.push(result);
              that.newExperienceStartDate = '';
              that.newExperienceEndDate = '';
              that.newExperienceTitle = '';
              that.newExperienceCompany = '';
              that.newExperienceDescription = '';
              that.showExperience = false;
              that.showQualifications = true;
              if (that.qualifications.length < 1) {
                that.progress = "90%";
              } else {
                that.progress = "100%";
              }
            }
          });
        } else {
          that.showExperience = false;
          that.showQualifications = true;
          if (that.qualifications.length < 1) {
            that.progress = "90%";
          } else {
            that.progress = "100%";
          }
        }
      },
      removeExperience: function(experience) {
        var that = this;
        var index = that.experiences.indexOf(experience);
        $.ajax({
          url: '/api/v1/trainer_profiles/' + that.trainerID + '/experiences/' + experience.id + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'DELETE',
          success: function(result) {
            that.experiences.splice(index, 1);
          }
        });
      },
      backToExperience: function() {
        var that = this;
        that.progress = '66%';
        that.showQualifications = false;
        that.showExperience = true;
      },
      saveQualificationAddNew: function() {
        var that = this;
        if (that.newQualificationName !== '') {
          $.ajax({
            url: '/api/v1/trainer_profiles/' + that.trainerID + '.json',
            headers: { "Authorization": 'Token token=' + gon.api }, 
            data: { addQualification: true, name: that.newQualificationName },
            type: 'PATCH',
            success: function(result) {
              that.qualifications.push(result);
              that.newQualificationName = '';
              that.progress = "100%";
            }
          });
        }
      },
      saveQualificationMoveOn: function() {
        var that = this;
        if (that.newQualificationName !== '') {
          $.ajax({
            url: '/api/v1/trainer_profiles/' + that.trainerID + '.json',
            headers: { "Authorization": 'Token token=' + gon.api }, 
            data: { addQualification: true, name: that.newQualificationName },
            type: 'PATCH',
            success: function(result) {
              that.qualifications.push(result);
              window.location.href = "/trainer_profiles/" + that.trainerID;
            }
          });
        } else {
          window.location.href = "/trainer_profiles/" + that.trainerID;
        }
      },
      removeQualification: function(qualification) {
        var that = this;
        var index = that.qualifications.indexOf(qualification);
        $.ajax({
          url: '/api/v1/trainer_profiles/' + that.trainerID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api }, 
          data: { destroyQualification: true, qualification_id: qualification.id },
          type: 'PATCH',
          success: function(result) {
            that.qualifications.splice(index, 1);
          }
        });
      },
    },
  });

  var TrainerShowApp = new Vue({
    el: '#show-trainer-app',
    data: {
      message: '',
      userID: window.location.pathname.match(/\d+/)[0],
      trainer: [],
    },
    mounted: function() {
      var that = this;
      if (window.location.pathname.includes("/trainer_profiles/")) {
        $.ajax({
          url: '/api/v1/trainer_profiles/' + that.userID + '.json',
          headers: { "Authorization": 'Token token=' + gon.api },
          type: 'GET',
          success: function(result) {
            that.trainer = result;
          },
        });
      }
    },
  });

});
