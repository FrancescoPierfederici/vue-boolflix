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

/* 
Milestone 3:
In questa millestone come prima cosa aggiungiamo la copertina del film o della serie
al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
Dovremo prendere quindi l’URL base delle immagini di TMDB:
https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare -
componenti url img : base_url, a file_size and a file_path.
Trasformiamo poi il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze
piene.
*/


// Milestone 4:
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp,
// creando un layout completo simil-Netflix:
// ● Un header che contiene logo e search bar
// ● Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma
// di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio
// la poster_path con w342)
// ● Andando con il mouse sopra una card (on hover), appaiono le informazioni
// aggiuntive già prese nei punti precedenti più la overview

new Vue({
    el: '#app',
    data: {
        // array dove inserire i risultati della ricerca - inseriti sia per  i films e serie TV poichè le chiamate differiscono..
        moviesList: [],
        tvSeriesList: [],
        // v-model per verifica valori inseriti dall'user che saranno parte della mia chiamata API
        textToSearch: "",
        tmdbApiKey: "6b350ec46cfeb65b477fdc2bd01d820a",
        img_baseUrl:"https://image.tmdb.org/t/p/",
        noImg_Url : "img/noposter.png",
        
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
                        tvShow.tvSeries= true
                        return tvShow
                    })
                    this.moviesList.concat(this.tvSeriesList)
                    this.moviesList=this.moviesList
                }

            

            })
        },
         
        // getCast(movie){
            
        //     const axiosOptions = {
        //         params: {
        //             api_key: this.tmdbApiKey,
        //             language: "it-IT",
        //         }
        //     };
        //     const movieType = movie.tvSeries ? "tv": "movie"
        //     axios.get(`https://api.themoviedb.org/3/${movieType}/${movie.id}/credits`, axiosOptions)   
        //     .then((resp) => {
        //         this.$set(movie,"actors"  resp.data.cast


        //     })
        // },






        transformLanguageToFlag(language) {
            const lang2country = { 
            'en': ['gb', 'us', 'ca'],
            'es': ['es', 'ar'],
            'it':['it'],
            'fr':['fr'],
            'de':['de'],
            'cn':['cn'],
            'pt':['pt'],
            'ro':['ro'],
            'jp':['jp'],
            'zh':['ch'],
            'ch':['ch'],
            'ar':['ar'],
            };

            const  fallbackFlag ="va";
            const queryLang = language.original_language ;

            const candidatesCountries = Object.keys(lang2country).includes(queryLang) ? lang2country[queryLang][0] : [fallbackFlag];
            return candidatesCountries
            
        },
        getPoster(film) {
            const posterSize = "w342"
            const posterPath = film.poster_path
            const completePosterPath = this.img_baseUrl + posterSize + posterPath;
            return completePosterPath
        },
        getMovieStars(movie){
            const movieVote= Math.round(movie.vote_average / 2)
            const toReturn =[]
            for (let i = 0; i <= 5; i++) {
                toReturn.push(i <= movieVote )
                
            }
                return toReturn
            
        },
        getPosterOverview(film){
            if(film.overview){
                return  film.overview.substring(0,150) + "..."
            }else{
                return "Non Disponibile"
            }
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
            this.textToSearch = "";

        }
    },
    mounted() {



    },
})