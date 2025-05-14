document.addEventListener('DOMContentLoaded', function() {
  const yoxButton = document.getElementById('yox-button');
  const nameInput = document.getElementById('name-input');
  const categorySelect = document.getElementById('category-select');
  const resultText = document.getElementById('result-text');
  const loadingSpinner = document.getElementById('loading-spinner');
  const resultContainer = document.getElementById('result-container');

  if (localStorage.getItem('userName')) {
    nameInput.value = localStorage.getItem('userName');
  }

  yoxButton.addEventListener('click', function() {
    yoxButton.classList.add('clicked');
    setTimeout(() => yoxButton.classList.remove('clicked'), 200);

    loadingSpinner.style.display = 'flex';
    resultContainer.style.display = 'none';

    const name = nameInput.value.trim();
    const category = categorySelect.value;

    if (name) {
      localStorage.setItem('userName', name);
    } else {
      localStorage.removeItem('userName');
    }

    let apiUrl;
    const baseUrl = "https://yox-as-a-service.onrender.com";

    apiUrl = `${baseUrl}/${category}`;

    if (name) {
      apiUrl += `?ad=${encodeURIComponent(name)}`;
    }

    setTimeout(() => {
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(`${response.status}: ${err.xeta || 'API sorğusu uğursuz oldu'}`);
            });
          }
          return response.json();
        })
        .then(data => {
          loadingSpinner.style.display = 'none';
          const message = data.cavab || 'Bəhanə tapılmadı.';
          resultText.textContent = message;
          resultContainer.style.display = 'block';
          resultContainer.classList.remove('fade-in');
          void resultContainer.offsetWidth;
          resultContainer.classList.add('fade-in');
        })
        .catch(error => {
          loadingSpinner.style.display = 'none';
          resultText.textContent = `Xəta: ${error.message || 'Sistemlə əlaqə yaratmaq mümkün olmadı.'}`;
          resultContainer.style.display = 'block';
          resultContainer.classList.remove('fade-in');
          void resultContainer.offsetWidth;
          resultContainer.classList.add('fade-in');
          console.error('Xəta:', error);
        });
    }, 800);
  });

  const cardElement = document.querySelector('.card');
  if (cardElement) {
    cardElement.classList.add('fade-in');
  }

  nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      yoxButton.click();
    }
  });

  categorySelect.addEventListener('change', function() {
    this.classList.add('changed');
    setTimeout(() => this.classList.remove('changed'), 500);
  });
});