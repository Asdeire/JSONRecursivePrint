function printJsonRecursive(obj, indent = '') {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      console.log(`${indent}${key}:`);
      printJsonRecursive(obj[key], indent + '  ');
    } else if (Array.isArray(obj[key])) {
      console.log(`${indent}${key}: [`);
      obj[key].forEach((item, index) => {
        console.log(`${indent}  ${index}: {`);
        printJsonRecursive(item, indent + '    ');
        console.log(`${indent}  }`);
      });
      console.log(`${indent}]`);
    } else {
      console.log(`${indent}${key}: ${obj[key]}`);
    }
  }
}

// Capture console.log to display in the HTML pre element
const outputElement = document.getElementById('output');
const originalConsoleLog = console.log;
console.log = function(message) {
  outputElement.textContent += message + '\n';
  originalConsoleLog.apply(console, arguments);
};

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    printJsonRecursive(json);
  })
  .catch(error => console.error('Error fetching JSON:', error));
