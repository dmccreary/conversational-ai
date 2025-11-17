// Interactive Regular Expression Pattern Matcher
// Canvas dimensions
let canvasWidth = 900;
let canvasHeight = 750;

// UI Elements
let testTextArea;
let patternInput;
let exampleDropdown;
let flagGlobal, flagCaseInsensitive, flagMultiline;
let testButton, clearButton;

// State
let matches = [];
let currentPattern = '';
let currentFlags = '';
let errorMessage = '';

// Example patterns
const examples = {
  'Custom': {
    pattern: '',
    text: 'Enter your own pattern and test text',
    description: 'Create your own regex pattern'
  },
  'Email addresses': {
    pattern: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b',
    text: 'Contact us at support@example.com or sales@company.org for more information.',
    description: 'Matches standard email address formats'
  },
  'Phone numbers': {
    pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}',
    text: 'Call us at (555) 123-4567 or 555.987.6543 or 555-111-2222',
    description: 'Matches US phone numbers in various formats'
  },
  'URLs': {
    pattern: 'https?://[^\\s]+',
    text: 'Visit https://www.example.com and http://docs.example.org for more info.',
    description: 'Matches HTTP and HTTPS URLs'
  },
  'Dates (YYYY-MM-DD)': {
    pattern: '\\d{4}-\\d{2}-\\d{2}',
    text: 'The events occurred on 2024-01-15 and 2024-12-25.',
    description: 'Matches dates in ISO format'
  },
  'Hashtags': {
    pattern: '#\\w+',
    text: 'Excited about #AI and #MachineLearning! #NLP is fascinating.',
    description: 'Matches social media hashtags'
  },
  'Numbers': {
    pattern: '\\d+\\.?\\d*',
    text: 'The model achieved 94.7% accuracy on 1,250 test samples.',
    description: 'Matches integers and decimals'
  }
};

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Test text area
  testTextArea = createElement('textarea');
  testTextArea.position(20, 60);
  testTextArea.size(canvasWidth - 40, 100);
  testTextArea.attribute('placeholder', 'Enter test text here...');
  testTextArea.value(examples['Email addresses'].text);
  testTextArea.input(() => {
    if (currentPattern) {
      performMatching();
    }
  });

  // Pattern input
  patternInput = createInput(examples['Email addresses'].pattern);
  patternInput.position(120, 185);
  patternInput.size(canvasWidth - 140, 25);
  patternInput.input(() => {
    performMatching();
  });

  // Example dropdown (right control panel)
  exampleDropdown = createSelect();
  exampleDropdown.position(canvasWidth - 220, 230);
  Object.keys(examples).forEach(key => {
    exampleDropdown.option(key);
  });
  exampleDropdown.selected('Email addresses');
  exampleDropdown.changed(() => {
    const selected = exampleDropdown.value();
    const example = examples[selected];
    patternInput.value(example.pattern);
    testTextArea.value(example.text);
    performMatching();
  });

  // Checkboxes for flags (right control panel)
  flagGlobal = createCheckbox('Global (g)', true);
  flagGlobal.position(canvasWidth - 220, 280);
  flagGlobal.changed(() => performMatching());

  flagCaseInsensitive = createCheckbox('Case insensitive (i)', false);
  flagCaseInsensitive.position(canvasWidth - 220, 310);
  flagCaseInsensitive.changed(() => performMatching());

  flagMultiline = createCheckbox('Multiline (m)', false);
  flagMultiline.position(canvasWidth - 220, 340);
  flagMultiline.changed(() => performMatching());

  // Buttons (right control panel)
  testButton = createButton('Test Pattern');
  testButton.position(canvasWidth - 220, 380);
  testButton.mousePressed(performMatching);
  testButton.style('background-color', '#4CAF50');
  testButton.style('color', 'white');
  testButton.style('padding', '10px 20px');
  testButton.style('border', 'none');
  testButton.style('border-radius', '4px');
  testButton.style('cursor', 'pointer');

  clearButton = createButton('Clear');
  clearButton.position(canvasWidth - 220, 425);
  clearButton.mousePressed(() => {
    testTextArea.value('');
    patternInput.value('');
    matches = [];
    errorMessage = '';
    exampleDropdown.selected('Custom');
  });
  clearButton.style('background-color', '#f44336');
  clearButton.style('color', 'white');
  clearButton.style('padding', '10px 20px');
  clearButton.style('border', 'none');
  clearButton.style('border-radius', '4px');
  clearButton.style('cursor', 'pointer');

  // Initial matching
  performMatching();

  describe('Interactive regex pattern matcher showing matches highlighted in test text');
}

