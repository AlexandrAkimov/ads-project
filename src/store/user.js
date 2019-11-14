import * as fb from 'firebase'

class User {
    constructor(id) {
        this.id = id
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        async regUser({
            commit
        }, {
            email,
            password
        }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await fb.auth().createUserWithEmailAndPassword(email, password)
                fb.auth().onAuthStateChanged(user => {
                    if (user) {
                        commit('setUser', new User(user.uid))
                        commit('setLoading', false)
                        console.log(user.email)
                    }
                })
                console.log(user.uid)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async logUser({
            commit,
            state
        }, {
            email,
            password
        }) {
            commit('clearError')
            commit('setLoading', true)
            try {

                const user = await fb.auth().signInWithEmailAndPassword(email, password)
                fb.auth().onAuthStateChanged(user => {
                    if (user) {
                        commit('setUser', new User(user.uid))
                        commit('setLoading', false)
                        console.log(user.email)
                    }
                })
                commit('setUser', new User(user.uid))
                commit('setLoading', false)

                console.log(state.user)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        autoLoginUser({
            commit
        }, payload) {
            commit('setUser', new User(payload.uid))
        },
        logoutUser({
            commit
        }) {
            fb.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        isUserLoggedIn(state) {
            return state.user !== null
        }
    }
}