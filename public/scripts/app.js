console.log("Sanity Check: JS is working!");
var template;
var $teamsList;
var allTeams = [];

$(document).ready(function(){

  $teamsList = $('#teamTarget');

  var source = $('#teams-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/teams',
    success: onSuccess,
    error: onError
  });

  $('#newTeamForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/teams',
      data: $(this).serializeArray(),
      success: newTeamSuccess,
      error: newTeamError
    });
  });

  $teamsList.on('submit', '.updateBtn', function(e) {
    e.preventDefault();
      $.ajax({
        type: 'PUT',
        url: '/api/teams/'+$(this).attr('data-id'),
        data: $(this).serialize(),
        success: updateTeamSuccess,
        error: updateTeamError
      });
    });

  $teamsList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/teams/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/teams/'+$(this).attr('data-id'),
      success: deleteTeamSuccess,
      error: deleteTeamError
    });
  });

  $teamsList.on('submit', '#addPlayerForm', function(e) {
    e.preventDefault();
    console.log('new players');
    $.ajax({
      method: 'POST',
      url: '/api/teams/'+$(this).attr('data-id')+'/players',
      data: $(this).serializeArray(),
      success: newPlayerSuccess,
      error: newPlayerError
    });
  });
});
function render () {
  $teamsList.empty();
  var teamsHtml = template({ teams: allTeams });
  $teamsList.append(teamsHtml);
}

function onSuccess(json) {
  allTeams = json;
  render();
}

function onError(e) {
  console.log('uh oh');
  $('#teamTarget').text('Failed to load teams, is the server working?');
}

function newTeamSuccess(json) {
  $('#newTeamForm input').val('');
  allTeams.push(json);
  render();
}

function newTeamError() {
  console.log('Failed to create team!');
}

function updateTeamSuccess(json) {
  var team = json;
  console.log(json);
  var teamId = team._id;
  console.log('update team', teamId);
    allTeams.splice(allTeams.indexOf(teamId), 1, team);

  render();

}

function deleteTeamSuccess(json) {
  var team = json;
  console.log(json);
  var teamId = team._id;
  console.log('delete team', teamId);
  for(var index = 0; index < allTeams.length; index++) {
    if(allTeams[index]._id === teamId) {
      allTeams.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteTeamError() {
  console.log('deleteteam error!');
}

function newPlayerSuccess(json) {
  var team = json;
  var teamId = team._id;
  for(var index = 0; index < allTeams.length; index++) {
    if(allTeams[index]._id === teamId) {
      allTeams[index] = team;
      break;
    }
  }
  render();
}

function newPlayerError() {
  console.log('adding new player error!');
}
