import pandas as pd
from googletrans import Translator
import time
import openpyxl

translator = Translator()

def traduzir_campo(texto, idioma_destino='en'):
    """Traduz um único texto, se for uma string válida e não estiver vazio."""
    if pd.isna(texto) or texto == "" or not isinstance(texto, str):
        return texto
    try:
        time.sleep(0.5) 
        traducao = translator.translate(texto, dest=idioma_destino).text
        return traducao
    except Exception as e:
        print(f"Erro ao traduzir: '{texto}'. Erro: {e}")
        return texto

ARQUIVO_ORIGEM = 'dados/empresas.xlsx'
ARQUIVO_DESTINO = 'dados/empresas_en.xlsx'

COLUNAS_PARA_TRADUZIR = [
    'SEGMENTO_DE_ATUAÇÃO', 
    'HISTÓRIA_BREVE', 
    'TIPO_DE_EMPRESA', 
    'CONTRIBUIÇÃO_ECONOMIA_LOCAL', 
    'CERTIFICAÇÕES_E_PRÊMIOS', 
    'ABRANGÊNCIA_PRODUÇÃO'
]

try:
    df = pd.read_excel(ARQUIVO_ORIGEM, sheet_name=0)
    print(f"Planilha '{ARQUIVO_ORIGEM}' carregada com sucesso.")
except FileNotFoundError:
    print(f"ERRO: Arquivo '{ARQUIVO_ORIGEM}' não encontrado. Verifique o nome do arquivo.")
    exit()

print("Iniciando tradução (pode levar alguns minutos)...")

for coluna in COLUNAS_PARA_TRADUZIR:
    df[coluna] = df[coluna].apply(traduzir_campo, idioma_destino='en')
    print(f"Coluna '{coluna}' traduzida.")

col_mapping = {
    'NOME_EMPRESA': 'COMPANY_NAME',
    'ENDEREÇO': 'ADDRESS',
    'SEGMENTO_DE_ATUAÇÃO': 'SECTOR_OF_ACTIVITY',
    'HISTÓRIA_BREVE': 'BRIEF_HISTORY',
    'TIPO_DE_EMPRESA': 'COMPANY_TYPE',
    'CONTRIBUIÇÃO_ECONOMIA_LOCAL': 'LOCAL_ECONOMY_CONTRIBUTION',
    'CERTIFICAÇÕES_E_PRÊMIOS': 'CERTIFICATIONS_AND_AWARDS',
    'ABRANGÊNCIA_PRODUÇÃO': 'PRODUCTION_COVERAGE',
    'LATITUDE': 'LATITUDE', 
    'LONGITUDE': 'LONGITUDE', 
    'IMAGEM': 'IMAGE', 
    'NUM_FUNCIONÁRIOS': 'NUM_EMPLOYEES'
}

df = df.rename(columns=col_mapping)
print("\nCabeçalhos das colunas traduzidos.")

df.to_excel(ARQUIVO_DESTINO, index=False)
print(f"\n--- SUCESSO! ---\nPlanilha traduzida salva como '{ARQUIVO_DESTINO}'.")