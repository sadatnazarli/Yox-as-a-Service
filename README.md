![YOX Logo](./static/img/logo.png)

# YOX-as-a-Service

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![API Status](https://img.shields.io/badge/API-Online-green)](https://yoxapi.fun)

> The ultimate Azerbaijani excuse generator API. Because sometimes "No" just isn't enough!

## 🚀 [Live Demo](https://yoxapi.fun)

Try the API right now at [https://yoxapi.fun](https://yoxapi.fun)

## 📖 What is YOX?

YOX (pronounced "yokh") is the Azerbaijani word for "NO" - but in Azerbaijan, we never just say no! We have creative, culturally-rich ways to decline requests across all aspects of life.

This API delivers authentic, humorous, and culturally-inspired Azerbaijani excuses across 20+ categories. Whether you need to politely decline your friend's invitation, explain to your teacher why your homework isn't ready, or tell your boss why you can't work overtime - YOX has got you covered!

## 🔍 Who is it for?

- Developers looking for a fun API to integrate into their projects
- Anyone wanting to learn about Azerbaijani cultural humor
- People who need creative ways to say "No"
- Applications that need random excuse generation with a cultural twist

## 🛠️ How to Use

### Basic Usage

Simply make a GET request to any of our endpoints:

```bash
# Basic usage
curl https://yoxapi.fun/sevgi

# With name personalization
curl https://yoxapi.fun/is?ad=Eldar
```

### Code Examples

#### Python

```python
import requests

# Get a random excuse for not going to work
response = requests.get("https://yoxapi.fun/is")
print(response.json())

# Get a personalized excuse for not helping a friend
response = requests.get("https://yoxapi.fun/dost", params={"ad": "Aynur"})
print(response.json())
```

#### JavaScript

```javascript
// Get a random love excuse
fetch("https://yoxapi.fun/sevgi")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));

// With personalization
fetch("https://yoxapi.fun/valideyn?ad=Farid")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

### Response Format

All endpoints return JSON in the following format:

```json
{
  "excuse": "Vallah, ay dostum Aynur, bu həftə görüşə bilmərəm. Nənəmin pişiyi xəstələnib, ona baxmalıyam.",
  "category": "dost",
  "personalized": true
}
```

## 📋 Available Endpoints

| Endpoint | Category | Description |
|----------|----------|-------------|
| `/sevgi` | Love | Excuses for romantic situations |
| `/dost` | Friends | Excuses to avoid friends |
| `/valideyn` | Parents | Excuses to tell your parents |
| `/is` | Work | Excuses for your boss or colleagues |
| `/muellim` | Teachers | Excuses for educational settings |
| `/qohum` | Relatives | Excuses for family gatherings |
| `/mekteb` | School | School-related excuses |
| `/telefon` | Phone | Excuses for not answering calls |
| `/tedbir` | Events | Excuses to skip events |
| `/gorusme` | Meetings | Excuses to avoid meetings |
| `/idman` | Sports | Sports-related excuses |
| `/yemek` | Food | Food-related excuses |
| `/pul` | Money | Financial excuses |
| `/gezinti` | Travel | Travel-related excuses |
| `/umumi` | General | All-purpose excuses |
| `/random` | Random | Random excuse from any category |

Each endpoint supports an optional `ad` query parameter to personalize the excuse with a name.

## 📸 Screenshots

![Web Interface](./assets/screenshot1.png)

*Add your screenshot here*

## 🖥️ Self-Hosting Instructions

Want to run your own instance of YOX-as-a-Service? Follow these steps:

### Prerequisites

- Python 3.8+
- Flask

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sadatnazarli/yox-as-a-service.git
   cd yox-as-a-service
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`.

### Requirements.txt

```
Flask==2.3.2
gunicorn==20.1.0
Flask-Cors==3.0.10
python-dotenv==1.0.1

```

## 🗺️ Roadmap

- [ ] Add admin panel for usage statistics
- [ ] Expand excuse database with more categories
- [ ] Implement regional dialects and slang variations
- [ ] Create mobile app integration examples
- [ ] Add audio pronunciations of excuses
- [ ] Develop multi-language support (starting with Russian and English)
- [ ] Create a contributor system for community-submitted excuses

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 👏 Acknowledgements

- Thanks to all Azerbaijani grandmothers for their creative excuse inspiration
- Special thanks to the Flask community for making API development enjoyable
- All the contributors who helped expand our excuse database

---

Made with ❤️ (and a lot of excuses) in Azerbaijan. YOX!