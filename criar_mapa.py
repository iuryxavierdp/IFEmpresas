import pandas as pd
import folium as fl

df_empresas = pd.read_csv('empresas.txt')
nomes = df_empresas['Nome'].tolist()
latitudes = df_empresas['Latitude'].tolist()
longitudes = df_empresas['Longitude'].tolist()
imagens = df_empresas['Img'].tolist

tiles = 'CartoDB.Positron'
attr = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

mapa = fl.Map(
    location=[-21.387807, -42.696780], 
    zoom_start=15,
    tiles= tiles,
    attr= attr
    )

for index, row in df_empresas.iterrows():
    html = f"""
    <div style="text-align: center;">
            <h1 style="margin: 0;">{row['Nome']}</h1>
            <img src="{row['Img']}" alt="{row['Nome']}" style="width:426px;height:240px;">
            <p style="font-size: 10px; margin: 0; padding-top: 5px;">
                Lat: {row['Latitude']} | Lon: {row['Longitude']}
            </p>
        </div>
    </p>
    """

    fl.Marker(
        location=[row['Latitude'], row['Longitude']], 
        popup = html,
        icon = fl.Icon(color='green', icon='building', prefix='fa')
    ).add_to(mapa)

mapa.save("mapa.html")