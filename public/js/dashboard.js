// Function that creates a new post
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const content = document.querySelector('#post-content').value;
  const date_created = new Date().toLocaleDateString();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content, date_created }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

// Function that retrieves data from an existing post to allow it to be edited
const startUpdateHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    // console.log(id);

    const response = await fetch(`/api/posts/${id}`, {
      method: 'GET',
    });
    
    // console.log(response);
    console.log(response.posts[0]);

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to start updating post');
    }
  }
};

// Function that allows user to update a post
const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const content = document.querySelector('#post-content').value;
  const date_created = new Date().toLocaleDateString();
  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, date_created }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

// Function that allows user to delete a post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

// Creates the post when user submits the form
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

// Allows user to begin updating a post
document
  .querySelector('#startUpdatePostButton')
  .addEventListener('click', startUpdateHandler);

// Allows user to finish updating a post
document
  .querySelector('.updating-post-form')
  .addEventListener('submit', updateFormHandler);

// Allows user to delete a post
document
  .querySelector('#deletePostButton')
  .addEventListener('click', delButtonHandler);

  