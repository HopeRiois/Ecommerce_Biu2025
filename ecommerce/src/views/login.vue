<template>
  <v-container class="d-flex align-center justify-center min-vh-100">
    <v-card
      class="pa-6 rounded-lg shadow-lg"
      width="60vw" 
      height="80vh"
    >
      <v-row 
        no-gutters 
        class="fill-height"
      >
        <v-col
          cols="5"
          class="d-flex align-center justify-center fill-height"
          :style="{ backgroundColor: colorLeftPanel }"
        />
        <v-col
          cols="7"
          class="pa-6"
          fill-height
        >
          <!-- Login form-->
          <v-form
            v-if="!isRegistering && !forgotPassword.active"
            @submit.prevent="handleLogin"
          >
            <v-img
              src="/image/brand.png"
              height="150"
              class="img-center mb-2"
            />
            <v-spacer />
            <h2 class="text-center text-h5 font-weight-bold mb-4">
              Iniciar Sesión
            </h2>
            <v-text-field
              v-model="loginForm.identifier"
              label="Usuario o Correo"
              outlined
              persistent-placeholder
              required
            />
            <v-text-field
              v-model="loginForm.password"
              :type="showPasswordLogin ? 'text' : 'password'"
              label="Contraseña"
              outlined
              persistent-placeholder
              required
              @click:append-inner="showPasswordLogin = !showPasswordLogin"
            >
              <template #append-inner>
                <v-icon
                  class="cursor-pointer"
                  @click="showPasswordLogin = !showPasswordLogin"
                >
                  {{ showPasswordLogin ? 'mdi-eye-off' : 'mdi-eye' }}
                </v-icon>
              </template>
            </v-text-field>
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
              block
              @click="forgotPassword.active = true; forgotPassword.step = 1"
            >
              ¿Olvidaste tu contraseña?
            </v-btn>
            <v-btn
              text
              class="mt-1"
              block
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
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.firstName"
                  label="Nombres"
                  outlined
                  persistent-placeholder
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.lastName"
                  label="Apellidos"
                  outlined
                  persistent-placeholder
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.userName"
                  label="Nombre de usuario"
                  outlined
                  persistent-placeholder
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.email"
                  label="email"
                  outlined
                  persistent-placeholder
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.phone"
                  label="Teléfono"
                  outlined
                  persistent-placeholder
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.password"
                  :type="showPasswordRegister ? 'text' : 'password'"
                  label="Contraseña"
                  outlined
                  persistent-placeholder
                  required
                  @click:append-inner="showPasswordRegister = !showPasswordRegister"
                >
                  <template #append-inner>
                    <v-icon
                      class="cursor-pointer"
                      @click="showPasswordRegister = !showPasswordRegister"
                    >
                      {{ showPasswordRegister ? 'mdi-eye-off' : 'mdi-eye' }}
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.bornDate"
                  type="date"
                  label="Fecha de nacimiento"
                  outlined
                  persistent-placeholder
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.address"
                  label="Dirección"
                  outlined
                  persistent-placeholder
                /> 
              </v-col>
            </v-row>
            <v-btn
              type="submit"
              block
              class="bg-green-darken-1 text-white"
            >
              Registrarse
            </v-btn>
            <v-btn
              text
              block
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
            <v-img
              src="/image/otp.png"
              height="180"
              class="img-center mb-6"
            />
            <h2 class="text-center text-h5 font-weight-bold mb-4">
              Enviar Código OTP
            </h2>

            <v-text-field
              v-model="forgotPassword.email"
              type="email"
              label="Ingresa tu correo"
              outlined
              persistent-placeholder
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
              block
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
            <v-img
              src="/image/otp.png"
              height="180"
              class="img-center mb-6"
            />
            <h2 class="text-center text-h5 font-weight-bold mb-4">
              Verificar código OTP
            </h2>
            <v-text-field
              v-model="forgotPassword.otpInput"
              type="text"
              label="Ingresa el código OTP"
              outlined
              persistent-placeholder
              required
            />
            <v-btn
              type="submit"
              block
              class="bg-yellow-darken-2 text-white"
            >
              Verificar código
            </v-btn>
            <v-btn
              text
              class="mt-2"
              block
              @click="forgotPassword.active = false"
            >
              Volver al Login
            </v-btn>
            <p 
              class="mt-4 text-center"
            >
              Intentos restantes: {{ forgotPassword.attempts }}
            </p>
          </v-form>
    
          <!-- Forgot password step reset password-->
          <v-form
            v-if="forgotPassword.active && forgotPassword.step === 3"
            @submit.prevent="resetPassword"
          >
            <v-img
              src="/image/otp.png"
              height="180"
              class="img-center mb-6"
            />
            <h2 class="text-center text-h5 font-weight-bold mb-4">
              Restablecer Contraseña
            </h2>

            <v-text-field
              v-model="forgotPassword.newPassword"
              :type="showPasswordChange ? 'text' : 'password'"
              label="Nueva Contraseña"
              outlined
              persistent-placeholder
              required
              @click:append-inner="showPasswordChange = !showPasswordChange"
            >
              <template #append-inner>
                <v-icon
                  class="cursor-pointer"
                  @click="showPasswordChange = !showPasswordChange"
                >
                  {{ showPasswordChange ? 'mdi-eye-off' : 'mdi-eye' }}
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              v-model="forgotPassword.confirmPassword"
              :type="showPasswordConfirm ? 'text' : 'password'"
              label="Confirmar contraseña"
              outlined
              persistent-placeholder
              required
              @click:append-inner="showPasswordConfirm = !showPasswordConfirm"
            >
              <template #append-inner>
                <v-icon
                  class="cursor-pointer"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                >
                  {{ showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye' }}
                </v-icon>
              </template>
            </v-text-field>
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
              block
              @click="forgotPassword.active = false"
            >
              Volver al Login
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
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
        const showPasswordLogin = ref(false);
        const showPasswordRegister = ref(false);
        const showPasswordChange = ref(false);
        const showPasswordConfirm = ref(false);

        const colorLeftPanel = ref('#156082')

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
            window.$notify("Registro exitoso. Por favor vuelva a iniciar sesión.", true);
            // router.push('/iniciar-sesion')
            isRegistering.value = false;
        };

        const sendOtp = () => {
          window.$notify(`Código OTP enviado al correo: ${forgotPassword.value.email}`, true);
            forgotPassword.value.step = 2;
        };

        const verifyOtp = () => {
            if(forgotPassword.value.otpInput === forgotPassword.value.otp){
              window.$notify("Código correcto. Ahora ingrese su nueva contraseña.", true);
                forgotPassword.value.step = 3;
            } else{
                if(forgotPassword.value.attempts === 0){
                  window.$notify("Demasiados intentos fallidos. Regresando al inicio de sesión",false);
                    forgotPassword.value.active = false;
                    forgotPassword.value.step = 1;
                    forgotPassword.value.attempts = 3;
                } else{
                  window.$notify("Código incorrecto. Intenta nuevamente.",false);
                }
            }
        };

        const resetPassword = () => {
            if(forgotPassword.value.newPassword !== forgotPassword.value.confirmPassword){
              window.$notify("Las contraseñas no coinciden.", false);
                return;
            }
            window.$notify("Contraseña restablecida con éxito. Inicia sesión con tu nueva contraseña.", true);
            forgotPassword.value.active = false;
            forgotPassword.value.step = 1;
            forgotPassword.value.attempts = 3;
        };

        return{
            isRegistering,
            showPasswordLogin,
            showPasswordConfirm,
            showPasswordChange,
            showPasswordRegister,
            colorLeftPanel,
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