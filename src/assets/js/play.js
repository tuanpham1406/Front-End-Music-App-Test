function playDock() {
  var audio = document.getElementById('audio');
  $("#plays_btn").click(function () {

    if (audio.paused == false) {
      audio.pause();
      $("#play_btn").show();
      $("#pause_btn").hide();
    } else {
      audio.play();
      $("#play_btn").hide();
      $("#pause_btn").show();
    }
  });
  audio.addEventListener("timeupdate", function () {
    var currentTime = audio.currentTime,
      duration = audio.duration,
      currentTimeMs = audio.currentTime * 1000;
    $('.progressbar_range').stop(true, true).animate({'width': (currentTime + .25) / duration * 100 + '%'}, 250, 'linear');
  });

  audio.addEventListener("timeupdate", function () {
    var timeleft = document.getElementById('timeleft'),
      duration = parseInt(audio.duration),
      currentTime = parseInt(audio.currentTime),
      timeLeft = duration - currentTime,
      s, m;

    s = timeLeft % 60;
    m = Math.floor(timeLeft / 60) % 60;

    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;

    $('#timeleft').text("-" + m + ":" + s);

  });
}
