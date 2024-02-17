<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'vButton'    
    }
</script>

<style>
.btn {
    border-radius: 10px;
    margin: 15px 0 0 0;
    padding: 10px 25px;
    background: none;
    color: teal;
    border: 1px solid teal;
    transition: all ease-in-out .3s;
}

.btn:hover {
    background: teal;
    color: whitesmoke;
    transition: all ease-in-out .5s;
}
</style>