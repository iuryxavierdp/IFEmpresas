import pandas as pd
from googletrans import Translator
import time
import openpyxl # Necessário para ler e escrever arquivos .xlsx

# Inicializa o tradutor (a biblioteca googletrans usa o Google Translate)
translator = Translator()

def traduzir_campo(texto, idioma_destino='en'):
    """Traduz um único texto, se for uma string válida e não estiver vazio."""
    # Verifica se o valor é NaN (Not a Number), vazio ou não é uma string
    if pd.isna(texto) or texto == "" or not isinstance(texto, str):
        return texto # Retorna o valor original (ex: coordenadas, números, células vazias)
    try:
        # A API gratuita pode ser bloqueada se traduzir muito rápido. Usamos um pequeno atraso.
        time.sleep(0.5) 
        traducao = translator.translate(texto, dest=idioma_destino).text
        return traducao
    except Exception as e:
        print(f"Erro ao traduzir: '{texto}'. Erro: {e}")
        return texto # Retorna o texto original em caso de falha na tradução

# --- Configuração ---
ARQUIVO_ORIGEM = 'dados/empresas.xlsx'
ARQUIVO_DESTINO = 'dados/empresas_en.xlsx'

# Colunas que contêm texto em português e DEVEM ser traduzidas.
# Colunas como LATITUDE, LONGITUDE, IMAGEM e NUM_FUNCIONÁRIOS devem ser excluídas.
COLUNAS_PARA_TRADUZIR = [
    'SEGMENTO_DE_ATUAÇÃO', 
    'HISTÓRIA_BREVE', 
    'TIPO_DE_EMPRESA', 
    'CONTRIBUIÇÃO_ECONOMIA_LOCAL', 
    'CERTIFICAÇÕES_E_PRÊMIOS', 
    'ABRANGÊNCIA_PRODUÇÃO'
]
# --------------------


# 1. Carregar a planilha
try:
    df = pd.read_excel(ARQUIVO_ORIGEM, sheet_name=0)
    print(f"Planilha '{ARQUIVO_ORIGEM}' carregada com sucesso.")
except FileNotFoundError:
    print(f"ERRO: Arquivo '{ARQUIVO_ORIGEM}' não encontrado. Verifique o nome do arquivo.")
    exit()

print("Iniciando tradução (pode levar alguns minutos)...")

# 2. Aplicar a função de tradução a cada coluna
for coluna in COLUNAS_PARA_TRADUZIR:
    # A função .apply() aplica a função 'traduzir_campo' a cada célula da coluna
    df[coluna] = df[coluna].apply(traduzir_campo, idioma_destino='en')
    print(f"Coluna '{coluna}' traduzida.")

# 3. Traduzir também o cabeçalho das colunas (opcional, mas recomendado)
col_mapping = {
    'NOME_EMPRESA': 'COMPANY_NAME',
    'ENDEREÇO': 'ADDRESS',
    'SEGMENTO_DE_ATUAÇÃO': 'SECTOR_OF_ACTIVITY',
    'HISTÓRIA_BREVE': 'BRIEF_HISTORY',
    'TIPO_DE_EMPRESA': 'COMPANY_TYPE',
    'CONTRIBUIÇÃO_ECONOMIA_LOCAL': 'LOCAL_ECONOMY_CONTRIBUTION',
    'CERTIFICAÇÕES_E_PRÊMIOS': 'CERTIFICATIONS_AND_AWARDS',
    'ABRANGÊNCIA_PRODUÇÃO': 'PRODUCTION_COVERAGE',
    # Manter o nome das colunas que não traduzem texto
    'LATITUDE': 'LATITUDE', 
    'LONGITUDE': 'LONGITUDE', 
    'IMAGEM': 'IMAGE', 
    'NUM_FUNCIONÁRIOS': 'NUM_EMPLOYEES'
}
# Renomeia as colunas no DataFrame
df = df.rename(columns=col_mapping)
print("\nCabeçalhos das colunas traduzidos.")

# 4. Salvar a nova planilha traduzida
df.to_excel(ARQUIVO_DESTINO, index=False)
print(f"\n--- SUCESSO! ---\nPlanilha traduzida salva como '{ARQUIVO_DESTINO}'.")