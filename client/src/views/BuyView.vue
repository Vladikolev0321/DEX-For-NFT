    validatePrice() {
        this.price.value = parseInt(this.price.value, 10);
        if (!this.price.value || typeof this.price.value !== "number") {
            this.changeInputValidity("price", false);
            this.setInputErrorMsg("price", "Enter valid nft price.");
            return false;
        } else {
            if (!this.price.isValid) {
                this.changeInputValidity("price", true);
            }
            return true;
        }
    },