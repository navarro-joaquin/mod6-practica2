<template>
    <div>
        <h3>Editar un Autor</h3>
        <form @submit.prevent="submitForm()">
            <div class="form-group mb-3">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="author.nombre" :class="{ 'is-invalid': errors.nombre }" class="form-control" placeholder="Nombre" />
                <div v-if="errors.nombre" class="invalid-feedback">
                    {{ errors.nombre }}
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="biografia">Biografia:</label>
                <textarea type="text" id="biografia" v-model="author.biografia" style="height: 150px" :class="{ 'is-invalid': errors.biografia }" class="form-control" placeholder="Biografia"></textarea>
                <div v-if="errors.biografia" class="invalid-feedback">
                    {{ errors.biografia }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Registrar</button>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'EditAuthor',
    data() {
        return {
            errors: {}
        }
    },
    props: ['author'],
    methods: {
        validar() {
            this.errors = {};

            if (!this.author.nombre) {
                this.errors.nombre = 'El nombre es requerido';
            }

            if (!this.author.biografia) {
                this.errors.biografia = 'La biografia es requerida';
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
            this.axios.patch(this.baseUrl + '/authors/' + this.author.id, this.author)
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