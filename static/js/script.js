document.addEventListener('DOMContentLoaded', function() {
  // DOM elementlərini əldə etmək
  const yoxButton = document.getElementById('yox-button');
  const nameInput = document.getElementById('name-input');
  const categorySelect = document.getElementById('category-select');
  const resultText = document.getElementById('result-text');
  const loadingSpinner = document.getElementById('loading-spinner');
  const resultContainer = document.getElementById('result-container');

  // Əvvəlcədən daxil edilmiş adı yadda saxlamaq üçün
  if (localStorage.getItem('userName')) {
    nameInput.value = localStorage.getItem('userName');
  }

  // YOX düyməsinə klik hadisəsi
  yoxButton.addEventListener('click', function() {
    // Animasiya ilə düyməni basılmış göstərmək
    yoxButton.classList.add('clicked');
    setTimeout(() => yoxButton.classList.remove('clicked'), 200);

    // Yükləmə animasiyasını göstərmək
    loadingSpinner.style.display = 'flex';
    resultContainer.style.display = 'none'; // Nəticə konteynerini gizlət

    // İstifadəçi adını və kateqoriyanı əldə etmək
    const name = nameInput.value.trim();
    const category = categorySelect.value;

    // İstifadəçi adını yerli yaddaşda saxlamaq
    if (name) {
      localStorage.setItem('userName', name);
    } else {
      localStorage.removeItem('userName'); // Ad boşdursa yaddaşdan sil
    }

    // API sorğusu üçün URL yaratmaq
    let apiUrl = `/${category}`;

    // Əgər ad daxil edilibsə, parametr kimi əlavə etmək (seçilmiş kateqoriyadan asılı olmayaraq)
    if (name) {
      apiUrl += `?ad=${encodeURIComponent(name)}`;
    }

    // YOX API-sinə sorğu göndərmək - kiçik bir gecikmə əlavə etmək (istifadəçi təcrübəsi üçün)
    setTimeout(() => {
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            // Xəta baş verərsə, xəta mesajını JSON olaraq oxumağa çalış
            return response.json().then(err => {
              throw new Error(err.xeta || 'API sorğusu uğursuz oldu');
            });
          }
          return response.json();
        })
        .then(data => {
          // Yükləmə animasiyasını gizlətmək
          loadingSpinner.style.display = 'none';

          // Cavabı əlavə etmək
          const message = data.cavab || 'Bəhanə tapılmadı.';
          resultText.textContent = message;

          // Nəticə konteynerini göstərmək və animasiya tətbiq etmək
          resultContainer.style.display = 'block';
          resultContainer.classList.remove('fade-in');
          void resultContainer.offsetWidth; // Reflow
          resultContainer.classList.add('fade-in');

        })
        .catch(error => {
          // Xəta baş verərsə
          loadingSpinner.style.display = 'none';
          // Xəta mesajını göstər
          resultText.textContent = `Xəta: ${error.message || 'Sistemlə əlaqə yaratmaq mümkün olmadı.'}`;
          resultContainer.style.display = 'block';
          resultContainer.classList.remove('fade-in');
          void resultContainer.offsetWidth; // Reflow
          resultContainer.classList.add('fade-in');
          console.error('Xəta:', error);
        });
    }, 800); // 800ms gecikmə
  });

  // Səhifə yüklənəndə giriş animasiyası
  const cardElement = document.querySelector('.card');
  if (cardElement) {
      cardElement.classList.add('fade-in');
  }


  // Enter düyməsinə basıldıqda sorğu göndərmək
  nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Formun submit olunmasının qarşısını al
      yoxButton.click();
    }
  });

  // Kateqoriya seçimi dəyişdikdə animasiya tətbiq etmək
  categorySelect.addEventListener('change', function() {
    this.classList.add('changed');
    setTimeout(() => this.classList.remove('changed'), 500);
  });
});
