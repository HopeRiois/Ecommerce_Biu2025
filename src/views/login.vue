<template>
  <v-container 
    fluid 
    class="d-flex align-center justify-center min-vh-100 px-4"
  >
    <v-card
      v-card
      class="rounded-lg shadow-lg d-flex flex-column flex-md-row"
      width="90vw"
      max-width="900px"
      height="90vh"
    >
      <v-row 
        no-gutters 
        class="fill-height"
      >
        <v-col
          cols="12" 
          md="5"
          class="d-flex align-center justify-center fill-height hidden-sm-and-down"
          :style="{ backgroundColor: colorLeftPanel }"
        />
        <v-col
          cols="12"
          md="7"
          class="pa-6 d-flex flex-column justify-center fill-height"
        >
          <!-- Login form-->
          <v-form
            v-if="!isRegistering && !forgotPassword.active"
            ref="loginFormRef"
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
              class="mb-2"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="loginForm.password"
              :type="showPasswordLogin ? 'text' : 'password'"
              label="Contraseña"
              outlined
              persistent-placeholder
              :rules="[rules.required]"
              @click:append-inner="showPasswordLogin = !showPasswordLogin"
            >
              <template #append-inner>
                <v-icon
                  class="cursor-pointer"
                  @click="showPasswordLogin = !showPasswordLogin"
                >
                  {{ showPasswordLogin ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </template>
            </v-text-field>
            <v-btn
              type="sumit"
              block
              class="bg-blue-darken-1 text-white mt-2"
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
            ref="registerFormRef"
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
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.lastName"
                  label="Apellidos"
                  outlined
                  persistent-placeholder
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.userName"
                  label="Nombre de usuario"
                  outlined
                  persistent-placeholder
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.email"
                  label="Email"
                  outlined
                  persistent-placeholder
                  :rules="[rules.required, rules.email]"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.phone"
                  label="Teléfono"
                  outlined
                  persistent-placeholder
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="registerForm.password"
                  :type="showPasswordRegister ? 'text' : 'password'"
                  label="Contraseña"
                  outlined
                  persistent-placeholder
                  :rules="[rules.required]"
                  @click:append-inner="showPasswordRegister = !showPasswordRegister"
                >
                  <template #append-inner>
                    <v-icon
                      class="cursor-pointer"
                      @click="showPasswordRegister = !showPasswordRegister"
                    >
                      {{ showPasswordRegister ? 'mdi-eye' : 'mdi-eye-off' }}
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
                  :rules="[rules.required, rules.minAge]"
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
              class="bg-green-darken-1 text-white mt-4 mb-2"
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
            ref="sendOtpFormRef"
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
              :rules="[rules.required, rules.email]"
            />
            <v-btn
              type="submit"
              block
              class="bg-yellow-darken-2 text-white mt-2"
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
            <v-col
              cols="auto"
              class="d-flex mb-4"
            >
              <v-text-field
                v-for="(digit, index) in otp"
                :key="index"
                ref="otpFields"
                v-model="otp[index]"
                maxlength="1"
                class="otp-input mx-1"
                hide-details
                variant="outlined"
                @input="handleInputOtp(index, $event)"
                @keydown.delete="handleDeleteOtp(index, $event)"
              />
            </v-col>
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
            ref="changePasswordRef"
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
              class="mb-2"
              outlined
              persistent-placeholder
              :rules="[rules.required]"
              @click:append-inner="showPasswordChange = !showPasswordChange"
            >
              <template #append-inner>
                <v-icon
                  class="cursor-pointer"
                  @click="showPasswordChange = !showPasswordChange"
                >
                  {{ showPasswordChange ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              v-model="forgotPassword.confirmPassword"
              :type="showPasswordConfirm ? 'text' : 'password'"
              label="Confirmar contraseña"
              outlined
              persistent-placeholder
              :rules="[rules.required, rules.matchPassword]"
              @click:append-inner="showPasswordConfirm = !showPasswordConfirm"
            >
              <template #append-inner>
                <v-icon
                  class="cursor-pointer"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                >
                  {{ showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </template>
            </v-text-field>
            <v-btn
              type="submit"
              block
              class="bg-green-darken-1 text-white mt-2"
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
import { ref, computed, onMounted, nextTick } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { parseISO, differenceInYears } from 'date-fns'

export default {
    setup(){
        const authStore = useAuthStore();
        const router = useRouter();

        const isRegistering = ref(false);
        const showPasswordLogin = ref(false);
        const showPasswordRegister = ref(false);
        const showPasswordChange = ref(false);
        const showPasswordConfirm = ref(false);
        const otp = ref(new Array(6).fill(''));
        const otpFields = ref([]);

        const colorLeftPanel = ref('#156082')

        const loginFormRef = ref(null);
        const sendOtpFormRef = ref(null);
        const changePasswordRef = ref(null);
        const registerFormRef = ref(null);

        const rules = {
          required: value => !!value || 'Este campo es obligatorio',
          email: value => /.+@.+\..+/.test(value) || 'Ingrese un correo válido',
          matchPassword: value => value === forgotPassword.value.newPassword || 'Las contraseñas no coinciden',
          minAge: value => {
            if (!value) return 'Ingrese su fecha de nacimiento'
            const birthDate = parseISO(value)
            return differenceInYears(new Date(), birthDate) >= 15 || 'Debe tener al menos 15 años'
          }
        };

        const handleInputOtp = (index, event) => {
          const value = event.target.value;
          if (/^[0-9]$/.test(value)) {
            otp.value[index] = value;
            // if (index < otp.value.length - 1) {
            //   otpFields.value[index + 1].$el.focus();
            // }
            if (otp.value[index].length === 1 && index < otp.value.length - 1) {
              nextTick(() => otpFields.value[index + 1]?.focus());
            }
          } else {
            otp.value[index] = '';
          }
        };

        const handleDeleteOtp = (index, event) => {
          if (event.key === 'Backspace' && !otp.value[index] && index > 0) {
            // otpFields.value[index - 1].$el.focus();
            nextTick(() => otpFields.value[index - 1]?.focus());
          }
        };

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

        const handleLogin = async () =>{
          const { valid } = await loginFormRef.value.validate();
          if (valid) {
            authStore.login({username: loginForm.value.identifier});
            window.$notify(`Bienvenido: ${authStore.user.username}`, true);
            router.push('/inicio');            
          } 
          else {
            window.$notify('Por favor diligencia correctamente los campos', false);
          }
        };

        const handleRegister = async () => {
          const { valid } = await registerFormRef.value.validate();
          if (valid) {
            //authStore.login(registerForm.value);
            window.$notify("Registro exitoso. Por favor vuelva a iniciar sesión.", true);
            // router.push('/iniciar-sesion')
            isRegistering.value = false;
          } 
          else {
            window.$notify('Por favor diligencia correctamente los campos', false);
          }
        };

        const sendOtp = async () => {
          const { valid } = await sendOtpFormRef.value.validate();
          if (valid) {
          window.$notify(`Código OTP enviado al correo: ${forgotPassword.value.email}`, true);
            forgotPassword.value.step = 2;
          }else{
            window.$notify('Por favor diligencia correctamente los campos', false);
          }

        };

        const verifyOtp = () => {
          forgotPassword.value.attempts --;
            if(otp.value.join("") === forgotPassword.value.otp){
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

        const resetPassword = async () => {
          const { valid } = await changePasswordRef.value.validate();
          if (valid) {
            if(forgotPassword.value.newPassword !== forgotPassword.value.confirmPassword){
              window.$notify("Las contraseñas no coinciden.", false);
                return;
            }
            window.$notify("Contraseña restablecida con éxito. Inicia sesión con tu nueva contraseña.", true);
            forgotPassword.value.active = false;
            forgotPassword.value.step = 1;
            forgotPassword.value.attempts = 3;
          }else{
            window.$notify('Por favor diligencia correctamente los campos', false);
          }
        };

        onMounted(() => {
          nextTick(() => {
            otpFields.value[0].$el.focus();
          });
        });

        return{
            isRegistering,
            showPasswordLogin,
            showPasswordConfirm,
            showPasswordChange,
            showPasswordRegister,
            colorLeftPanel,
            loginFormRef,
            sendOtpFormRef,
            changePasswordRef,
            registerFormRef,
            rules,
            loginForm,
            registerForm,
            forgotPassword,
            forgotPasswordStepTittle,
            handleLogin,
            handleRegister,
            toggleForm,
            sendOtp,
            verifyOtp,
            resetPassword,
            otp, 
            handleInputOtp, 
            handleDeleteOtp, 
            otpFields
        };
    }

}
</script>

<style scoped>
@media (max-width: 600px) {
  .min-vh-150 {
    min-height: 100vh;
  }
}
.otp-input {
  width: 50px;
  text-align: center;
}
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