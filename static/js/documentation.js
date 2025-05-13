document.addEventListener('DOMContentLoaded', () => {
  // --- Language Switching ---
  const langSwitcher = document.querySelector('.lang-switcher');
  const elementsToTranslate = document.querySelectorAll('[data-en], [data-az], title');

  // Load saved language preference from localStorage
  const savedLang = localStorage.getItem('apiDocLang') || 'az';
  setLanguage(savedLang);

  // Add event listener to language switcher buttons
  langSwitcher.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
          const lang = event.target.dataset.lang;
          setLanguage(lang);
          localStorage.setItem('apiDocLang', lang); // Save preference to localStorage
      }
  });

  // Function to set the language
  function setLanguage(lang) {
      document.documentElement.lang = lang; // Set the HTML lang attribute
      elementsToTranslate.forEach(element => {
          // Handle title element separately as it doesn't use textContent directly for the tag
          if (element.tagName === 'TITLE') {
               element.textContent = element.dataset[lang];
          } else {
               element.textContent = element.dataset[lang];
          }
      });

      // Update active button class
      langSwitcher.querySelectorAll('button').forEach(button => {
          if (button.dataset.lang === lang) {
              button.classList.add('active');
          } else {
              button.classList.remove('active');
          }
      });
  }

  // --- Smooth Scrolling for Navbar Links ---
  document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default jump

          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get dynamic navbar height

          if (targetElement) {
              // Calculate the position to scroll to, accounting for the fixed navbar
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Subtract navbar height and add some extra space

              window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth" // Smooth scroll animation
              });
          }
      });
  });

  // --- Copy to Clipboard for Code Blocks ---
  document.querySelectorAll('.code-block-container').forEach(container => {
      const button = container.querySelector('.copy-button');
      const codeBlock = container.querySelector('code');

      if (button && codeBlock) {
          button.addEventListener('click', () => {
              // Use the Clipboard API for modern browsers
              if (navigator.clipboard) {
                  navigator.clipboard.writeText(codeBlock.textContent.trim()).then(() => {
                      // Provide feedback to the user
                      const originalText = button.textContent;
                      button.textContent = 'Copied!';
                      setTimeout(() => {
                          button.textContent = originalText;
                      }, 2000); // Reset text after 2 seconds
                  }).catch(err => {
                      console.error('Failed to copy text: ', err);
                      // Fallback for older browsers if needed, but Clipboard API is well-supported
                  });
              } else {
                  // Fallback for very old browsers (less common now)
                  const range = document.createRange();
                  range.selectNode(codeBlock);
                  window.getSelection().removeAllRanges();
                  window.getSelection().addRange(range);
                  try {
                      document.execCommand('copy');
                       const originalText = button.textContent;
                       button.textContent = 'Copied!';
                       setTimeout(() => {
                           button.textContent = originalText;
                       }, 2000);
                  } catch (err) {
                      console.error('Fallback: Failed to copy text: ', err);
                       const originalText = button.textContent;
                       button.textContent = 'Error!';
                       setTimeout(() => {
                           button.textContent = originalText;
                       }, 2000);
                  }
                  window.getSelection().removeAllRanges();
              }
          });
      }
  });

  // --- Dark Mode Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light

  // Apply saved theme on load
  if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.textContent = '☀️'; // Sun icon for dark mode
  } else {
       themeToggle.textContent = '🌙'; // Moon icon for light mode
  }


  themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      let currentTheme = 'light';
      if (document.body.classList.contains('dark-mode')) {
          currentTheme = 'dark';
          themeToggle.textContent = '☀️'; // Change icon to sun
      } else {
           themeToggle.textContent = '🌙'; // Change icon to moon
      }
      localStorage.setItem('theme', currentTheme); // Save theme preference
  });


  // --- Bonus: Collapsible Categories (Basic Implementation) ---
  // This requires modifying the HTML structure for categories to include buttons/headers
  // and adding CSS for the collapse effect.
  // A more robust implementation might involve dynamically creating the list.
  // For now, this is a placeholder. If you update the HTML structure for categories
  // (e.g., wrap each category li in a div with a header and content),
  // you can add JS here to toggle the content display.

  // Example structure for collapsible (in HTML):
  /*
  <div class="category-group">
      <h4 class="category-header">Category Name <button class="toggle-btn">+/-</button></h4>
      <ul class="category-list-collapsible">
          <li>...</li>
      </ul>
  </div>
  */

  // Example JS logic (if HTML is structured as above):
  /*
  document.querySelectorAll('.category-header .toggle-btn').forEach(button => {
      button.addEventListener('click', () => {
          const categoryList = button.closest('.category-group').querySelector('.category-list-collapsible');
          if (categoryList) {
              categoryList.classList.toggle('collapsed'); // Add/remove a 'collapsed' class
              button.textContent = categoryList.classList.contains('collapsed') ? '+' : '-';
          }
      });
  });
  */
  // You would also need CSS for .category-list-collapsible and .category-list-collapsible.collapsed { display: none; }


});
