<script lang="ts" setup>
import { computed, ref } from "vue";
import { useValidation } from "../composable/useValidation";

const isUpload = ref(false);

const { fields, validateField, validateForm, isFormValid } = useValidation({
  username: {
    value: "",
    rules: [(v) => v.length >= 3 || "Минимум 3 символа"],
  },
  email: {
    value: "",
    rules: [(v) => /\S+@\S+\.\S+/.test(v) || "Некорректный email"],
  },
  password: {
    value: "",
    rules: [
      (v) => v.length >= 6 || "Минимум 6 символов",
      (v, fields) =>
        !v.includes(fields.username.value) ||
        "Пароль не должен содержать имя пользователя!",
    ],
  },
  confirmPassword: {
    value: "",
    rules: [
      (v, fields) => v === fields.password.value || "Пароли не совпадают",
    ],
  },
});

const usernameClasses = computed(()=>{
    return{
        'form__item form__item--error': fields.username.errorMessage,
        'form__item': !fields.username.errorMessage    
    }
})
const emailClasses = computed(()=>{
    return{
        'form__item form__item--error': fields.email.errorMessage,
        'form__item': !fields.email.errorMessage    
    }
})
const passwordClasses = computed(()=>{
    return{
        'form__item form__item--error': fields.password.errorMessage,
        'form__item': !fields.password.errorMessage    
    }
})
const confirmPasswordClasses = computed(()=>{
    return{
        'form__item form__item--error': fields.confirmPassword.errorMessage,
        'form__item': !fields.confirmPassword.errorMessage    
    }
})

const submitForm = () => {
  if (isFormValid.value) {
    isUpload.value = true;
  } else {
    isUpload.value = false;
  }
};
</script>

<template>
  <div class="wrapper">
    <form @submit.prevent="validateForm" class="form">
      <h1 class="form__title">Регистрация</h1>
      <div :class="usernameClasses">
        <input
          class="form__input"
          v-model="fields.username.value"
          @blur="validateField('username')"
          placeholder="Имя пользователя"
          type="text"
        />
        <p class="form__error" v-if="fields.username.errorMessage">
          {{ fields.username.errorMessage }}
        </p>
      </div>
      <div :class="emailClasses">
        <input
          class="form__input"
          v-model="fields.email.value"
          @blur="validateField('email')"
          placeholder="email"
          type="email"
        />
        <p class="form__error" v-if="fields.email.errorMessage">
          {{ fields.email.errorMessage }}
        </p>
      </div>
      <div :class="passwordClasses">
        <input
          class="form__input"
          v-model="fields.password.value"
          @blur="validateField('password')"
          placeholder="Пароль"
          type="password"
        />
        <p class="form__error" v-if="fields.password.errorMessage">
          {{ fields.password.errorMessage }}
        </p>
      </div>
      <div :class="confirmPasswordClasses">
        <input
          class="form__input"
          v-model="fields.confirmPassword.value"
          @blur="validateField('confirmPassword')"
          placeholder="Подтвердите пароль"
          type="password"
        />
        <p class="form__error" v-if="fields.confirmPassword.errorMessage">
          {{ fields.confirmPassword.errorMessage }}
        </p>
      </div>

      <button
        @click="submitForm"
        class="form__button"
        type="submit"
        :disabled="!isFormValid"
      >
        Отправить
      </button>
      <p v-if="isUpload" class="form__success">Данные отправлены =)</p>
    </form>
  </div>
</template>

<style src="./Form.css"/>

