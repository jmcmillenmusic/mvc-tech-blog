const newFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector('input[name="post-content"]').value;
  const date_created = new Date().toLocaleDateString();

  if (postTitle && postContent && date_created) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ postTitle, postContent, date_created }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('#newPostButton')
  .addEventListener('submit', newFormHandler);

document
  .querySelectorAll('#deletePostButton').forEach(button => {
    button.addEventListener('submit', delButtonHandler);
  });
  