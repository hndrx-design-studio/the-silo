document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("background-video");
  const soundToggle = document.getElementById("sound-toggle");
  const playPauseToggle = document.getElementById("play-pause-toggle");

  // Sound control elements
  const soundOffIcon = document.querySelector(".sound-off-icon");
  const soundOnIcon = document.querySelector(".sound-on-icon");

  // Play/Pause control elements
  const playIcon = document.querySelector(".play-icon");
  const pauseIcon = document.querySelector(".pause-icon");

  // Try to play the video (will start muted)
  video.play().catch(function (error) {
    // console.log("Autoplay prevented initially:", error);

    // Try again after a short delay
    setTimeout(function () {
      video.play().catch(function (e) {
        console.log("Retry failed:", e);
        // If autoplay still fails, show play icon instead of pause
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      });
    }, 1000);
  });

  // Toggle sound when sound button is clicked
  //soundToggle.addEventListener('click', function() {
  //if (video.muted) {
  // Unmute the video
  //video.muted = false;

  // Update button appearance
  //soundOffIcon.style.display = 'none';
  //soundOnIcon.style.display = 'block';
  //} else {
  // Mute the video
  //video.muted = true;

  // Update button appearance
  //soundOffIcon.style.display = 'block';
  //soundOnIcon.style.display = 'none';
  //}
  //});

  // Toggle play/pause when play button is clicked
  playPauseToggle.addEventListener("click", function () {
    if (video.paused) {
      // Play the video
      video.play();

      // Update button appearance
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    } else {
      // Pause the video
      video.pause();

      // Update button appearance
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
    }
  });

  // Update button state if video plays or pauses for any reason
  video.addEventListener("play", function () {
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  });

  video.addEventListener("pause", function () {
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  });
});
