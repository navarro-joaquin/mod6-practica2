<template>
    <div>
        <h3>Registrar una nueva Reseña</h3>
        <form @submit.prevent="submitForm">
            <div class="form-group mb-3">
                <label for="texto">Texto:</label>
                <textarea type="text" name="texto" id="texto" v-model="review.texto" :class="{ 'is-invalid': errors.texto }" class="form-control" placeholder="Titulo" style="height: 150px;"></textarea>
                <div v-if="errors.texto" class="invalid-feedback">
                    {{ errors.texto }}
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="calificacion">Calificación:</label>
                <input type="number" name="calificacion" id="calificacion" v-model="review.calificacion" :class="{ 'is-invalid': errors.calificacion }" class="form-control" placeholder="Calificación">
                <div v-if="errors.calificacion" class="invalid-feedback">
                    {{ errors.calificacion }}
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="bookId">Libro:</label>
                <select name="bookId" id="bookId" v-model="review.bookId" :class="{ 'is-invalid': errors.bookId }" class="form-select">
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
    name: 'RegisterReview',
    data() {
        return {
            books: [],
            review: {
                texto: null,
                calificacion: null,
                bookId: null,
            },
            errors: {}
        };
    },
    methods: {
        validar() {
            if (!this.review.texto) {
                this.errors.texto = 'El texto es requerido';
            }

            if (!this.review.calificacion) {
                this.errors.calificacion = 'La calificacion es requerida';
            } else if (this.review.calificacion < 1 || this.review.calificacion > 10) {
                this.errors.calificacion = 'La calificacion debe estar entre 1 y 10';
            }

            if (!this.review.bookId) {
                this.errors.bookId = 'El libro es requerido';
            }

            return Object.keys(this.errors).length === 0;
        },
        submitForm() {
            if (this.validar()) {
                this.guardar();

                this.review = {
                    texto: null,
                    calificacion: null,
                    bookId: null
                }
            }
        },
        guardar() {
            const vm = this;
            this.axios.post(this.baseUrl + '/reviews', this.book)
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
    }
}
</script>