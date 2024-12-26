<template>
    <Modal v-model:modelValue="showModalNuevo">
        <RegisterAuthorView @on-register="onRegister($event)" />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
        <EditAuthorView :author="authorToEdit" @on-update="onUpdate($event)" />
    </Modal>
    <div class="card">
        <div class="card-body">
            <h1>Lista de Autores</h1>
            <button type="button" class="btn btn-primary mb-2" @click="showModalNuevo = true">Nuevo registro</button>
            <input class="form-control mb-2" type="search" style="float: right;" v-model="textoSearch" @search="buscar()" placeholder="Buscar por nombre">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Biografia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(author, index) in authors" :key="index">
                        <td>{{ 1 + index }}</td>
                        <td>{{ author.nombre }}</td>
                        <td>{{ author.biografia }}</td>
                        <td>
                            <button type="button" class="btn btn-info btn-sm" @click="editAuthor(author)"><i class="bi bi-pen"></i></button>
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteAuthor(author.id)"><i class="bi bi-trash"></i></button>
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
import RegisterAuthorView from './RegisterAuthorView.vue'
import EditAuthorView from './EditAuthorView.vue'
export default {
    
    name: 'AuthorView',
    data() {
        return {
            textoSearch: '',
            showModalNuevo: false,
            showModalEdit: false,
            authorToEdit: null,
            authors: []
        }
    },
    components: {
        Modal,
        RegisterAuthorView,
        EditAuthorView
    },
    methods: {
        buscar() {
            this.getAuthors();
        },
        getAuthors() {
            const vm = this;
            this.axios.get(this.baseUrl + '/authors?q=' + this.textoSearch)
                .then(function (response) {
                    // console.log(response);
                    vm.authors = response.data
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        editAuthor(author) {
            this.authorToEdit = Object.assign({}, author);
            this.showModalEdit = true;
        },
        deleteAuthor(id) {
            if (confirm("¿Está seguro que desea eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + '/authors/' + id)
                    .then(function (response) {
                        vm.getAuthors();
                        vm.$toast.show("Registro eliminado", "danger");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        onRegister(event) {
            console.log("on register");
            this.getAuthors();
            this.showModalNuevo = false;
            this.$toast.show("Registro creado", "success");
        },
        onUpdate(event) {
            console.log("on update");
            this.getAuthors();
            this.showModalEdit = false;
            this.authorToEdit = null;
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
        this.getAuthors();
    }
}
</script>

<style scoped>

</style>