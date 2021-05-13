// Milestone 1:Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare aschermo i seguenti valori per ognifilm trovato:
// 1.Titolo
// 2.Titolo Originale
// 3.Lingua
// 4.Voto


// Milestone 2:Trasformiamo la stringa statica della lingua in unavera e propria bandiera dellanazione corrispondente, gestendo il caso in cui non abbiamo la bandiera dellanazione ritornata dall’API (le flag non ci sono inFontAwesome).Allarghiamo poi la ricerca anche alle serie tv. Conla stessa azione di ricercadovremo prendere sia i film che corrispondono allaquery, sia le serie tv, standoattenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON dirisposta diversi, simili ma non sempre identici)Qui un esempio di chiamata per le serie tv:https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs





new Vue({
    el: '#app',
    data: {
        moviesList: [],
        tvSeriesList: [],
        textToSearch: "",
        tmdbApiKey: "6b350ec46cfeb65b477fdc2bd01d820a",
        // flagsMap:{
        //     en:"https:" oppure una classe
        // }
    },

    methods: {
        makeAxiosSearch(searchType) {
            const axiosOptions = {
                params: {
                    api_key: this.tmdbApiKey,
                    query: this.textToSearch,
                    language: "it-IT",
                }
            };



            /*
                    AVREI POTUTO SCRIVERE ANCHE COSI..
    
                        axios.get("https://api.themoviedb.org/3/search/movie?api_key= " + variabileapikey(POSIZIONATO IN DATA) + "&query=" + this.      textToSearch + "&language=it-IT")
    
                        CONSULTARE AXIOS --> VIEW GITHUB EXAMPLES 
    
                        Opppure avresti potute mettere dentro un cost in METHODS (dentro la funzione " in questo caso doSearch") e metterci dentro con una      graffa i params e invece dopo axios mettere la virgola e solo il nome della variabile...esempio: const axiosOptions = {
                            params: {
                                api_key: this.tmdbApiKey,
                                query: this.textToSearch,
                                language: "it-IT",
                            }

                            OPPURE

                        axios.get("https://api.themoviedb.org/3/search/movie", {   
                            params: {
                                api_key: this.tmdbApiKey,
                                query: this.textToSearch,
                                language: "it-IT",
                                }
                        

                */
            axios.get("https://api.themoviedb.org/3/search/" + searchType, axiosOptions)   
            .then((resp) => {
                if (searchType === "movie") {
                    this.moviesList = resp.data.results
                } else if (searchType === "tv") {
                    this.tvSeriesList = resp.data.results
                    /*
                        So che le serie tv, al contrario dei movies, hanno il campo name e original_name al posto di title e original_title.
                        Sapendo questo, posso rinominare queste chiavi per renderle uguali a quelle dei movies?

                     */
                    this.tvSeriesList = resp.data.results.map((tvShow) => {
                        /* MAPPATURA DEI CAMPI 

                          So che tvseries ha orginal name invece io voglio original title quindi vado a creare questa chiave original_title e gli assegno il valore di original_name


                          QUINDI VADO A PRENDERE DEI CAMPI ESISTENTI E LI CHIAMO IN UN MODO A ME COMODO

                         */
                        tvShow.original_title = tvShow.original_name
                        tvShow.title = tvShow.name
                        return tvShow
                    })
                }





            })
        },
        doSearch() {
            /*
                -Prendere il testo da ricercare
                    -this.textToSearch
                -Dobbiamo comporre la query string da usare durante la chiamata alle api di TMDB    
                -Eseguo la chiamata all'endpoint che mi serve, inviando la query string appena creata
                -Nel then della risposta, andrò a salvare i dati che ricevo in una  variabile locale
    
    
    
                
            */


            this.makeAxiosSearch("movie")
            this.makeAxiosSearch("tv")

        }
    },
    mounted() {



    },
})