function draw() {
  background(240);

  // Title
  fill(0);
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();
  text('Interactive Regular Expression Pattern Matcher', canvasWidth / 2, 15);

  // Section labels
  textSize(16);
  textAlign(LEFT, CENTER);
  fill(60);
  text('Test Text:', 20, 50);
  text('Regex Pattern:', 20, 193);

  // Visualization area background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(20, 220, canvasWidth - 260, 240);

  // Draw visualization area title
  fill(0);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('Matches Visualization', canvasWidth / 2 - 100, 225);

  // Draw matches in visualization area
  drawMatchesVisualization();

  // Right panel background
  fill(245);
  stroke(200);
  rect(canvasWidth - 240, 220, 220, 300);

  // Right panel title
  fill(0);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('Controls', canvasWidth - 130, 225);

  // Example dropdown label
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Example Patterns:', canvasWidth - 220, 260);

  // Match count
  fill(0);
  textSize(14);
  textAlign(LEFT, CENTER);
  text(`Matches Found: ${matches.length}`, canvasWidth - 220, 470);

  // Results area background
  fill(255);
  stroke(200);
  rect(20, 475, canvasWidth - 40, 130);

  // Results area title
  fill(0);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('Match Details', canvasWidth / 2, 480);

  // Draw results
  drawResults();

  // Explanation area background
  fill(250, 250, 255);
  stroke(200);
  rect(20, 615, canvasWidth - 40, 115);

  // Explanation title
  fill(0);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('Pattern Explanation', canvasWidth / 2, 620);

  // Draw explanation
  drawExplanation();
}

function performMatching() {
  matches = [];
  errorMessage = '';
  currentPattern = patternInput.value();

  if (!currentPattern) {
    return;
  }

  // Build flags
  let flags = '';
  if (flagGlobal.checked()) flags += 'g';
  if (flagCaseInsensitive.checked()) flags += 'i';
  if (flagMultiline.checked()) flags += 'm';
  currentFlags = flags;

  // Try to create regex and find matches
  try {
    const regex = new RegExp(currentPattern, flags);
    const text = testTextArea.value();

    if (flagGlobal.checked()) {
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          text: match[0],
          index: match.index,
          groups: match.slice(1),
          fullMatch: match
        });
      }
    } else {
      const match = regex.exec(text);
      if (match) {
        matches.push({
          text: match[0],
          index: match.index,
          groups: match.slice(1),
          fullMatch: match
        });
      }
    }
  } catch (e) {
    errorMessage = 'Invalid regex pattern: ' + e.message;
  }
}

function drawMatchesVisualization() {
  const text = testTextArea.value();
  if (!text) return;

  const x = 30;
  const y = 250;
  const maxWidth = canvasWidth - 280;
  const lineHeight = 20;

  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);

  if (errorMessage) {
    fill(255, 0, 0);
    text(errorMessage, x, y);
    return;
  }

  // Highlight matches in the text
  let displayText = text.substring(0, 200); // Limit display length
  if (text.length > 200) {
    displayText += '...';
  }

  // Draw text with highlights
  let currentX = x;
  let currentY = y;
  const words = displayText.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const wordWidth = textWidth(word + ' ');

    if (currentX + wordWidth > x + maxWidth) {
      currentX = x;
      currentY += lineHeight;
    }

    // Check if this word contains a match
    let isMatch = false;
    for (let match of matches) {
      const matchStart = match.index;
      const matchEnd = match.index + match.text.length;
      const wordStartInText = text.indexOf(word, i === 0 ? 0 : text.indexOf(words[i - 1]) + words[i - 1].length);

      if (wordStartInText >= matchStart && wordStartInText < matchEnd) {
        isMatch = true;
        break;
      }
    }

    // Draw word with highlight
    if (isMatch) {
      fill(255, 255, 0, 200);
      noStroke();
      rect(currentX, currentY - 2, wordWidth, lineHeight - 4);
      fill(0);
    } else {
      fill(0);
    }

    text(word + ' ', currentX, currentY);
    currentX += wordWidth;
  }
}

