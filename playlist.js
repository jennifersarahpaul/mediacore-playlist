$(document).ready(function() {

  var playlist = [];
  var currentIndex = 0;

  // var buttonPushed = function() {
  //   var backButton = $("#back-button"); 
  //   var skipButton = $("#skip-button");
  //   button.on('click', function() {
  //     if button == backButton {
  //       // DO STUFF TO LOAD PREVIOUS VIDEO
  //       // play(currentIndex - 1);
  //     } else {
  //       // DO STUFF TO LOAD NEXT VIDEO
  //       // play(currentIndex + 1);
  //     }
  //   }); 
  // }

  var currentVideo = function(currentIndex) {
      // DO: 
      // - LOAD CURRENT VIDEO
      // - SHOW TITLE
      // - SHOW DESCRIPTION
      // - Update the playlist array to add the video
      // - update the current index for the buttons

        var iframe = $("iframe")[0];
        iframe.src = "https://riipen.mediacore.tv/media/id:" + playlist[currentIndex][0] + "/embed_player";
        var player = new playerjs.Player(iframe);
        //make sure the player is ready and start playing
        $("#title").text(playlist[currentIndex][1])
        $("#description").text(playlist[currentIndex][2])
        player.play();
        
    // plays the video automatically
    // player.on('ready', function(){
    //   player.on('play', function(){
    //     console.log('play');
    //   });
    //   player.getDuration(function(duration){
    //     console.log(duration);
    //   });
    //   if (player.supports('method', 'mute')){
    //     player.mute();
    //   }
    //   player.play();
    // });
  }

  // ajax call to obtain json data and to push video information into an array
  $.ajax({
    method:'GET',
    url: 'https://riipen.mediacore.tv/api2/media',
    dataType: 'json',
    username: "riipenchallenge@mediacore.com", 
    password: "riipenchallenge",
    crossDomain: true,
    success: function(mediaItem) {
      // creates the array of video information
      $.each(mediaItem.items, function(index, video){
        if (video.type == "video") {
          playlist.push([video.id, video.title, video.description_plain]);
        }
      });
      console.log(playlist.length + " videos were added to the playlist");
      // plays the first video
      if (playlist.length > 0) {
        currentVideo(currentIndex);
      } else {
        alert("There are no videos to play");
      }
    },
    failure: function(err) {
      alert("Error: " + err);
    }, 
  });
});
