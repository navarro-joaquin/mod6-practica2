<template>
    <Modal v-model:modelValue="showModalNuevo">
        <RegisterReviewView @on-register="onRegister($event)" />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
        <EditReviewView :review="reviewToEdit" @on-update="onUpdate($event)" />
    </Modal>
    <div class="card">
        <div class="card-body">
            <h2>Lista de Reseñas</h2>
            <div class="row">
                <div class="offset-10 col-2">
                    <button type="button" class="btn btn-success mb-2" @click="showModalNuevo = true"><i class="bi bi-plus"></i> Nuevo registro</button>
                </div>
            </div>
            <div>
                <h4>Filtros</h4>
                <form @submit.prevent="filtrar()">
                        <div class="row">
                            <div class="col-4 offset-4 mb-3">
                                <label for="libro">Libro:</label>
                                <select name="libro" id="libro" class="form-select" v-model="filtro.bookId">
                                    <option value="">Todos</option>
                                    <option v-for="book in books" :key="book.id" :value="book.id">{{ book.titulo }}</option>
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
                        <th>Texto</th>
                        <th>Calificación</th>
                        <th>Libro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(review, index) in reviews" :key="index">
                        <td>{{ 1 + index }}</td>
                        <td>{{ review.texto }}</td>
                        <td>{{ review.calificacion }}</td>
                        <td>{{ review.book.titulo }}</td>
                        <td>
                            <button type="button" class="btn btn-info btn-sm" @click="editReview(review)"><i class="bi bi-pen"></i></button>
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteReview(review.id)"><i class="bi bi-trash"></i></button>
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
import RegisterReviewView from './RegisterReviewView.vue'
import EditReviewView from './EditReviewView.vue'
export default {
    
    name: 'ReviewView',
    data() {
        return {
            textoSearch: '',
            textoFiltro: '',
            showModalNuevo: false,
            showModalEdit: false,
            reviewToEdit: null,
            reviews: [],
            books: [],
            filtro: {
                bookId: null,
            }
        }
    },
    components: {
        Modal,
        RegisterReviewView,
        EditReviewView
    },
    methods: {
        buscar() {
            this.getReviews();
        },
        getReviews() {
            const vm = this;
            this.axios.get(this.baseUrl + '/reviews?_expand=book' + this.textoFiltro + '&q=' + this.textoSearch)
                .then(function (response) {
                    console.log(response);
                    vm.reviews = response.data
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        editReview(review) {
            this.reviewToEdit = Object.assign({}, review);
            this.showModalEdit = true;
        },
        deleteReview(id) {
            if (confirm("¿Está seguro que desea eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + '/reviews/' + id)
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
            this.getReviews();
            this.showModalNuevo = false;
            this.$toast.show("Registro creado", "success");
        },
        onUpdate(event) {
            console.log("on update");
            this.getReviews();
            this.showModalEdit = false;
            this.reviewToEdit = null;
            this.$toast.show("Registro actualizado", "info");
        },
        getBooks() {
            const vm = this;
            this.axios.get(this.baseUrl + '/books')
                .then(function (response) {
                    // console.log(response);
                    vm.books = response.data
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        filtrar() {
            this.textoFiltro = '';
            if (this.filtro.bookId) {
                this.textoFiltro += '&bookId=' + this.filtro.bookId;
            }
            this.getReviews();
        }
    },
    computed: {
        ...mapGetters(['getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        }
    },
    mounted() {
        this.getReviews();
        this.getBooks();
    }
}
</script>

<style scoped>

</style>