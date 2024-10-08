
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    
    // Load existing comments from localStorage (if any), doing a real database is beyond the scope
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    storedComments.forEach(comment => addCommentToDOM(comment));

    // Handle form submission
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        const newComment = { name, comment, date: new Date().toLocaleString() };
        
        // Save comment to local storage
        storedComments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(storedComments));
        
        // Add comment to DOM
        addCommentToDOM(newComment);

        // Clear form fields
        commentForm.reset();
    });

    // Function to add a comment to the DOM
    function addCommentToDOM({ name, comment, date }) {
        const commentItem = document.createElement('li');
        commentItem.innerHTML = `<strong>${name}</strong> (${date}): <p>${comment}</p>`;
        commentsList.appendChild(commentItem);
    }
});
