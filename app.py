from flask import Flask, jsonify, request, render_template
import random
import os
from excuses import all_excuses

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

def get_excuse_by_category(category_key):
    ad = request.args.get('ad')

    if category_key not in all_excuses:
        return jsonify({"xeta": "Belə bir kateqoriya tapılmadı.", "status_kodu": 404}), 404

    excuses_list = all_excuses[category_key]

    if not excuses_list:
        return jsonify({"cavab": f"'{category_key}' kateqoriyası üçün bəhanə tapılmadı."})

    excuse = random.choice(excuses_list)

    if ad:
        personalized_excuses = [
            f"{ad}, {excuse.lower()}",
            f"Bağışla, {ad}, amma {excuse.lower()}",
            f"Əzizim {ad}, {excuse.lower()}",
            f"{ad} üçün cavab: {excuse.lower()}"
        ]
        final_response = random.choice(personalized_excuses)
        return jsonify({"cavab": final_response})
    else:
        return jsonify({"cavab": excuse})

@app.route('/yox', methods=['GET'])
def get_yox():
    return get_excuse_by_category("general")

@app.route('/sevgi', methods=['GET'])
def get_sevgi():
    return get_excuse_by_category("sevgi")

@app.route('/dost', methods=['GET'])
def get_dost():
    return get_excuse_by_category("dost")

@app.route('/muellim', methods=['GET'])
def get_muellim():
    return get_excuse_by_category("muellim")

@app.route('/valideyn', methods=['GET'])
def get_valideyn():
    return get_excuse_by_category("valideyn")

@app.route('/is', methods=['GET'])
def get_is():
    return get_excuse_by_category("is")

@app.route('/toy_yox', methods=['GET'])
def get_toy_yox():
    return get_excuse_by_category("toy_yox")

@app.route('/qonaqliq_yox', methods=['GET'])
def get_qonaqliq_yox():
    return get_excuse_by_category("qonaqliq_yox")

@app.route('/yol_yox', methods=['GET'])
def get_yol_yox():
    return get_excuse_by_category("yol_yox")

@app.route('/sosial_media_yox', methods=['GET'])
def get_sosial_media_yox():
    return get_excuse_by_category("sosial_media_yox")

@app.route('/oyun_yox', methods=['GET'])
def get_oyun_yox():
    return get_excuse_by_category("oyun_yox")

@app.route('/texnologiya_yox', methods=['GET'])
def get_texnologiya_yox():
    return get_excuse_by_category("texnologiya_yox")

@app.route('/pul_yox', methods=['GET'])
def get_pul_yox():
    return get_excuse_by_category("pul_yox")

@app.route('/saglamliq_yox', methods=['GET'])
def get_saglamliq_yox():
    return get_excuse_by_category("saglamliq_yox")

@app.route('/qonsu_yox', methods=['GET'])
def get_qonsu_yox():
    return get_excuse_by_category("qonsu_yox")

@app.route('/burokratiya_yox', methods=['GET'])
def get_burokratiya_yox():
    return get_excuse_by_category("burokratiya_yox")

@app.route('/ev_isleri_yox', methods=['GET'])
def get_ev_isleri_yox():
    return get_excuse_by_category("ev_isleri_yox")

@app.route('/felsefi_yox', methods=['GET'])
def get_felsefi_yox():
    return get_excuse_by_category("felsefi_yox")

@app.route('/hava_yox', methods=['GET'])
def get_hava_yox():
    return get_excuse_by_category("hava_yox")

@app.route('/paltar_yox', methods=['GET'])
def get_paltar_yox():
    return get_excuse_by_category("paltar_yox")

@app.errorhandler(404)
def page_not_found(e):
    messages = [
        "Bura gəlmək üçün iznin yoxdu, qayıt.",
        "Düz gəlməmisən, buralar boşdu.",
        "Axtardığın səhifə çoxdan 'yox' olub.",
        "Bu endpointdə sənə bir 'yox' da düşmür.",
        "404! Deyəsən, səhv ünvandasan, bura 'yox'lar diyarı deyil."
    ]
    return jsonify({"xeta": random.choice(messages), "status_kodu": 404}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))

