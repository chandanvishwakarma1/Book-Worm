import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { BACKEND_API_URL } from '@env';

export const useAuthStore = create((set)=> ({
    user: null,
    token: null,
    isLoading: false,
    isCheckingAuth: true,

    register: async ( username, email, password ) => {
        set({isLoading:true});

        try {
            console.log("hitting url: ", `${BACKEND_API_URL}/auth/register`);
            const response = await fetch(`${BACKEND_API_URL}/auth/register`, {
            // const response = await fetch(`http://localhost:3000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const data = await response.json();

            if(!response.ok) throw new Error(data.message || 'Something went wrong');

            console.log('Raw user from authStore: ',data.user);
            console.log('JSON user from authStore: ',JSON.stringify(data.user));


            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({token: data.token, user: data.user, isLoading:false});

            return ({success: true})
        } catch (error) {
            set({isLoading: false});
            return { success: false, error:error.message};
            
        }
    },

    logIn: async (email, password) => {
        set({isLoading:true});
        try {
            console.log("hitting url: ", `${BACKEND_API_URL}/auth/login`);
            const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
            // const response = await fetch(`http://localhost:3000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message || 'Something went wrong');


            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);
            

            set({token: data.token, user: data.user, isLoading:false});

            return ({success: true})

        } catch (error) {
            
            set({isLoading: false});
            return { success: false, error:error.message};
            
        }
    },
     checkAuth: async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const userJson = await AsyncStorage.getItem("user");
                const user = userJson ? JSON.parse(userJson) : null;
    
                set({token, user});
            } catch (error) {
                console.log("Auth check failed:", error)
            } finally {
                set({isCheckingAuth: false});
            }
    },
    
    logOut: async () => {
            try {
                await AsyncStorage.removeItem("user");
                await AsyncStorage.removeItem("token");
                
                set({ token:null, user: null})
    
                // set({})
            } catch (error) {
                console.log("Error Logging out: ", error);
            }
        }
    }))
