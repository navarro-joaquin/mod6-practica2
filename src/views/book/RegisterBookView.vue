<template>
    <div>
        <h3>Registrar un nuevo Libro</h3>
        <form @submit.prevent="submitForm">
            <div class="form-group mb-3">
                <label for="titulo">Titulo:</label>
                <input type="text" name="titulo" id="titulo" v-model="book.titulo" :class="{ 'is-invalid': errors.titulo }" class="form-control" placeholder="Titulo">
            </div>
            <div class="form-group mb-3">
                <label for="publicacion">Publicación:</label>
                <input type="number" name="publicacion" id="publicacion" v-model="book.publicacion" :class="{ 'is-invalid': errors.publicacion }" class="form-control" placeholder="Publicación">
            </div>
            <div class="form-group mb-3">
                <label for="authorId">Autor:</label>
                <select name="authorId" id="authorId" v-model="book.authorId" :class="{ 'is-invalid': errors.authorId }" class="form-control">
                    <option v-for="author in authors" :key="author.id" :value="author.id">
                        {{ author.nombre }}
                    </option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="genreId">Género:</label>
                <select name="genreId" id="genreId" v-model="book.genreId" :class="{ 'is-invalid': errors.genreId }" class="form-control">
                    <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                        {{ genre.nombre }}
                    </option>
                </select>
            </div>
            <div class="form-group mb-3">
                <button type="submit" class="btn btn-primary">Registrar</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'RegisterBook',
    data() {
        return {
            authors: [],
            genres: [],
            book: {
                titulo: null,
                publicacion: null,
                authorId: null,
                genreId: null
            },
            errors: {}
        };
    },
    methods: {
        validar() {
            if (!this.book.titulo) {
                this.errors.titulo = 'El titulo es requerido';
            }

            if (!this.book.publicacion) {
                this.errors.publicacion = 'La publicacion es requerida';
            }

            if (!this.book.authorId) {
                this.errors.authorId = 'El autor es requerido';
            }

            if (!this.book.genreId) {
                this.errors.genreId = 'El género es requerido';
            }

            return Object.keys(this.errors).length === 0;
        },
        submitForm() {
            if (this.validar()) {
                this.guardar();

                this.book = {
                    titulo: null,
                    publicacion: null,
                    authorId: null,
                    genreId: null
                }
            }
        },
        guardar() {
            const vm = this;
            this.axios.post(this.baseUrl + '/books', this.book)
                .then(function (response) {
                    if (response.status === 201) {
                        vm.$emit('on-register', response.data);
                    }
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getAuthors() {
            const vm = this;
            this.axios.get(this.baseUrl + '/authors')
                .then(function (response) {
                    // console.log(response);
                    vm.authors = response.data
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getGenres() {
            const vm = this;
            this.axios.get(this.baseUrl + '/genres')
                .then(function (response) {
                    // console.log(response);
                    vm.genres = response.data
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    },
    computed: {
        ...mapGetters(['getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        }
    },
    mounted() {
        this.getAuthors();
        this.getGenres();
    }
}
</script>