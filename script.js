const output = document.getElementById('output');
const input = document.getElementById('command-input');

const commands = {
  help: "Available commands:\n- whoami\n- skills [-languages | -networks | -systems | -web | -all]\n- projects\n- contact\n- clear",
  whoami: "I'm an engineering student in computer science, networks and telecommunications at IMT Atlantique, passionate about way too many fields.",
  projects: "Work in progress.",
  contact: "Email: jules@brutschy\nGitHub: github.com/julesbrt",
  clear: "clear"
};

const skillsData = {
    languages: "Languages:\n- French: native speaker\n- English: fluent\n- German: good basics (but panic during conversation!)",
    networks: "Networks:\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
    systems: "Systems:\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante dapibus diam.",
    web: "Web Development:\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet.",
    all: `
  Languages:
  - French: native speaker
  - English: fluent
  - German: good basics (but panic during conversation!)
  
  Networks:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
  
  Systems:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante dapibus diam.
  
  Web:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet.
  `.trim()
  };
  

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = input.value.trim();
    handleCommand(cmd);
    input.value = '';
  }
});

function handleCommand(cmd) {
  if (cmd === '') return;

  const commandLine = document.createElement('div');
  commandLine.classList.add('command-line');

  const prompt = document.createElement('span');
  prompt.classList.add('prompt');
  prompt.textContent = '> ';
  commandLine.appendChild(prompt);

  const commandText = document.createElement('span');
  commandText.classList.add('input');
  commandText.textContent = cmd;
  commandLine.appendChild(commandText);

  output.appendChild(commandLine);

  const [baseCmd, option] = cmd.split(" ");

  if (baseCmd === 'clear') {
    output.innerHTML = '';
    return;
  }

  if (baseCmd === 'skills') {
    let response;
    if (!option || option === '-all') {
      response = skillsData.all;
    } else if (option === '-languages') {
      response = skillsData.languages;
    } else if (option === '-networks') {
      response = skillsData.networks;
    } else if (option === '-systems') {
      response = skillsData.systems;
    } else if (option === '-web') {
      response = skillsData.web;
    } else {
      response = "Unknown skills option. Try: -languages, -networks, -systems, -web, or -all";
    }
    printResponse(response);
    return;
  }

  if (commands[cmd]) {
    printResponse(commands[cmd]);
  } else {
    printResponse("Command not found. Type 'help' for a list of commands.");
  }
}

function printResponse(text) {
  const response = document.createElement('div');
  response.classList.add('response');
  response.textContent = text;
  output.appendChild(response);
  output.scrollTop = output.scrollHeight;
}
