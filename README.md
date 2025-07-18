# Simple Bot Control
This project offers a simple and easy way to manage microcontrollers like Arduino, ESP, and others, whether you're using one or multiple devices. It works by creating a server that, leveraging the Firmata protocol, maintains communication with your board. It then makes a dashboard available on your local network, accessible from the browser of any connected device.

## Get Started
### Installation
<details>
  <summary>Dependencies</summary>
  <ul>
    <li>Node JS - can be installed on the <a href="https://nodejs.org/">official website</a></li>
    <li>NPM - can be installed on the <a href="https://nodejs.org/">official website</a> </li>
  </ul>
</details>

<details>
  <summary>Installation</summary>
<p>Firstly, you should clone the project repository or download the source code.</p>

<p>
Next, go to the directory where you downloaded the code and run the command below to install the program's dependencies:

`$ npm install`
</p>

<p>
Of course, now the server program is ready.
</p>
</details>

<details>
  <summary>Microcontroller</summary>
  <p>
  The simple-bot-control uses Johnny-Five, a JavaScript package that maintains communication with the board. Therefore, it needs to be set up according to the <a href="https://johnny-five.io/platform-support/#relationship:all">package's specifications</a>.
  </p>
  <p>
  For boards supported by the Arduino IDE, you can load the StandardFirmataPlus example code, which is native to the IDE.
  </p>
</details>
