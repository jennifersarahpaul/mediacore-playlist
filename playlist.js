$(document).ready(function() {

  var playlist = [];
  var currentIndex = 0;

  // embeds the video into the <iframe>; video starts playing
  function currentVideo(currentIndex) {
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

  // back button goes to previous video
  $("#back-button").on('click', function() {
    if (currentIndex == 0) {
      alert("The current video is the first video");
    } else {
      currentIndex -= 1; 
      currentVideo(currentIndex);
    }
  });

  // skip button goes to next video
  $("#skip-button").on('click', function() {
    if (currentIndex == playlist.length - 1) {
      alert("The current video is the last video");
    } else {
      currentIndex += 1; 
      currentVideo(currentIndex);
    }
  });

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
