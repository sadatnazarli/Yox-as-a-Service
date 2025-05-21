document.addEventListener('DOMContentLoaded', function() {
  const yoxButton = document.getElementById('yox-button');
  const nameInput = document.getElementById('name-input');
  const categorySelect = document.getElementById('category-select');
  const resultText = document.getElementById('result-text');
  const loadingSpinner = document.getElementById('loading-spinner');
  const resultContainer = document.getElementById('result-container');
  const copyButton = document.getElementById('copy-button');
  const shareButton = document.getElementById('share-button');
  const historyList = document.getElementById('history-list');
  const historyContainer = document.getElementById('history-container');
  const randomCategoryButton = document.getElementById('random-category');
  const cardElement = document.querySelector('.card');

  if (localStorage.getItem('userName')) {
    nameInput.value = localStorage.getItem('userName');
  }

  loadHistory();

  yoxButton.addEventListener('click', function() {
    yoxButton.classList.add('clicked');
    setTimeout(() => yoxButton.classList.remove('clicked'), 200);

    loadingSpinner.style.display = 'flex';
    resultContainer.style.display = 'none';

    const name = nameInput.value.trim();
    const category = categorySelect.value;
    const categoryText = categorySelect.options[categorySelect.selectedIndex].text;

    if (name) {
      localStorage.setItem('userName', name);
    } else {
      localStorage.removeItem('userName');
    }

    const baseUrl = "https://yox-as-a-service.onrender.com";
    let apiUrl = `${baseUrl}/${category}`;

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

          addToHistory({
            category: categoryText,
            message: message,
            timestamp: new Date().toLocaleTimeString('az-AZ', {hour: '2-digit', minute:'2-digit'})
          });
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

  function addToHistory(item) {
    let history = JSON.parse(localStorage.getItem('yoxHistory') || '[]');
    history.unshift(item);
    if (history.length > 5) {
      history = history.slice(0, 5);
    }
    localStorage.setItem('yoxHistory', JSON.stringify(history));
    loadHistory();
  }

  function loadHistory() {
    const history = JSON.parse(localStorage.getItem('yoxHistory') || '[]');

    if (history.length === 0) {
      historyContainer.style.display = 'none';
      return;
    }

    historyList.innerHTML = '';
    history.forEach(item => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="history-item-header">
          <span class="history-category">${item.category}</span>
          <span class="history-time">${item.timestamp}</span>
        </div>
        <div class="history-message">${item.message}</div>
      `;

      historyItem.addEventListener('click', function() {
        resultText.textContent = item.message;
        resultContainer.style.display = 'block';
        resultContainer.classList.remove('fade-in');
        void resultContainer.offsetWidth;
        resultContainer.classList.add('fade-in');

        historyItem.classList.add('highlight');
        setTimeout(() => {
          historyItem.classList.remove('highlight');
        }, 1000);
      });

      historyList.appendChild(historyItem);
    });

    historyContainer.style.display = 'block';
  }

  copyButton.addEventListener('click', function() {
    const textToCopy = resultText.textContent;
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      copyButton.classList.add('success');
      copyButton.querySelector('span').textContent = 'Kopyalandı!';
      setTimeout(function() {
        copyButton.classList.remove('success');
        copyButton.querySelector('span').textContent = 'Kopyala';
      }, 2000);
    } catch (err) {
      console.error('Kopyalama uğursuz oldu:', err);
      resultText.textContent = "Kopyalama uğursuz oldu. Zəhmət olmasa mətni əl ilə kopyalayın.";
    } finally {
      document.body.removeChild(textArea);
    }
  });

  shareButton.addEventListener('click', function() {
    const textToShare = resultText.textContent;

    if (navigator.share) {
      navigator.share({
          title: 'YOX API Bəhanəsi',
          text: textToShare,
          url: window.location.href
        })
        .then(() => {
          shareButton.classList.add('success');
          shareButton.querySelector('span').textContent = 'Paylaşıldı!';
          setTimeout(function() {
            shareButton.classList.remove('success');
            shareButton.querySelector('span').textContent = 'Paylaş';
          }, 2000);
        })
        .catch((error) => console.error('Paylaşma xətası:', error));
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = textToShare;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        shareButton.classList.add('success');
        shareButton.querySelector('span').textContent = 'Kopyalandı!';
        setTimeout(function() {
          shareButton.classList.remove('success');
          shareButton.querySelector('span').textContent = 'Paylaş';
        }, 2000);
      } catch (err) {
        console.error('Kopyalama uğursuz oldu:', err);
        resultText.textContent = "Paylaşma dəstəklənmir. Zəhmət olmasa mətni əl ilə kopyalayın.";
      } finally {
        document.body.removeChild(textArea);
      }
    }
  });

  if (randomCategoryButton) {
    randomCategoryButton.addEventListener('click', function() {
      const options = categorySelect.querySelectorAll('optgroup option');
      const randomIndex = Math.floor(Math.random() * options.length);
      categorySelect.selectedIndex = Array.from(categorySelect.options).indexOf(options[randomIndex]);
      categorySelect.classList.add('changed');
      setTimeout(() => categorySelect.classList.remove('changed'), 500);
    });
  }

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
