<template>
    <div>
        <h3>Registrar un nuevo Género</h3>
        <form @submit.prevent="submitForm()">
            <div class="form-group mb-3">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="genre.nombre" :class="{ 'is-invalid': errors.nombre }" class="form-control" placeholder="Nombre" />
                <div v-if="errors.nombre" class="invalid-feedback">
                    {{ errors.nombre }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Registrar</button>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'RegisterGenre',
    data() {
        return {
            genre: {
                nombre: ''
            },
            errors: {}
        }
    },
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

                this.genre = {
                    nombre: ''
                };
            }
        },

        guardar() {
            const vm = this;
            this.axios.post(this.baseUrl + '/genres', this.genre)
                .then(function (response) {
                    if (response.status === 201) {
                        vm.$emit('on-register', response.data);
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
        }
    }
}
</script>

<style scoped></style>