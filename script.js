 function updateClock() {
      let now = new Date();
      let hours = now.getHours();
      let minutes = String(now.getMinutes()).padStart(2, '0');
      let seconds = String(now.getSeconds()).padStart(2, '0');
      let ampm = hours >= 12 ? "PM" : "AM";

      let displayHours = hours % 12 || 12;
      displayHours = String(displayHours).padStart(2, '0');

      document.getElementById("clock").innerHTML =
        `${displayHours}:${minutes}<span id="seconds">:${seconds}</span> ${ampm}`;

      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById("date").innerText = now.toLocaleDateString('en-US', options);

      changeBackground(hours);
    }

    function changeBackground(hours) {
      let body = document.body;
      if (hours >= 5 && hours < 12) {
        // Morning
        body.style.background = "linear-gradient(135deg, #FFD194, #D1913C)";
      } else if (hours >= 12 && hours < 17) {
        // Afternoon
        body.style.background = "linear-gradient(135deg, #F6D365, #FDA085)";
      } else if (hours >= 17 && hours < 20) {
        // Evening
        body.style.background = "linear-gradient(135deg, #2C3E50, #FD746C)";
      } else {
        // Night
        body.style.background = "linear-gradient(135deg, #0F2027, #203A43, #2C5364)";
      }
    }

    setInterval(updateClock, 1000);
    updateClock();