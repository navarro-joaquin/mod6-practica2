<template>
    <div>
        <h3>Editar una Reseña</h3>
        <form @submit.prevent="submitForm" v-if="review">
            <div class="form-group mb-3">
                <label for="texto">Texto:</label>
                <textarea type="text" name="texto" id="texto" v-model="form.texto" :class="{ 'is-invalid': errors.texto }" class="form-control" placeholder="Titulo" style="height: 300px;"></textarea>
                <div v-if="errors.texto" class="invalid-feedback">
                    {{ errors.texto }}
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="calificacion">Calificación:</label>
                <input type="number" name="calificacion" id="calificacion" v-model="form.calificacion" :class="{ 'is-invalid': errors.calificacion }" class="form-control" placeholder="Calificación">
                <div v-if="errors.calificacion" class="invalid-feedback">
                    {{ errors.calificacion }}
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="bookId">Libro:</label>
                <select name="bookId" id="bookId" v-model="form.bookId" :class="{ 'is-invalid': errors.bookId }" class="form-select">
                    <option v-for="book in books" :key="book.id" :value="book.id">
                        {{ book.titulo }}
                    </option>
                </select>
                <div v-if="errors.bookId" class="invalid-feedback">
                    {{ errors.bookId }}
                </div>
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
    name: 'EditReview',
    data() {
        return {
            books: [],
            errors: {}
        };
    },
    props: ['review'],
    methods: {
        validar() {
            this.errors = {};

            if (!this.review.texto) {
                this.errors.texto = 'El texto es requerido';
            }

            if (!this.review.calificacion) {
                this.errors.calificacion = 'La calificación es requerida';
            }

            if (!this.review.bookId) {
                this.errors.bookId = 'El libro es requerido';
            }

            return Object.keys(this.errors).length === 0;
        },
        submitForm() {
            if (this.validar()) {
                this.guardar();

                this.form = {
                    texto: '',
                    calificacion: '',
                    bookId: null
                }
            }
        },
        guardar() {
            const vm = this;
            this.axios.patch(this.baseUrl + '/reviews/' + this.review.id, this.form)
                .then(function (response) {
                    if (response.status === 200) {
                        vm.$emit('on-update', response.data);
                    }
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getBooks() {
            const vm = this;
            this.axios.get(this.baseUrl + '/books')
                .then(function (response) {
                    vm.books = response.data
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
        },
        form() {
            return Object.assign({}, this.review);
        }
    },
    mounted() {
        this.getBooks();
    }
}
</script>