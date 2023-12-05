const axios = require('axios');

class Busqueda {
    historial = ['dato1', 'dato2'];
    constructor() {
        //leer los datos de la DB archivo JSON
    }
    async buscador(tag = 'uniform') {
        let rServer = []
        //se reliza la peticion HTTP
        console.log(tag);
        try {
            //peticion http
            const instancia = axios.create({
                baseURL: 'https://api.jikan.moe/v4/anime',
                params: {
                    'q': tag,
                    'type': 'tv',
                    'page': 1,
                    'limit': process.env.LIMIT_PAGES
                    //aqui va el acces token
                }
            })
            //respuesta que aloja toda la informacion respecto a la consulta del endpoint
            rServer = await instancia.get();
        } catch (error) {
            console.error(error);
        }
        // console.log(rServer)
        return rServer.data.data.map(anime => ({
            id: anime.mal_id,
            title: anime.title
        }));

    }
    // El EndPoint no necesita parametros, solamente concatenar el id
    async buscadorEspecifico(id = '121212') {
        let rServer = []
        //se reliza la peticion HTTP
        try {
            //peticion http
            const instancia = axios.create({
                baseURL: `https://api.jikan.moe/v4/anime/${id}`
                /* params: {
                    'q': tag,
                    'type': 'tv',
                    'page': 1,
                    'limit': process.env.LIMIT_PAGES
                    //aqui va el acces token
                } */
            })
            //respuesta que aloja toda la informacion respecto a la consulta del endpoint
            const response = await instancia.get();
            const { mal_id, images, title, title_english, title_japanese, type, episodes, status, aired, synopsis } = response.data.data;
            return {
                id: mal_id,
                portada: images,
                titulo: title,
                tituloEn: title_english,
                tituloJp: title_japanese,
                tipo: type,
                episodios: episodes,
                estado: status,
                emision: aired,
                termino: aired,
                sinopsis: synopsis
            }
        } catch (error) {
            console.error(error);
        }
        //console.log(rServer)

    }
}

module.exports = { Busqueda }
