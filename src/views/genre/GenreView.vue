<template>
    <Modal v-model:modelValue="showModalNuevo">
        <RegisterGenreView @on-register="onRegister($event)" />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
        <EditGenreView :genre="genreToEdit" @on-update="onUpdate($event)" />
    </Modal>
    <div class="card">
        <div class="card-body">
            <h2>Lista de Géneros</h2>
            <div class="row">
                <div class="col-10">
                    <input class="form-control mb-2" type="search" style="float: right;" v-model="textoSearch" @search="buscar()" placeholder="Buscar por nombre">
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-success mb-2" @click="showModalNuevo = true"><i class="bi bi-plus"></i> Nuevo registro</button>
                </div>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(genre, index) in genres" :key="index">
                        <td>{{ 1 + index }}</td>
                        <td>{{ genre.nombre }}</td>
                        <td>
                            <button type="button" class="btn btn-info btn-sm" @click="editGenre(genre)"><i class="bi bi-pen"></i></button>
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteGenre(genre.id)"><i class="bi bi-trash"></i></button>
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
import RegisterGenreView from './RegisterGenreView.vue'
import EditGenreView from './EditGenreView.vue'
export default {
    
    name: 'GenreView',
    data() {
        return {
            textoSearch: '',
            showModalNuevo: false,
            showModalEdit: false,
            genreToEdit: null,
            genres: []
        }
    },
    components: {
        Modal,
        RegisterGenreView,
        EditGenreView
    },
    methods: {
        buscar() {
            this.getGenres();
        },
        getGenres() {
            const vm = this;
            this.axios.get(this.baseUrl + '/genres?q=' + this.textoSearch)
                .then(function (response) {
                    // console.log(response);
                    vm.genres = response.data
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        editGenre(genre) {
            this.genreToEdit = Object.assign({}, genre);
            this.showModalEdit = true;
        },
        deleteGenre(id) {
            if (confirm("¿Está seguro que desea eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + '/genres/' + id)
                    .then(function (response) {
                        vm.getGenres();
                        vm.$toast.show("Registro eliminado", "danger");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        onRegister(event) {
            console.log("on register");
            this.getGenres();
            this.showModalNuevo = false;
            this.$toast.show("Registro creado", "success");
        },
        onUpdate(event) {
            console.log("on update");
            this.getGenres();
            this.showModalEdit = false;
            this.genreToEdit = null;
            this.$toast.show("Registro actualizado", "info");
        }
    },
    computed: {
        ...mapGetters(['getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        }
    },
    mounted() {
        this.getGenres();
    }
}
</script>

<style scoped>

</style>