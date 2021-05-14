// Milestone 1:Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare aschermo i seguenti valori per ognifilm trovato:
// 1.Titolo
// 2.Titolo Originale
// 3.Lingua
// 4.Voto


// Milestone 2:Trasformiamo la stringa statica della lingua in unavera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono inFontAwesome).Allarghiamo poi la ricerca anche alle serie tv. Conla stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)Qui un esempio di chiamata per le serie tv:https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs



/* 
Le bandiere rappresentano dei country e non le languages ! Vuol dire che non potete usare direttamente i codici che vi restituisce l'API per cercare una bandiera nel CSS menzionato sopra.... Dovete definire voi una mappa. Come? Esempio...definisco la mappa ( non le mappo tutte, solo le piu importanti, altrimenti ci perdo la vista... )
const lang2country = { 
    'en': ['gb', 'us', 'ca'],
    'es': ['es', 'ar', ....],
    ........................
 }
 // scelgo una bandiera che usero' in caso non trovassi quelle che cercavo
 const fallbackFlag = ....
 // ottengo la lingua di cui voglio trovare le bandiere dei country associati
 const queryLang = ...;
 // cerco le bandiere a partire dalla mappa e le salvo per essere usate successivamente
 const candidatesCountries = Object.keys(lang2country).includes(queryLang) ? lang2country[queryLang] : [fallbackFlag]
 // Object.keys() andatelo a vedere su MDN 
 // .includes() lo conoscete
 // il ternario semplifica un blocco if/else in una riga
*/



new Vue({
    el: '#app',
    data: {
        moviesList: [],
        tvSeriesList: [],
        textToSearch: "",
        tmdbApiKey: "6b350ec46cfeb65b477fdc2bd01d820a",
        
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
                    this.moviesList.concat(this.tvSeriesList)
                    this.moviesList=this.moviesList
                }

            const lang2country = { 
            'en': ['gb', 'us', 'ca'],
            'es': ['es', 'ar'],
            'it':['it'],
            'fr':['fr'],
            'de':['de'],
            'cn':['cn'],
            };
            const  fallbackFlag ="va";
            const queryLang = films.original_language ;

            const candidatesCountries = Object.keys(lang2country).includes(queryLang) ? lang2country[queryLang] : [fallbackFlag];


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