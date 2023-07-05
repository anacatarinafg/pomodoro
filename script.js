// Wait for the HTML document to load
document.addEventListener('DOMContentLoaded', function () {
  // Get the necessary elements
  const timerButton = document.querySelector('.button__timer');
  const shortBreakButton = document.querySelector('.button__short');
  const longBreakButton = document.querySelector('.button__long');
  const roundElement = document.querySelector('.watch__round span');
  const timeElement = document.querySelector('.watch__time');
  const startButton = document.querySelector('.watch__start');

  let currentRound = 1;
  let totalTime = 25 * 60; // 25 minutes in seconds
  let timerInterval;

  // Update the timer display
  function updateTimerDisplay() {
    const minutes = Math.floor(totalTime / 60).toString().padStart(2, '0');
    const seconds = (totalTime % 60).toString().padStart(2, '0');
    timeElement.textContent = `${minutes} : ${seconds}`;
  }

  // Start the timer
  function startTimer() {
    timerInterval = setInterval(() => {
      totalTime--;

      if (totalTime <= 0) {
        clearInterval(timerInterval);
        // Timer has ended, update the round and reset the time
        currentRound++;
        totalTime = currentRound % 8 === 0 ? 30 * 60 : 25 * 60;

        // Display the updated round number
        roundElement.textContent = ` ${currentRound}`;
      }

      updateTimerDisplay();
    }, 1000); // Run the interval every 1 second
  }

  // Add event listeners to the buttons
  timerButton.addEventListener('click', function () {
    timerButton.classList.add('active');
    shortBreakButton.classList.remove('active');
    longBreakButton.classList.remove('active');
    totalTime = 25 * 60;
    currentRound = 1;
    roundElement.textContent = ` ${currentRound}`;
    updateTimerDisplay();
  });

  shortBreakButton.addEventListener('click', function () {
    timerButton.classList.remove('active');
    shortBreakButton.classList.add('active');
    longBreakButton.classList.remove('active');
    totalTime = 5 * 60;
    currentRound = 1;
    roundElement.textContent = ` ${currentRound}`;
    updateTimerDisplay();
  });

  longBreakButton.addEventListener('click', function () {
    timerButton.classList.remove('active');
    shortBreakButton.classList.remove('active');
    longBreakButton.classList.add('active');
    totalTime = 10 * 60;
    currentRound = 1;
    roundElement.textContent = ` ${currentRound}`;
    updateTimerDisplay();
  });

  startButton.addEventListener('click', function () {
    if (startButton.textContent === 'start') {
      // Start button clicked
      startButton.textContent = 'pause';
      startTimer();
    } else {
      // Pause button clicked
      startButton.textContent = 'start';
      clearInterval(timerInterval);
    }
  });

  // Set the initial timer state
  timerButton.click();
});