// script.js
const container = document.getElementById("faqContainer");
const searchInput = document.getElementById("searchInput");

fetch('vragen.json')
    .then(response => response.json())
    .then(questionFiles => {
        container.innerHTML = '';
        questionFiles.forEach(file => {
            const formattedQuestion = file
                .replace(/\.html$/, '')
                .replace(/-/g, ' ')
                .replace(/^./, c => c.toUpperCase()) + '?';

            const card = document.createElement('a');
            card.href = `questions/${file}`;
            card.className = 'faq-card';
            card.innerHTML = `<div class="faq-question">${formattedQuestion}</div>`;
            container.appendChild(card);
        });

        // Zoekfunctionaliteit blijft hetzelfde
        // ... [behoud de rest van de code]
    })
    .catch(error => {
        console.error('Fout:', error);
        container.innerHTML = '<p>Kon vragen niet laden.</p>';
    });