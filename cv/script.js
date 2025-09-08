const output = document.getElementById('output');
const input = document.getElementById('command-input');

const commands = {
  help: "Available commands:\n- whoami\n- skills -all / -languages / -networks\n- projects\n- contact\n- clear",
  whoami: "I'm an engineering student in computer science, networks and telecommunications at IMT Atlantique, passionate about way too many fields.",
  contact: "Email: jules@brutschy.fr\nGitHub: https://github.com/julesbrt",
  projects: "Work in progress.",
  skills: {
    "-languages": "French: native\nEnglish: fluent\nGerman: basic (panic in real conversations!)",
    "-networks": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "-all": "Languages:\n  - French: native\n  - English: fluent\n  - German: basic\nNetworks:\n  - Lorem ipsum dolor\n  - Lorem ipsum\nOther:\n  - Lorem ipsum etc."
  },
};

let history = []; // Historique des commandes
let historyIndex = -1; // Index actuel de l'historique

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = input.value.trim();
    handleCommand(cmd);
    input.value = ''; // Effacer l'entrée après chaque commande
  } else if (e.key === 'ArrowUp') {
    // Flèche du haut: Afficher la commande précédente de l'historique
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    // Flèche du bas: Afficher la commande suivante de l'historique
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      input.value = '';
      historyIndex = history.length; // Sortir de l'historique
    }
  }
});

function handleCommand(cmd) {
  if (cmd === "") return;
  
  printLine("> " + cmd, "command");
  
  // Ajouter la commande à l'historique
  history.push(cmd);
  historyIndex = history.length; // Réinitialiser l'index pour pointer sur la fin de l'historique
  
  if (cmd === "clear") {
    output.innerHTML = "";
    return;
  }

  if (cmd in commands && typeof commands[cmd] === "string") {
    printLine(commands[cmd], "success");
    return;
  }

  if (cmd.startsWith("skills")) {
    const args = cmd.split(" ");
    const option = args[1];

    if (!option) {
      printLine("Please use an option. Try 'skills -all', '-languages', or '-networks'.", "error");
      return;
    }

    if (commands.skills[option]) {
      printLine(commands.skills[option], "success");
    } else {
      printLine("Unknown option. Try 'skills -all', '-languages' or '-networks'.", "error");
    }
    return;
  }

  printLine("Command not found. Type 'help' for a list of commands.", "error");
}

function printLine(text, type = '') {
  const line = document.createElement('div');
  line.classList.add('output-line');
  if (type) line.classList.add(type);
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}
