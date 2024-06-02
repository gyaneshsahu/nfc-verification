@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;500;600;800;900&display=swap');

:root {
  --font: 'Poppins', sans-serif;
  --white: #fff;
  --black: #000;
  --green: #4CAF50;
  --red: #f44336;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: var(--font);
}

select:focus, input:focus, button:focus {
  outline: none;
}

body {
  background-color: var(--black);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: var(--white);
}

/* Animation Container */
.animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.box {
  transform-style: preserve-3d;
  animation: animate 3s ease-in-out infinite alternate;
}

.box span {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5) 90%, transparent);
  text-transform: uppercase;
  line-height: 0.76em;
  position: absolute;
  color: var(--white);
  font-size: 3.5em;
  white-space: nowrap;
  font-weight: bold;
  padding: 0px 10px;
  transform-style: preserve-3d;
  text-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%) rotateX(calc(var(--i) * 22.5deg)) translateZ(109px);
}

.box span i {
  font-style: initial;
}

.box span i:nth-child(1) {
  color: var(--green);
}

.box span i:nth-child(2) {
  color: var(--red);
}

@keyframes animate {
  0% {
    transform: perspective(500px) rotateX(0deg) rotate(5deg);
  }
  100% {
    transform: perspective(50px) rotateX(360deg) rotate(5deg);
  }
}

/* Verification Container */
.verification-container {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.status-box {
  position: relative;
  text-align: center;
}

.status-icon {
  display: none;
  margin-bottom: 24px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

/* Success Mark */
.wrapper.success {
  display: none;
}

.checkmark {
  width: 224px; /* 4 times bigger */
  height: 224px; /* 4 times bigger */
  border-radius: 50%;
  display: block;
  stroke-width: 1; /* 4 times bigger */
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
}

.checkmark__circle {
  stroke-dasharray: 664; /* 4 times bigger */
  stroke-dashoffset: 664; /* 4 times bigger */
  stroke-width: 8; /* 4 times bigger */
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 192; /* 4 times bigger */
  stroke-dashoffset: 192; /* 4 times bigger */
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

/* Failure Mark */
.wrapper.failure {
  display: none;
}

.crossmark {
  width: 224px; /* 4 times bigger */
  height: 224px; /* 4 times bigger */
  border-radius: 50%;
  display: block;
  stroke-width: 1; /* 4 times bigger */
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #e74c3c;
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
}

.crossmark__circle {
  stroke-dasharray: 664; /* 4 times bigger */
  stroke-dashoffset: 664; /* 4 times bigger */
  stroke-width: 1; /* 4 times bigger */
  stroke-miterlimit: 10;
  stroke: #fff;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.crossmark__cross {
  transform-origin: 50% 50%;
  stroke-dasharray: 224; /* 4 times bigger */
  stroke-dashoffset: 224; /* 4 times bigger */
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

/* Animations */
@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px var(--green);
  }
}
