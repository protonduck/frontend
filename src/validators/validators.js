import { helpers } from 'vuelidate/lib/validators';

// eslint-disable-next-line import/prefer-default-export,func-names
export const serverError = function (attributeName, errorsDataVarName = 'responseErrors', validatorName = 'serverError') {
  return helpers.withParams(
    // Default message
    { message: 'Server error' },
    (value, vm) => {
      const errorIndex = vm[errorsDataVarName].findIndex((item) => item.field === attributeName);
      const hasError = errorIndex !== -1;
      if (hasError) {
        vm.$nextTick(() => {
          // Override default message
          // eslint-disable-next-line no-param-reassign,max-len
          vm.$v[attributeName].$params[validatorName].message = vm[errorsDataVarName][errorIndex].message;
        });
      }

      return !hasError;
    },
  );
};
