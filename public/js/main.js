//Form-submission Event Handler function
const onSubmit = (e) => {
  e.preventDefault();

  //cleanup the image src & warning heading
  document.querySelector('#image').src = '';
  document.querySelector('.msg').textContent = '';

  const prompt = document.getElementById('prompt').value;
  const size = document.getElementById('size').value;

  if (prompt === '') {
    alert('Please input some text');
    return;
  }

  generateImageResponse(prompt, size);
};

//Make API call
const generateImageResponse = async (prompt, size) => {
  try {
    showSpinner();
    const response = await fetch('/openai/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        size
      })
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    const imageUrl = data.data;
    document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
};

//show spinner
const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};

//remove spinner
const removeSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

//Add Event Listener to  Form
document.querySelector('#image-form').addEventListener('submit', onSubmit);
