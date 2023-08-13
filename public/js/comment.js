const commentButtonHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('.commentText');
  const post_id = document.querySelector('.commentText').dataset.post_id;
  const date_created = new Date().toLocaleDateString();

  if (content && post_id && date_created) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, post_id, date_created }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/post/:id');
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .getElementById('addComment')
  .addEventListener('click', commentButtonHandler);
