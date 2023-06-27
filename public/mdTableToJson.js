
function parseLine(line) {
  const choppedLine = line.trim().split('|');
  const elements = choppedLine.slice(1, -1);

  return elements.map(element => element.trim());
}

function convertMarkdownTable(input) {
  try {
    const inputLines = input.split("\n");

    const markdown = inputLines.filter(line => !(line.trim() === ""));
    const headers = parseLine(markdown[0]);

    const data = markdown.slice(2).map((dataLine) => parseLine(dataLine));

    const fields = headers.map(header => {
      return {
        "key": header,
        "label": header,
        "sortable": true
      };
    });

    const items = data.map(row => {
      return row.reduce((rowData, columnData, index) => {
        return { ...rowData, [headers[index]] : columnData };
      }, {});
    });

    object = {
      "fields": fields,
      "items": items,
      "filter": true,
      "caption": "Generated with JSON data"
    };

    codeFenceStart = "```json:table\n";
    codeFenceStop = "```\n";

    document.getElementById("copyButton").disabled = false;
    return codeFenceStart + JSON.stringify(object, null, 2) + "\n" + codeFenceStop;
  } catch {
    return "couldn't parse the input";
  }
}

function copyOutput() {
  const output = document.getElementById("output").innerText;
  navigator.clipboard.writeText(output);
}

function convert() {
  const input = document.getElementById("input").value;
  const output = convertMarkdownTable(input);
  document.getElementById("output").innerHTML = output;
}

document.getElementById("copyButton").disabled = true;
