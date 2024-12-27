<template>
    <Modal v-model:modelValue="showModalNuevo">
        <RegisterBookView @on-register="onRegister($event)" />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
        <EditBookView :book="bookToEdit" @on-update="onUpdate($event)" />
    </Modal>
    <div class="card">
        <div class="card-body">
            <h2>Lista de Libros</h2>
            <div class="row">
                <div class="col-10">
                    <input class="form-control mb-2" type="search" style="float: right;" v-model="textoSearch" @search="buscar()" placeholder="Buscar por titulo">
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-success mb-2" @click="showModalNuevo = true"><i class="bi bi-plus"></i> Nuevo registro</button>
                </div>
            </div>
            <div>
                <h4>Filtros</h4>
                <form @submit.prevent="filtrar()">
                        <div class="row">
                            <div class="col-4 offset-2 mb-3">
                                <label for="autor">Autor:</label>
                                <select name="autor" id="autor" class="form-select" v-model="filtro.authorId">
                                    <option value="">Todos</option>
                                    <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.nombre }}</option>
                                </select>
                            </div>
                            <div class="col-4 mb-3">
                                <label for="genero">Genero:</label>
                                <select name="genero" id="genero" class="form-select" v-model="filtro.genreId">
                                    <option value="">Todos</option>
                                    <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.nombre }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-warning">Filtrar</button>
                            </div>
                        </div>
                </form>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Publicación</th>
                        <th>Autor</th>
                        <th>Género</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book, index) in books" :key="index">
                        <td>{{ 1 + index }}</td>
                        <td>{{ book.titulo }}</td>
                        <td>{{ book.publicacion }}</td>
                        <td>{{ book.author.nombre }}</td>
                        <td>{{ book.genre.nombre }}</td>
                        <td>
                            <button type="button" class="btn btn-info btn-sm" @click="editBook(book)"><i class="bi bi-pen"></i></button>
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteBook(book.id)"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Modal from '../../components/Modal.vue'
import RegisterBookView from './RegisterBookView.vue'
import EditBookView from './EditBookView.vue'
export default {
    
    name: 'BookView',
    data() {
        return {
            textoSearch: '',
            textoFiltro: '',
            showModalNuevo: false,
            showModalEdit: false,
            bookToEdit: null,
            books: [],
            authors: [],
            genres: [],
            filtro: {
                authorId: null,
                genreId: null
            }
        }
    },
    components: {
        Modal,
        RegisterBookView,
        EditBookView
    },
    methods: {
        buscar() {
            this.getBooks();
        },
        getBooks() {
            const vm = this;
            this.axios.get(this.baseUrl + '/books?_expand=author&_expand=genre' + this.textoFiltro + '&q=' + this.textoSearch)
                .then(function (response) {
                    // console.log(response);
                    vm.books = response.data
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        editBook(book) {
            this.bookToEdit = Object.assign({}, book);
            this.showModalEdit = true;
        },
        deleteBook(id) {
            if (confirm("¿Está seguro que desea eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + '/books/' + id)
                    .then(function (response) {
                        vm.getBooks();
                        vm.$toast.show("Registro eliminado", "danger");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        onRegister(event) {
            console.log("on register");
            this.getBooks();
            this.showModalNuevo = false;
            this.$toast.show("Registro creado", "success");
        },
        onUpdate(event) {
            console.log("on update");
            this.getBooks();
            this.showModalEdit = false;
            this.bookToEdit = null;
            this.$toast.show("Registro actualizado", "info");
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
        },
        filtrar() {
            this.textoFiltro = '';
            if (this.filtro.authorId) {
                this.textoFiltro += '&authorId=' + this.filtro.authorId;
            }
            if (this.filtro.genreId) {
                this.textoFiltro += '&genreId=' + this.filtro.genreId;
            }
            this.getBooks();
        }
    },
    computed: {
        ...mapGetters(['getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        }
    },
    mounted() {
        this.getBooks();
        this.getAuthors();
        this.getGenres();
    }
}
</script>

<style scoped>

</style>