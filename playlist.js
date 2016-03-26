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
    
    // embeds the video into the <iframe>; video starts playing
    var iframe = $("iframe")[0];
    iframe.src = "https://riipen.mediacore.tv/media/id:" + playlist[currentIndex][0] + "/embed_player";
    var player = new playerjs.Player(iframe);
    $("#title").text(playlist[currentIndex][1])
    $("#description").text(playlist[currentIndex][2])
    player.play();

    // automatically plays the next video after the current video has ended
    player.on('ended', function(){
      currentIndex += 1;
      if (currentIndex < playlist.length) {
        currentVideo(currentIndex);
      } else {
        console.log("That was the last video; press the back button or refresh the page to start at the beginning again.");
      }
    });
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
