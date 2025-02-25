<template>
  <v-container class="d-flex align-center justify-center min-vh-100">
    <v-card
      class="pa-6 rounded-lg shadow-lg"
      max-width="400"
    >
      <!-- <h2 v-if="!forgotPassword.active">
        {{ isRegistering ? "Registrarse" : "Iniciar Sesión" }}
      </h2>
      <h2 v-else>
        {{ forgotPassowrdStepTittle }}
      </h2> -->
      <!-- login form-->
      <v-form
        v-if="!isRegistering && !forgotPassword.active"
        @submit.prevent="handleLogin"
      >
        <h2 class="text-center text-h5 font-weight-bold mb-4">
          Iniciar Sesión
        </h2>
        <v-text-field
          v-model="loginForm.identifier"
          placeholder="Usuario o Correo"
          required
        />
        <v-text-field
          v-model="loginForm.password"
          type="password"
          placeholder="Contraseña"
          required
        />
        <v-btn
          type="sumit"
          block
          class="bg-blue-darken-1 text-white"
        >
          Ingresar
        </v-btn>
        <v-btn
          text
          class="mt-2 text-blue"
          @click="forgotPassword.active = true; forgotPassword.step = 1"
        >
          ¿Olvidaste tu contraseña?
        </v-btn>
        <v-btn
          text
          class="mt-1"
          @click="isRegistering = true"
        >
          ¿No tienes cuenta? Regístrate aquí
        </v-btn>
      </v-form>

      <!-- Sign up form-->
      <v-form
        v-else-if="isRegistering && !forgotPassword.active"
        @submit.prevent="handleRegister"
      >
        <h2 class="text-center text-h5 font-weight-bold mb-4">
          Registro
        </h2>

        <v-text-field
          v-model="registerForm.firstName"
          placeholder="Nombres"
          required
        />
        <v-text-field
          v-model="registerForm.lastName"
          placeholder="Apellidos"
          required
        />
        <v-text-field
          v-model="registerForm.userName"
          placeholder="Nombre de usuario"
          required
        />
        <v-text-field
          v-model="registerForm.email"
          type="email"
          placeholder="Correo"
          required
        />
        <v-text-field
          v-model="registerForm.phone"
          placeholder="Teléfono"
          required
        />
        <v-text-field
          v-model="registerForm.password"
          type="password"
          placeholder="Contraseña"
          required
        />
        <v-text-field
          v-model="registerForm.bornDate"
          type="date"
          placeholder="Fecha de nacimiento"
          required
        />
        <v-text-field
          v-model="registerForm.address"
          placeholder="Dirección"
        /> 
        <v-btn
          type="submit"
          block
          class="bg-green-darken-1 text-white"
        >
          Registrarse
        </v-btn>
        <v-btn
          text
          class="mt-2"
          @click="isRegistering = false"
        >
          Volver al Login
        </v-btn>
      </v-form>

      <!-- Forgot password step one form-->
      <v-form
        v-if="forgotPassword.active && forgotPassword.step === 1"
        @submit.prevent="sendOtp"
      >
        <h2 class="text-center text-h5 font-weight-bold mb-4">
          Enviar Código OTP
        </h2>

        <v-text-field
          v-model="forgotPassword.email"
          type="email"
          placeholder="Ingresa tu correo"
          required
        />
        <v-btn
          type="submit"
          block
          class="bg-yellow-darken-2 text-white"
        >
          Enviar código
        </v-btn>
        <v-btn
          text
          class="mt-2"
          @click="forgotPassword.active = false"
        >
          Volver al Login
        </v-btn>
      </v-form> 

      <!-- Forgot password step opt form-->
      <v-form
        v-if="forgotPassword.active && forgotPassword.step === 2"
        @submit.prevent="verifyOtp"
      >
        <h2 class="text-center text-h5 font-weight-bold mb-4">
          Verificar código OTP
        </h2>
        <v-text-field
          v-model="forgotPassword.otpInput"
          type="text"
          placeholder="Ingresa el código OTP"
          required
        />
        <v-btn
          type="submit"
          block
          class="bg-yellow-darken-2 text-white"
        >
          Verificar código
        </v-btn>
        <p>Intentos restantes: {{ forgotPassword.attempts }}</p>
        <v-btn
          text
          class="mt-2"
          @click="forgotPassword.active = false"
        >
          Volver al Login
        </v-btn>
      </v-form>
    
      <!-- Forgot password step reset password-->
      <v-form
        v-if="forgotPassword.active && forgotPassword.step === 3"
        @submit.prevent="resetPassword"
      >
        <h2 class="text-center text-h5 font-weight-bold mb-4">
          Restablecer Contraseña
        </h2>

        <v-text-field
          v-model="forgotPassword.newPassword"
          type="password"
          placeholder="Nueva Contraseña"
          required
        />
        <v-text-field
          v-model="forgotPassword.confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          required
        />
        <v-btn
          type="submit"
          block
          class="bg-green-darken-1 text-white"
        >
          Guardar
        </v-btn>
        <v-btn
          text
          class="mt-2"
          @click="forgotPassword.active = false"
        >
          Volver al Login
        </v-btn>
      </v-form>

      <!-- switch between login and sign up-->
      <!-- <p
        v-if="!forgotPassword.active"
        class="toggle-form text-sm text-gray-600 cursor-pointer hover:underline text-center"
        @click="toggleForm"
      >
        {{ isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate" }}
      </p> -->
    </v-card>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup(){
        const router = useRouter();

        const isRegistering = ref(false);
        const loginForm = ref({ 
            identifier: '', 
            password: ''});

        const registerForm = ref({
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            phone: '',
            password: '',
            bornDate: '',
            address: ''
        });

        const forgotPassword = ref({
            active: false,
            step: 1,
            email: '',
            otp: '123456',
            otpInput: '',
            attempts: 3,
            newPassword: '',
            confirmPassword: ''
        });

        const forgotPasswordStepTittle = computed(() => {
            switch(forgotPassword.value.step){
                case 1: return "Recuperar Contraseña";
                case 2: return "Verificación OTP";
                case 3: return "Nueva Contraseña";
                default: return "Recuperar Contraseña";
            }
        });

        const toggleForm = () => {
            isRegistering.value = !isRegistering.value;
        };

        const handleLogin = () =>{
            //authStore.login({username: loginForm.value.identifier});
            router.push('/inicio');
        };

        const handleRegister = () => {
            //authStore.login(registerForm.value);
            alert("Registro exitoso. Por favor vuelva a iniciar sesión.");
            router.push('/iniciar-sesion')
        };

        const sendOtp = () => {
            alert(`Código OTP enviado al correo: ${forgotPassword.value.email}`);
            forgotPassword.value.step = 2;
        };

        const verifyOtp = () => {
            if(forgotPassword.value.otpInput === forgotPassword.value.otp){
                alert("Código correcto. Ahora ingrese su nueva contraseña.");
                forgotPassword.value.step = 3;
            } else{
                if(forgotPassword.value.attempts === 0){
                    alert("Demasiados intentos fallidos. Regresando al inicio de sesión");
                    forgotPassword.value.active = false;
                    forgotPassword.value.step = 1;
                    forgotPassword.value.attempts = 3;
                } else{
                    alert("Código incorrecto. Intenta nuevamente.");
                }
            }
        };

        const resetPassword = () => {
            if(forgotPassword.value.newPassword !== forgotPassword.value.confirmPassword){
                alert("Las contraseñas no coinciden.");
                return;
            }
            alert("Contraseña restablecida con éxito. Inicia sesión con tu nueva contraseña.");
            forgotPassword.value.active = false;
            forgotPassword.value.step = 1;
            forgotPassword.value.attempts = 3;
        };

        return{
            isRegistering,
            loginForm,
            registerForm,
            forgotPassword,
            forgotPasswordStepTittle,
            handleLogin,
            handleRegister,
            toggleForm,
            sendOtp,
            verifyOtp,
            resetPassword
        };
    }

}
</script>

<style scoped>
/* .login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
} */

/* input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}

button {
  width: 70%;
  padding: 10px;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
}

.forgot-password, .toggle-form {
  margin-top: 10px;
  color: blue;
  cursor: pointer;
} */
</style>