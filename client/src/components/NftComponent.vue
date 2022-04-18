<template>
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="" alt="Card image cap">
        <div class="card-body">
            <p class="card-text text-right">{{ price }}</p>
            <button-component :message="message"></button-component>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            required: true,
        },
        price: {
            type: int,
            required: true
        }
    }
}
</script>