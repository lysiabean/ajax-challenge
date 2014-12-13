"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
    var submit = document.getElementById("comments");
    submit.addEventListener('submit', onSubmit);
}

function validateForm(form) {
    var requiredFields = ['name', 'title', 'comment'];
    var idx;
    var valid = true;
    for(idx = 0; idx < requiredFields.length; idx++) {
        valid &= validateRequiredField(requiredFields[idx], form);
    }

    return valid;

}

function validateRequiredField(field, form) {
    if(0 == form[field].value.trim().length ) {
            console.log("invalid.");
            form[field].className = 'form-control invalid';
            return false;
        } else {
            form[field].className = 'form-control';
            return true;
        }
}

function onSubmit(evt) {
    var valid = validateForm(this);
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}

var commentsUrl = 'https://api.parse.com/1/classes/comments';
 /*
$(document).ready(function() {
    $("#comments").submit(function(e) {
        e.preventDefault();
        saveQuote();
    })
})

function saveQuote() {
    var Quote = Parse.Object.extend("Quote");
    var quote = new Quote();

    var name = $("#name").val();
    var title = $("#title").val();
    var comment = $("#comment").val();

    quote.set("name", name);
    quote.set("title", title);
    quote.set("comment", comment);
    quote.save(null, {
        success: function() {
            console.log("Saved!");
        },
        error: function(name, title, comment, error) {
            console.log(error.message);
        }
    })
}
*/

angular.module('myModule', ['ui.bootstrap'])
     .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'MNyNVz14bfkvXel9tpWWf8WmJkMdkJmQEQpfvFRX';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'QGkzHVnc7ZukbRWbaYBQeHDhltHPHNUCzADO9KwA';
    })
     
    .controller('RatingCtrl', function ($scope) {
        $scope.rate = 0;
        $scope.max = 5;
        $scope.isReadonly = false;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];
    }
    
	.controller('commentController', function($scope, $http){

         $scope.newName = {done: false};
         $scope.newTitle = {done: false};
         $scope.newComment = {done: false};
        //function to add a new task to the list
        $scope.addComment = function(name, title, comment) {
             // POST will add (insert) anew item to the class
            $http.post('http://api.parse.com/1/classes/comments', name, title, comment)
                .success(function(responseData) {
                    //Parse.com will return the new objectID in the response data
                    // copy that to the task we just inserted
                    name.objectId = responseData.objectId;
                    title.objectId = responseData.objectId;
                    comment.objectId = responseData.objectId;
                    //add task to our task list
                    $scope.comments.push(task);
                    //reset the newTask to clear the form
                    $scope.newName = {done: false};
                    $scope.newTitle = {done: false};
                    $scope.newComment = {done: false};
                })
        };  


         $scope.newTask = {done: false};
        //function to add a new task to the list
        $scope.addComment = function(comment) {
             // POST will add (insert) anew item to the class
            $http.post('http://api.parse.com/1/classes/comments', comment)
                .success(function(responseData) {
                    //Parse.com will return the new objectID in the response data
                    // copy that to the task we just inserted
                    comment.objectId = responseData.objectId;
                    //add task to our task list
                    $scope.comments.push(task);
                    //reset the newTask to clear the form
                    $scope.newComment = {done: false};
                });
        };

    });
});

