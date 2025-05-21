document.addEventListener('DOMContentLoaded', function() {
  // Get references to DOM elements
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

  // Load previous user name from local storage if available
  if (localStorage.getItem('userName')) {
    nameInput.value = localStorage.getItem('userName');
  }

  // Load previous excuse history
  loadHistory();

  // Add event listener for the "YOX DE" button
  yoxButton.addEventListener('click', function() {
    // Add a 'clicked' class for a brief animation feedback
    yoxButton.classList.add('clicked');
    setTimeout(() => yoxButton.classList.remove('clicked'), 200);

    // Show loading spinner and hide result container
    loadingSpinner.style.display = 'flex';
    resultContainer.style.display = 'none';

    // Get input values
    const name = nameInput.value.trim();
    const category = categorySelect.value;
    const categoryText = categorySelect.options[categorySelect.selectedIndex].text;

    // Save user name to local storage if provided, otherwise remove it
    if (name) {
      localStorage.setItem('userName', name);
    } else {
      localStorage.removeItem('userName');
    }

    // Construct the API URL
    const baseUrl = "https://yox-as-a-service.onrender.com";
    let apiUrl = `${baseUrl}/${category}`;

    // Add name parameter to URL only if it's provided
    if (name) {
      apiUrl += `?ad=${encodeURIComponent(name)}`;
    }

    // Fetch data from the API after a small delay for visual effect
    setTimeout(() => {
      fetch(apiUrl)
        .then(response => {
          // Check if the response was successful
          if (!response.ok) {
            // If not successful, parse error message from response body
            return response.json().then(err => {
              throw new Error(`${response.status}: ${err.xeta || 'API sorğusu uğursuz oldu'}`);
            });
          }
          return response.json();
        })
        .then(data => {
          // Hide loading spinner and display result
          loadingSpinner.style.display = 'none';
          const message = data.cavab || 'Bəhanə tapılmadı.'; // Get the excuse message
          resultText.textContent = message;
          resultContainer.style.display = 'block';
          // Trigger fade-in animation by re-adding the class
          resultContainer.classList.remove('fade-in');
          void resultContainer.offsetWidth; // Trigger reflow
          resultContainer.classList.add('fade-in');

          // Add the generated excuse to history
          addToHistory({
            category: categoryText,
            message: message,
            timestamp: new Date().toLocaleTimeString('az-AZ', {hour: '2-digit', minute:'2-digit'})
          });
        })
        .catch(error => {
          // Handle errors during fetch operation
          loadingSpinner.style.display = 'none';
          resultText.textContent = `Xəta: ${error.message || 'Sistemlə əlaqə yaratmaq mümkün olmadı.'}`;
          resultContainer.style.display = 'block';
          // Trigger fade-in animation for error message as well
          resultContainer.classList.remove('fade-in');
          void resultContainer.offsetWidth; // Trigger reflow
          resultContainer.classList.add('fade-in');
          console.error('Xəta:', error);
        });
    }, 800); // Simulate network delay for better UX
  });

  // Function to add a new excuse to history
  function addToHistory(item) {
    // Retrieve history from local storage, or initialize as an empty array
    let history = JSON.parse(localStorage.getItem('yoxHistory') || '[]');

    // Add the new item to the beginning of the history array
    history.unshift(item);

    // Limit history to a maximum of 5 items
    if (history.length > 5) {
      history = history.slice(0, 5);
    }

    // Save the updated history back to local storage
    localStorage.setItem('yoxHistory', JSON.stringify(history));

    // Reload and display the history list
    loadHistory();
  }

  // Function to load and display the history list
  function loadHistory() {
    const history = JSON.parse(localStorage.getItem('yoxHistory') || '[]');

    // If history is empty, hide the history container
    if (history.length === 0) {
      historyContainer.style.display = 'none';
      return;
    }

    // Clear existing history items
    historyList.innerHTML = '';
    // Iterate through history and create DOM elements for each item
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

      // Add click listener to each history item to display its message
      historyItem.addEventListener('click', function() {
        resultText.textContent = item.message;
        resultContainer.style.display = 'block';
        // Re-trigger fade-in animation
        resultContainer.classList.remove('fade-in');
        void resultContainer.offsetWidth; // Trigger reflow
        resultContainer.classList.add('fade-in');

        // Add a temporary highlight class to the clicked history item
        historyItem.classList.add('highlight');
        setTimeout(() => {
          historyItem.classList.remove('highlight');
        }, 1000);
      });

      historyList.appendChild(historyItem);
    });

    // Show the history container once items are loaded
    historyContainer.style.display = 'block';
  }

  // Event listener for the "Copy" button
  copyButton.addEventListener('click', function() {
    const textToCopy = resultText.textContent;

    // Use document.execCommand('copy') for better compatibility in iframes
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      // Show success feedback
      copyButton.classList.add('success');
      copyButton.querySelector('span').textContent = 'Kopyalandı!';
      setTimeout(function() {
        copyButton.classList.remove('success');
        copyButton.querySelector('span').textContent = 'Kopyala';
      }, 2000);
    } catch (err) {
      console.error('Kopyalama uğursuz oldu:', err);
      // Fallback for failed copy (e.g., show a message to manually copy)
      // Instead of alert, you could show a temporary message box in UI
      resultText.textContent = "Kopyalama uğursuz oldu. Zəhmət olmasa mətni əl ilə kopyalayın.";
    } finally {
      document.body.removeChild(textArea);
    }
  });

  // Event listener for the "Share" button
  shareButton.addEventListener('click', function() {
    const textToShare = resultText.textContent;

    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share({
          title: 'YOX API Bəhanəsi',
          text: textToShare,
          url: window.location.href // Share the current page URL
        })
        .then(() => {
          // Show success feedback
          shareButton.classList.add('success');
          shareButton.querySelector('span').textContent = 'Paylaşıldı!';
          setTimeout(function() {
            shareButton.classList.remove('success');
            shareButton.querySelector('span').textContent = 'Paylaş';
          }, 2000);
        })
        .catch((error) => console.error('Paylaşma xətası:', error));
    } else {
      // Fallback: If Web Share API is not supported, copy the text to clipboard
      const textArea = document.createElement('textarea');
      textArea.value = textToShare;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        // Show success feedback for copying
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

  // Event listener for the "Random Category" button
  if (randomCategoryButton) {
    randomCategoryButton.addEventListener('click', function() {
      const options = categorySelect.querySelectorAll('optgroup option'); // Get all options within optgroups
      const randomIndex = Math.floor(Math.random() * options.length);
      categorySelect.selectedIndex = Array.from(categorySelect.options).indexOf(options[randomIndex]);
      // Add a 'changed' class for visual feedback
      categorySelect.classList.add('changed');
      setTimeout(() => categorySelect.classList.remove('changed'), 500);
    });
  }

  if (cardElement) {
    cardElement.classList.add('fade-in');
  }

  nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission
      yoxButton.click();
    }
  });

  categorySelect.addEventListener('change', function() {
    this.classList.add('changed');
    setTimeout(() => this.classList.remove('changed'), 500);
  });
});
