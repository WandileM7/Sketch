// Initialize the grid with 16x16 squares
createGrid(16);

// Add event listener to the button
document.getElementById("resetButton").addEventListener("click", () => {
    let size = prompt("Enter the number of squares per side for the new grid (maximum 100):");
    size = parseInt(size);
    if (size > 0 && size <= 100) {
        createGrid(size);
    } else {
        alert("Please enter a valid number between 1 and 100.");
    }
});

function createGrid(size) {
    const container = document.getElementById("container");
    container.innerHTML = ''; // Clear any existing grid squares

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");
        square.dataset.interactions = "0";

        // Add hover effect to change color on mouseover
        square.addEventListener("mouseover", () => {
            darkenSquare(square);
        });

        container.appendChild(square);
    }
}

function darkenSquare(square) {
    let interactions = parseInt(square.dataset.interactions);
    
    if (interactions === 0) {
        // First interaction: set a random color
        square.style.backgroundColor = getRandomColor();
    }
    
    if (interactions < 10) {
        interactions++;
        square.dataset.interactions = interactions.toString();
        
        // Darken the square by 10%
        const currentColor = square.style.backgroundColor;
        const rgb = currentColor.match(/\d+/g).map(Number);
        const darkenedColor = rgb.map(value => Math.floor(value * 0.9));
        square.style.backgroundColor = `rgb(${darkenedColor.join(', ')})`;
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}