const fs = require('fs');
const path = require('path');

const questionsDir = path.join(__dirname, 'questions');
const outputFile = path.join(__dirname, 'vragen.json');

fs.readdir(questionsDir, (err, files) => {
  if (err) {
    console.error('Fout bij het lezen van de vragenmap:', err);
    process.exit(1);
  }

  const htmlFiles = files.filter(file => file.endsWith('.html'));
  fs.writeFile(outputFile, JSON.stringify(htmlFiles, null, 2), (err) => {
    if (err) {
      console.error('Fout bij schrijven van vragen.json:', err);
      process.exit(1);
    }
    console.log('vragen.json is bijgewerkt!');
  });
});