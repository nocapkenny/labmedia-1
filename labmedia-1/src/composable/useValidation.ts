import { reactive, computed, watch } from "vue";

export type Rule = (value: any, fields?: Record<string, any>) => string | boolean | Promise<string | boolean>;

interface FormField {
  value: any;
  rules: Rule[];
  errorMessage: string;
}

export function useValidation(initialFields: Record<string, { value: any; rules: Rule[] }>) {
  const fields = reactive<Record<string, FormField>>({});

  for (const key in initialFields) {
    fields[key] = {
      value: initialFields[key].value,
      rules: initialFields[key].rules,
      errorMessage: "",
    };

    watch(() => fields[key].value, () => validateField(key));
  }

  async function validateField(fieldName: string) {
    const field = fields[fieldName];
    for (const rule of field.rules) {
      const result = await rule(field.value, fields);
      if (typeof result === "string") {
        field.errorMessage = result;
        return false;
      }
    }
    field.errorMessage = "";
    return true;
  }

  async function validateForm() {
    let isValid = true;
    for (const key in fields) {
      const valid = await validateField(key);
      if (!valid) isValid = false;
    }
    return isValid;
  }

  function resetForm() {
    for (const key in fields) {
      fields[key].value = initialFields[key].value;
      fields[key].errorMessage = "";
    }
  }

  const isFormValid = computed(() => Object.values(fields).every((field) => !field.errorMessage));

  return { fields, validateField, validateForm, resetForm, isFormValid };
}