function drawResults() {
  const x = 30;
  let y = 500;
  const lineHeight = 18;
  const maxResults = 5;

  fill(0);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);

  if (errorMessage) {
    fill(255, 0, 0);
    text(errorMessage, x, y);
    return;
  }

  if (matches.length === 0) {
    fill(100);
    text('No matches found', x, y);
    return;
  }

  for (let i = 0; i < Math.min(matches.length, maxResults); i++) {
    const match = matches[i];
    const resultText = `${i + 1}. "${match.text}" at position ${match.index}`;

    if (match.groups.length > 0) {
      const groupsText = match.groups.map((g, idx) => `Group ${idx + 1}: "${g}"`).join(', ');
      fill(0);
      text(resultText, x, y);
      y += lineHeight;
      fill(100);
      textSize(11);
      text('   ' + groupsText, x, y);
      textSize(12);
      y += lineHeight;
    } else {
      fill(0);
      text(resultText, x, y);
      y += lineHeight;
    }
  }

  if (matches.length > maxResults) {
    fill(100);
    textSize(11);
    text(`... and ${matches.length - maxResults} more matches`, x, y);
  }
}

function drawExplanation() {
  const x = 30;
  const y = 640;
  const lineHeight = 16;

  fill(0);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);

  const selectedExample = exampleDropdown.value();
  const example = examples[selectedExample];

  if (example && example.description) {
    text(example.description, x, y);
  }

  // Explain pattern components
  const pattern = patternInput.value();
  if (pattern) {
    let explanation = explainPattern(pattern);
    let explanationLines = splitTextIntoLines(explanation, canvasWidth - 60);

    for (let i = 0; i < Math.min(explanationLines.length, 4); i++) {
      text(explanationLines[i], x, y + (i + 1) * lineHeight);
    }
  }
}

function explainPattern(pattern) {
  const explanations = [];

  if (pattern.includes('\\b')) explanations.push('\\b = word boundary');
  if (pattern.includes('\\d')) explanations.push('\\d = any digit (0-9)');
  if (pattern.includes('\\w')) explanations.push('\\w = word character (a-z, A-Z, 0-9, _)');
  if (pattern.includes('\\s')) explanations.push('\\s = whitespace');
  if (pattern.includes('+')) explanations.push('+ = one or more');
  if (pattern.includes('*')) explanations.push('* = zero or more');
  if (pattern.includes('?')) explanations.push('? = zero or one');
  if (pattern.includes('{')) explanations.push('{n,m} = between n and m repetitions');
  if (pattern.includes('[')) explanations.push('[...] = character set');
  if (pattern.includes('^')) explanations.push('^ = start of string');
  if (pattern.includes('$')) explanations.push('$ = end of string');
  if (pattern.includes('|')) explanations.push('| = OR operator');
  if (pattern.includes('.')) explanations.push('. = any character');

  return explanations.length > 0 ? explanations.join(' | ') : 'Enter a pattern to see explanation';
}

function splitTextIntoLines(text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let word of words) {
    const testLine = currentLine + word + ' ';
    if (textWidth(testLine) > maxWidth && currentLine.length > 0) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }

  return lines;
}

function windowResized() {
  // This microsim has a fixed width
  // Optionally could be made responsive
}
