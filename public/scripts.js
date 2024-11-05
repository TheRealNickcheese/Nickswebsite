document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    if (!commentForm || !commentsList) {
        console.error('Form or comments list not found in the DOM.');
        return; // Exit early if elements are not found
    }

    // Load existing comments
    fetch('/comments')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(comments => {
            comments.forEach(comment => addCommentToDOM(comment));
        })
        .catch(error => console.error('Error fetching comments:', error));

    // Handle form submission
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, comment }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(comments => {
            commentsList.innerHTML = ''; // Clear existing comments
            comments.forEach(comment => addCommentToDOM(comment));
            commentForm.reset(); // Clear form fields
        })
        .catch(error => console.error('Error submitting comment:', error));
    });

    function addCommentToDOM({ name, comment, date }) {
        const commentItem = document.createElement('li');
        commentItem.innerHTML = `<strong>${name}</strong> (${date}): <p>${comment}</p>`;
        commentsList.appendChild(commentItem);
    }
});