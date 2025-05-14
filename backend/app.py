from flask import Flask, jsonify, request
import random
import os
from excuses import all_excuses
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['JSON_AS_ASCII'] = False

def get_excuse_by_category(category_key):
    ad = request.args.get('ad')

    excuses_list = all_excuses.get(category_key, all_excuses.get("general", []))
    if not excuses_list:
         return jsonify({"cavab": f"'{category_key}' kateqoriyası üçün bəhanə tapılmadı (və ümumi kateqoriya boşdur)."})

    excuse = random.choice(excuses_list)

    if ad:
        if category_key == "general" and "general" in all_excuses and all_excuses["general"]:
             excuse = random.choice(all_excuses["general"])

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

# Köhnə kateqoriyalar
@app.route('/general', methods=['GET'])
def get_general():
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

# Yeni kateqoriyalar
@app.route('/general_yeni', methods=['GET'])
def get_general_yeni():
    return get_excuse_by_category("general_yeni")

@app.route('/sevgi_yeni', methods=['GET'])
def get_sevgi_yeni():
    return get_excuse_by_category("sevgi_yeni")

@app.route('/dost_yeni', methods=['GET'])
def get_dost_yeni():
    return get_excuse_by_category("dost_yeni")

@app.route('/muellim_yeni', methods=['GET'])
def get_muellim_yeni():
    return get_excuse_by_category("muellim_yeni")

@app.route('/valideyn_yeni', methods=['GET'])
def get_valideyn_yeni():
    return get_excuse_by_category("valideyn_yeni")

@app.route('/is_yeni', methods=['GET'])
def get_is_yeni():
    return get_excuse_by_category("is_yeni")

@app.route('/toy_yeni', methods=['GET'])
def get_toy_yeni():
    return get_excuse_by_category("toy_yeni")

@app.route('/qonaqliq_yeni', methods=['GET'])
def get_qonaqliq_yeni():
    return get_excuse_by_category("qonaqliq_yeni")

@app.route('/yol_yeni', methods=['GET'])
def get_yol_yeni():
    return get_excuse_by_category("yol_yeni")

@app.route('/sosial_media_yeni', methods=['GET'])
def get_sosial_media_yeni():
    return get_excuse_by_category("sosial_media_yeni")

@app.route('/oyun_yeni', methods=['GET'])
def get_oyun_yeni():
    return get_excuse_by_category("oyun_yeni")

@app.route('/texnologiya_yeni', methods=['GET'])
def get_texnologiya_yeni():
    return get_excuse_by_category("texnologiya_yeni")

@app.route('/pul_yeni', methods=['GET'])
def get_pul_yeni():
    return get_excuse_by_category("pul_yeni")

@app.route('/saglamliq_yeni', methods=['GET'])
def get_saglamliq_yeni():
    return get_excuse_by_category("saglamliq_yeni")

@app.route('/qonsu_yeni', methods=['GET'])
def get_qonsu_yeni():
    return get_excuse_by_category("qonsu_yeni")

@app.route('/burokratiya_yeni', methods=['GET'])
def get_burokratiya_yeni():
    return get_excuse_by_category("burokratiya_yeni")

@app.route('/ev_isleri_yeni', methods=['GET'])
def get_ev_isleri_yeni():
    return get_excuse_by_category("ev_isleri_yeni")

@app.route('/felsefi_absurd_yeni', methods=['GET'])
def get_felsefi_absurd_yeni():
    return get_excuse_by_category("felsefi_absurd_yeni")

@app.route('/hava_yeni', methods=['GET'])
def get_hava_yeni():
    return get_excuse_by_category("hava_yeni")

@app.route('/paltar_yeni', methods=['GET'])
def get_paltar_yeni():
    return get_excuse_by_category("paltar_yeni")

# Xüsusi yeni kateqoriyalar
@app.route('/astroloji_mistik_yeni', methods=['GET'])
def get_astroloji_mistik_yeni():
    return get_excuse_by_category("astroloji_mistik_yeni")

@app.route('/suni_intellekt_yeni', methods=['GET'])
def get_suni_intellekt_yeni():
    return get_excuse_by_category("suni_intellekt_yeni")

@app.route('/post_sovet_mentalitet_yeni', methods=['GET'])
def get_post_sovet_mentalitet_yeni():
    return get_excuse_by_category("post_sovet_mentalitet_yeni")

@app.route('/yaradiciliq_ilham_yeni', methods=['GET'])
def get_yaradiciliq_ilham_yeni():
    return get_excuse_by_category("yaradiciliq_ilham_yeni")

@app.route('/sosial_tesevvur_yeni', methods=['GET'])
def get_sosial_tesevvur_yeni():
    return get_excuse_by_category("sosial_tesevvur_yeni")

# Geriyə uyğunluq üçün
@app.route('/yox', methods=['GET'])
def get_yox():
    return get_excuse_by_category("general")

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