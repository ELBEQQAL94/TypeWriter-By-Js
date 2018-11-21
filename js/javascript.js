class TypeWriter {
    constructor(textElement, words, wait = 3000){
        this.textElement = textElement;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.text = '';
        this.wordIndex = 0;
        this.type();
        this.isDeleting = false;
    }
    // type word in page
    type() {

        const current = this.wordIndex % this.words.length;

        //Get full text
        const fullText = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // remove char
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            // add char
            this.text = fullText.substring(0, this.text.length + 1);
        }

        // Type Speed
        let typeSpeed = 300;
        if(this.isDeleting) {
            typeSpeed /= 2;
        }
        // if word is complet
        if(!this.isDeleting && this.text === fullText) {
            // make pause at end
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        this.textElement.innerHTML = `<span class="text">${this.text}</span>`;
        setTimeout(() => this.type(), typeSpeed);   
    }
    
}

function init() {
    const textElement = document.querySelector('.text-type');
    const words = JSON.parse(textElement.getAttribute('data-words'));
    const wait = textElement.getAttribute('data-wait');
    new TypeWriter(textElement, words, wait);
   }
   document.addEventListener('DOMContentLoaded', init);
