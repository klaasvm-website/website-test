const container = document.getElementById("faqContainer");
const searchInput = document.getElementById("searchInput");

// Haal alle bestanden op uit de 'questions' map
fetch('questions/')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        const links = htmlDoc.querySelectorAll('a');

        // Filter alleen .html bestanden
        const questionFiles = Array.from(links)
            .map(link => link.href.split('/').pop())
            .filter(file => file.endsWith('.html'));

        // Maak de FAQ-items aan
        container.innerHTML = ''; // Verwijder "Even laden..."
        questionFiles.forEach(file => {
            const formattedQuestion = file
                .replace(/\.html$/, '')  // Verwijder .html
                .replace(/-/g, ' ')      // Vervang streepjes door spaties
                .replace(/^./, c => c.toUpperCase()) // Eerste letter hoofdletter
                + '?';                   // Voeg vraagteken toe

            const card = document.createElement('a');
            card.href = `questions/${file}`;
            card.className = 'faq-card';
            card.innerHTML = `
                <div class="faq-question">${formattedQuestion}</div>
            `;
            
            container.appendChild(card);
        });

        // Zoekfunctie
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll('.faq-card');
            let hasResults = false;

            cards.forEach(card => {
                const question = card.textContent.toLowerCase();
                if (question.includes(searchTerm)) {
                    card.style.display = 'flex';
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });

            // Toon bericht als er geen resultaten zijn
            const noResultsMessage = document.querySelector('.no-results');
            if (!hasResults) {
                if (!noResultsMessage) {
                    const message = document.createElement('div');
                    message.className = 'no-results';
                    message.innerHTML = `
                        Heb je je vraag niet kunnen vinden? 
                        Stuur dan een mailtje naar <a href="https://outlook.live.com/mail/0/deeplink/compose?to=stemclairhhh@gmail.com" target="_blank">stemclairhhh@gmail.com</a>
                    `;
                    container.appendChild(message);
                }
            } else if (noResultsMessage) {
                noResultsMessage.remove();
            }
        });
    })
    .catch(error => {
        console.error('Fout bij het laden van de vragen:', error);
        container.innerHTML = '<p>Kon de vragen niet laden. Probeer het later opnieuw.</p>';
    });