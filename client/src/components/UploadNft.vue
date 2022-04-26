<template>
  <!-- @submit.prevent - data is submited when button is clicked without a page refresh -->
  <form @submit.prevent="submitForm" class="form-data">
    <div class="input-data">
      <div class="login-data">
        <label for="address" class="label-control">
          <input
            type="username"
            class="form-control"
            :class="{ invalid: !address.isValid }"
            id="inputUsername"
            @input="validateAddress()"
            placeholder="Nft Address"
            v-model="address.value"
          />
        </label>
        <p v-if="!address.isValid">{{ address.errorMsg }}</p>
        <label for="id" class="label-control">
          <input
            type="text"
            class="form-control"
            id="inputText"
            :class="{ invalid: !tokenId.isValid }"
            @input="validateTokenId()"
            placeholder="Token Id"
            v-model.trim="tokenId.value"
          />
        </label>
        <p v-if="!tokenId.isValid">{{ tokenId.errorMsg }}</p>
        <label for="price" class="label-control">
          <input
            type="text"
            class="form-control"
            id="inputText"
            :class="{ invalid: !price.isValid }"
            @input="validatePrice()"
            placeholder="Nft price"
            v-model.trim="price.value"
          />
        </label>
        <p v-if="!price.isValid">{{ price.errorMsg }}</p>
      </div>
      <div class="last-message">
        <p v-if="!formIsValid">
          Please fix the above errors and then submit again.
        </p>
      </div>
    </div>
    <button-component
      :message="message"
    />
  </form>
</template>
<script>

export default {
  /* eslint-disable */
  // sending the form data to the parent component vie emit-event conception
  emits: ['export-data'],
  data() {
    return {
      // make all inputs objects - with properties: value, isValid, because when implementing form
      // validation I will need to store a bool flag if the input is valid or not
      address: {
        value: '',
        isValid: true,
        errorMsg: '',
      },
      tokenId: {
        value: '',
        isValid: true,
        errorMsg: '',
      },
      price: {
        value: '',
        isValid: true,
        errorMsg: '',
      },
      // Add boolean flag that will be used to do basic form validation
      formIsValid: true,
    };
  },
  props: {
    message: {
      type: String,
      requred: true,
      default: 'Upload',
    },
  },
  methods: {
    changeInputValidity(input, state) {
      this[input].isValid = state;
    },
    setInputErrorMsg(input, msg) {
      this[input].errorMsg = msg;
    },
    validateAddress() {
      if (!this.address.value.trim()) {
        this.changeInputValidity('address', false);
        this.setInputErrorMsg('address', 'Enter valid nft address.');
        return false;
      }
      if (!this.address.isValid) {
        this.changeInputValidity('address', true);
      }
      return true;
    },
    validateTokenId() {
      this.tokenId.value = parseInt(this.tokenId.value, 10);
      if (!this.tokenId.value.trim() || typeof this.tokenId.value !== 'string') {
        this.changeInputValidity('tokenId', false);
        this.setInputErrorMsg('tokenId', 'Enter valid nft tokenId.');
        return false;
      }else {
        if (typeof this.tokenId.value !== 'number') {
        this.changeInputValidity('tokenId', false);
        this.setInputErrorMsg('tokenId', 'Enter valid nft tokenId.');
        return false;
       }
      }
      if (!this.tokenId.isValid) {
        this.changeInputValidity('tokenId', true);
      }
      return true;
    },
    validatePrice() {
      this.price.value = parseInt(this.price.value, 10);
      if (!this.price.value || typeof this.price.value !== 'number' || this.price.value <= 0) {
        this.changeInputValidity('price', false);
        this.setInputErrorMsg('price', 'Enter valid nft price.');
        return false;
      }
      if (!this.price.isValid) {
        this.changeInputValidity('price', true);
      }
      return true;
    },
    validateForm() {
      // Reset validation rule to true if it was previously false
      this.formIsValid = true;
    },
    submitForm() {
      this.validateForm();
      // Check if form is valid
      if (!this.formIsValid) {
        return;
      }

      const formData = {
        address: this.address.value,
        tokenId: this.tokenId.value,
        price: this.price.value,
      };
      return this.$emit('export-data', formData);
    },
  },
};
</script>

<style scoped>
p {
  text-align: left;
  font-size: small;
  color: red;
  margin-left: 2%;
}
.last-message p {
  margin-top: 5px;
  text-align: center;
}
form {
  display: inline-block;
  margin-top: 3%;
  margin-left: 35%;
  margin-right: 35%;
  margin-bottom: 2%;
  width: 30%;
  text-align: center;
}

.label-control {
  display: flex;
  margin-bottom: 0.7rem;
}

.form-data .form-control {
  background: #eef6fb;
  border: 1px solid #d9e4f5;
  box-sizing: border-box;
  border-radius: 70px;
}
.form-data .form-control.invalid {
  border: 1px solid red;
}

.input-data {
  display: flex;
  flex-direction: column;
}

</style>
