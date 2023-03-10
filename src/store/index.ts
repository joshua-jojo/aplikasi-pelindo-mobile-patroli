import { createStore } from 'vuex'
import { ref } from 'vue'
const store = createStore({
    state() {
        return {
            login : false,
            user : {
                nama : null,
                email : null,
                token : null,
            },
            cari:ref('')
        }
    },
    mutations: {
    }
})
export default store