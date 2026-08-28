<template>
    <div
        ref="modalElement"
        class="modal fade"
        :id="id"
        tabindex="-1"
        :data-bs-backdrop="backdrop"
        :data-bs-keyboard="keyboard"
    >
        <div
            ref="dialog"
            :class="dialogClasses"
        >
            <div class="modal-content">

                <!-- Header -->
                <div
                    ref="header"
                    class="modal-header"
                    :class="{ draggable: draggable }"
                >
                    <h5 class="modal-title">
                        {{ title }}
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                    ></button>
                </div>

                <!-- Body -->
                <div
                    class="modal-body"
                    :class="{ 'modal-body-scroll': scrollable }"
                >
                    <slot />
                </div>

                <!-- Footer -->
                <div class="modal-footer">
                    <slot name="footer" />
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, defineExpose } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({

    id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        default: ""
    },

    size: {
        type: String,
        default: "md"
    },

    draggable: {
        type: Boolean,
        default: false
    },

    scrollable: {
        type: Boolean,
        default: false
    },

    fullscreen: {
        type: Boolean,
        default: false
    },

    backdrop: {
        type: [Boolean, String],
        default: true
    },

    keyboard: {
        type: Boolean,
        default: true
    }

});

const modalElement = ref(null);
const dialog = ref(null);
const header = ref(null);

let modal = null;

const dialogClasses = computed(() => {

    return [
        "modal-dialog",

        props.size === "sm" ? "modal-sm" : "",
        props.size === "lg" ? "modal-lg" : "",
        props.size === "xl" ? "modal-xl" : "",

        props.fullscreen ? "modal-fullscreen" : "",

        props.scrollable ? "modal-dialog-scrollable" : ""
    ];

});

function show() {
    modal?.show();
}

function hide() {
    modal?.hide();
}

function toggle() {
    modal?.toggle();
}

defineExpose({
    show,
    hide,
    toggle
});

onMounted(() => {

    modal = new Modal(modalElement.value);

    if (!props.draggable) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let x = 0;
    let y = 0;

    header.value.style.cursor = "move";

    const mouseDown = (e) => {

        dragging = true;

        startX = e.clientX - x;
        startY = e.clientY - y;

    };

    const mouseMove = (e) => {

        if (!dragging) return;

        x = e.clientX - startX;
        y = e.clientY - startY;

        dialog.value.style.transform =
            `translate(${x}px, ${y}px)`;

    };

    const mouseUp = () => {

        dragging = false;

    };

    header.value.addEventListener("mousedown", mouseDown);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    onBeforeUnmount(() => {

        header.value?.removeEventListener("mousedown", mouseDown);
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        modal?.dispose();

    });

});
</script>

<style scoped>

.modal-dialog{
    transition:none !important;
}

.draggable{
    cursor:move;
    user-select:none;
}

.modal-body-scroll{
    max-height:70vh;
    overflow-y:auto;
}

</style>