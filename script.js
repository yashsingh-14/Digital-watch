let userName = "";
  let language = "en";

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
    document.getElementById("date").innerText = now.toLocaleDateString(language === "hi" ? 'hi-IN' : 'en-US', options);

    changeBackground(hours);
  }
  function changeBackground(hours) {
    let body = document.body;
    if (hours >= 5 && hours < 12) {
      body.style.background = "linear-gradient(135deg, #FFD194, #D1913C)";
    } else if (hours >= 12 && hours < 17) {
      body.style.background = "linear-gradient(135deg, #F6D365, #FDA085)";
    } else if (hours >= 17 && hours < 20) {
      body.style.background = "linear-gradient(135deg, #2C3E50, #FD746C)";
    } else {
      body.style.background = "linear-gradient(135deg, #0F2027, #203A43, #2C5364)";
    }
  }
  function saveName() {
    let nameInput = document.getElementById("nameInput").value.trim();
    if (nameInput) {
      userName = nameInput;
      alert(`Name saved: ${userName}`);
    }
  }
  function toggleLanguage() {
    language = (language === "en") ? "hi" : "en";
  }
  function speakGreeting() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let speech = new SpeechSynthesisUtterance();
    speech.lang = (language === "hi") ? "hi-IN" : "en-US";
    let hourWords = ["बारह","एक","दो","तीन","चार","पाँच","छह","सात","आठ","नौ","दस","ग्यारह"];
    let minuteWords = ["शून्य","एक","दो","तीन","चार","पाँच","छह","सात","आठ","नौ","दस","ग्यारह","बारह","तेरह","चौदह","पंद्रह","सोलह","सत्रह","अठारह","उन्नीस","बीस","इक्कीस","बाईस","तेईस","चौबीस","पच्चीस","छब्बीस","सत्ताईस","अट्ठाईस","उनतीस","तीस","इकतीस","बत्तीस","तैंतीस","चौंतीस","पैंतीस","छत्तीस","सैंतीस","अड़तीस","उनतालीस","चालीस","इकतालीस","बयालीस","तैंतालीस","चवालीस","पैंतालीस","छियालीस","सैंतालीस","अड़तालीस","उनचास","पचास","इक्यावन","बावन","तिरेपन","चौवन","पचपन","छप्पन","सत्तावन","अट्ठावन","उनसठ"];

    if (language === "hi") {
      let h = hourWords[hours % 12];
      let m = minuteWords[minutes];
      speech.text = `${userName ? userName + ", " : ""}अभी ${h} बजकर ${m} मिनट हो रहे हैं`;
    } else {
      let displayHours = hours % 12 || 12;
      let ampm = hours >= 12 ? "PM" : "AM";
      speech.text = `${userName ? userName + ", " : ""}The time is ${displayHours}:${minutes} ${ampm}`;
    }

    let speakBtn = document.getElementById("speakButton");
    speakBtn.classList.add("pulsing");

    speech.onend = () => {
      speakBtn.classList.remove("pulsing");
    };

    window.speechSynthesis.speak(speech);
  }

  setInterval(updateClock, 1000);
  updateClock();
