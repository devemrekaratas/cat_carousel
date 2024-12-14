import { signInWithEmailAndPassword, type User, GoogleAuthProvider, signInWithPopup, updateProfile, createUserWithEmailAndPassword, getIdToken, onAuthStateChanged, signOut } from "firebase/auth"
import type { ILoginCredentials, IRegisterCredentials } from "~/types"

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const googleAuthProvider = new GoogleAuthProvider()
    const toast = useToast()

    const state = reactive({
        firebaseToken: null as string | null,
        currentUser: null as User | null,
    })

    const login = async (loginCredentials: ILoginCredentials) => {
        const { email, password } = loginCredentials;
        try {
            await signInWithEmailAndPassword(auth!, email, password)
            await navigateTo('/dashboard', { replace: true })
            toast.add({ description: 'Successfully logged in', color: 'success' })
        } catch (error: any) {
            toast.add({ title: 'Error', description: error.message, color: 'error' })
            console.error('Login error:', error.message)
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth!, googleAuthProvider)
            await navigateTo('/dashboard', { replace: true })
            toast.add({ description: 'Successfully logged in', color: 'success' })
        } catch (error: any) {
            toast.add({ description: error.message, color: 'error' })
        }
    }

    const register = async (registerCredentials: IRegisterCredentials) => {
        const { displayName, email, password } = registerCredentials
        try {
            const { user } = await createUserWithEmailAndPassword(auth!, email, password)
            await updateProfile(user, {
                displayName: displayName
            })
            await navigateTo('/dashboard', { replace: true })
            toast.add({ description: 'Successfully registered', color: 'success' })
        } catch (error: any) {
            toast.add({ description: error.message, color: 'error' })
        }
    }

    const signUpWithGoogle = async () => {
        try {
            await signInWithPopup(auth!, googleAuthProvider)
            await navigateTo("/dashboard", { replace: true })
            toast.add({ description: 'Successfully registered', color: 'success' })
        } catch (error: any) {
            toast.add({ description: error.message, color: 'error' })
        }
    }

    const getCurrentUserData = async () => {
        state.currentUser = await getCurrentUser()
    }

    const logout = async () => {
        await signOut(auth!)
        await navigateTo('/', { replace: true })
        state.currentUser = null
        state.firebaseToken = null

    }

    return { state, login, register, signInWithGoogle, signUpWithGoogle, getCurrentUserData, logout }
})