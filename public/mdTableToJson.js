
function parseLine(line) {
  const choppedLine = line.trim().split('|');
  const elements = choppedLine.slice(1, -1);

  return elements.map(element => element.trim());
}

function convertMarkdownTable() {
  document.getElementById("output").innerHTML = "yay";
}

