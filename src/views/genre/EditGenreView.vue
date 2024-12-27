<template>
    <div>
        <h3>Editar un Género</h3>
        <form @submit.prevent="submitForm()">
            <div class="form-group mb-3">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="genre.nombre" :class="{ 'is-invalid': errors.nombre }" class="form-control" placeholder="Nombre" />
                <div v-if="errors.nombre" class="invalid-feedback">
                    {{ errors.nombre }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'EditGenre',
    data() {
        return {
            errors: {}
        }
    },
    props: ['genre'],
    methods: {
        validar() {
            this.errors = {};

            if (!this.genre.nombre) {
                this.errors.nombre = 'El nombre es requerido';
            }

            return Object.keys(this.errors).length === 0;
        },

        submitForm() {
            if (this.validar()) {
                this.guardar();
            }
        },

        guardar() {
            const vm = this;
            this.axios.patch(this.baseUrl + '/genres/' + this.genre.id, this.genre)
                .then(function (response) {
                    if (response.status === 200) {
                        vm.$emit('on-update', response.data);
                    }
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    computed: {
        ...mapGetters(['getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl;
        },
        form() {
            return Object.assign({}, this.author);
        }
    }
}
</script>

<style scoped></style>