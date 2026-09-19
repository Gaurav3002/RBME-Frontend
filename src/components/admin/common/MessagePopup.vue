
<template>

    <Transition name="message">

        <div
            v-if="visible"
            class="message-container"
        >

            <div
                class="message-popup"
                :class="'message-' + type"
            >

                <!-- Colored Icon -->
                <div class="message-icon-wrapper">

                    <div class="message-icon">

                        <span v-if="type === 'success'">
                            ✓
                        </span>

                        <span v-else-if="type === 'error'">
                            ✕
                        </span>

                        <span v-else-if="type === 'warning'">
                            !
                        </span>

                        <span v-else-if="type === 'authorization'">
                            🔐
                        </span>

                        <span v-else>
                            i
                        </span>

                    </div>

                </div>


                <!-- Content -->
                <div class="message-content">

                    <div class="message-title">
                        {{ title }}
                    </div>

                    <div class="message-text">
                        {{ message }}
                    </div>

                </div>


                <!-- Close Button -->
                <button
                    type="button"
                    class="message-close"
                    @click="closeMessage"
                >
                    ×
                </button>


                <!-- Progress Bar -->
                <div
                    v-if="duration > 0"
                    class="message-progress"
                    :style="{
                        animationDuration: duration + 'ms'
                    }"
                ></div>

            </div>

        </div>

    </Transition>

</template>


<script setup>

import {
    ref,
    onMounted,
    onUnmounted
} from "vue";

import Message from "@/utils/Message.js";


const visible = ref(false);

const type = ref("success");

const title = ref("Success");

const message = ref("");

const duration = ref(3000);

let timer = null;


/*
|--------------------------------------------------------------------------
| Show Message
|--------------------------------------------------------------------------
*/

function showMessage(data) {

    type.value = data.type || "success";

    message.value = data.message || "";

    title.value =
        data.title ||
        getDefaultTitle(data.type);

    duration.value =
        data.duration !== undefined
            ? data.duration
            : 3000;


    visible.value = true;


    /*
    |--------------------------------------------------------------------------
    | Clear Previous Timer
    |--------------------------------------------------------------------------
    */

    if (timer) {

        clearTimeout(timer);

        timer = null;

    }


    /*
    |--------------------------------------------------------------------------
    | Auto Close
    |--------------------------------------------------------------------------
    */

    if (duration.value > 0) {

        timer = setTimeout(() => {

            closeMessage();

        }, duration.value);

    }

}


/*
|--------------------------------------------------------------------------
| Default Titles
|--------------------------------------------------------------------------
*/

function getDefaultTitle(type) {

    switch (type) {

        case "success":
            return "Success";

        case "error":
            return "Failed";

        case "warning":
            return "Warning";

        case "authorization":
            return "Authorization";

        case "info":
            return "Information";

        default:
            return "Message";

    }

}


/*
|--------------------------------------------------------------------------
| Close
|--------------------------------------------------------------------------
*/

function closeMessage() {

    visible.value = false;

    if (timer) {

        clearTimeout(timer);

        timer = null;

    }

}


/*
|--------------------------------------------------------------------------
| Register Message Service
|--------------------------------------------------------------------------
*/

onMounted(() => {

    Message.register(showMessage);

});


/*
|--------------------------------------------------------------------------
| Cleanup
|--------------------------------------------------------------------------
*/

onUnmounted(() => {

    Message.unregister();

    if (timer) {

        clearTimeout(timer);

    }

});

</script>


<style scoped>

/*
|--------------------------------------------------------------------------
| Main Container
|--------------------------------------------------------------------------
*/

.message-container {

    position: fixed;

    top: 25px;

    right: 25px;

    z-index: 999999;

}


/*
|--------------------------------------------------------------------------
| Popup
|--------------------------------------------------------------------------
*/

.message-popup {

    width: 420px;

    min-height: 92px;

    background: #ffffff;

    border-radius: 14px;

    display: flex;

    align-items: center;

    padding: 18px 20px;

    gap: 15px;

    position: relative;

    overflow: hidden;

    box-shadow:
        0 12px 35px rgba(0, 0, 0, 0.14),
        0 3px 10px rgba(0, 0, 0, 0.06);

    border: 1px solid #eeeeee;

}


/*
|--------------------------------------------------------------------------
| Left Accent
|--------------------------------------------------------------------------
*/

.message-popup::before {

    content: "";

    position: absolute;

    left: 0;

    top: 0;

    bottom: 0;

    width: 5px;

}


/*
|--------------------------------------------------------------------------
| SUCCESS
|--------------------------------------------------------------------------
*/

.message-success::before {

    background: #16a34a;

}


/*
|--------------------------------------------------------------------------
| ERROR / DELETE
|--------------------------------------------------------------------------
*/

.message-error::before {

    background: #dc2626;

}


/*
|--------------------------------------------------------------------------
| WARNING
|--------------------------------------------------------------------------
*/

.message-warning::before {

    background: #f59e0b;

}


/*
|--------------------------------------------------------------------------
| INFO
|--------------------------------------------------------------------------
*/

.message-info::before {

    background: #2563eb;

}


/*
|--------------------------------------------------------------------------
| AUTHORIZATION
|--------------------------------------------------------------------------
*/

.message-authorization::before {

    background: #7c3aed;

}


/*
|--------------------------------------------------------------------------
| Icon Wrapper
|--------------------------------------------------------------------------
*/

.message-icon-wrapper {

    flex-shrink: 0;

}


/*
|--------------------------------------------------------------------------
| Icon
|--------------------------------------------------------------------------
*/

.message-icon {

    width: 48px;

    height: 48px;

    border-radius: 12px;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 23px;

    font-weight: 700;

}


/*
|--------------------------------------------------------------------------
| Success Icon
|--------------------------------------------------------------------------
*/

.message-success .message-icon {

    background: #ecfdf3;

    color: #16a34a;

}


/*
|--------------------------------------------------------------------------
| Error Icon
|--------------------------------------------------------------------------
*/

.message-error .message-icon {

    background: #fef2f2;

    color: #dc2626;

}


/*
|--------------------------------------------------------------------------
| Warning Icon
|--------------------------------------------------------------------------
*/

.message-warning .message-icon {

    background: #fffbeb;

    color: #d97706;

}


/*
|--------------------------------------------------------------------------
| Info Icon
|--------------------------------------------------------------------------
*/

.message-info .message-icon {

    background: #eff6ff;

    color: #2563eb;

}


/*
|--------------------------------------------------------------------------
| Authorization Icon
|--------------------------------------------------------------------------
*/

.message-authorization .message-icon {

    background: #f5f3ff;

    color: #7c3aed;

}


/*
|--------------------------------------------------------------------------
| Content
|--------------------------------------------------------------------------
*/

.message-content {

    flex: 1;

    min-width: 0;

    padding-right: 20px;

}


/*
|--------------------------------------------------------------------------
| Title
|--------------------------------------------------------------------------
*/

.message-title {

    font-size: 15px;

    font-weight: 700;

    color: #1f2937;

    margin-bottom: 5px;

}


/*
|--------------------------------------------------------------------------
| Message
|--------------------------------------------------------------------------
*/

.message-text {

    font-size: 13.5px;

    color: #6b7280;

    line-height: 1.5;

    word-break: break-word;

}


/*
|--------------------------------------------------------------------------
| Close Button
|--------------------------------------------------------------------------
*/

.message-close {

    position: absolute;

    top: 9px;

    right: 11px;

    width: 25px;

    height: 25px;

    border: none;

    background: transparent;

    color: #9ca3af;

    font-size: 21px;

    line-height: 20px;

    cursor: pointer;

    border-radius: 6px;

    transition: all 0.2s ease;

}


.message-close:hover {

    background: #f3f4f6;

    color: #374151;

}


/*
|--------------------------------------------------------------------------
| Progress Bar
|--------------------------------------------------------------------------
*/

.message-progress {

    position: absolute;

    bottom: 0;

    left: 0;

    height: 3px;

    width: 100%;

    transform-origin: left;

    animation-name: message-progress-animation;

    animation-timing-function: linear;

    animation-fill-mode: forwards;

}


/*
|--------------------------------------------------------------------------
| Progress Colors
|--------------------------------------------------------------------------
*/

.message-success .message-progress {

    background: #16a34a;

}


.message-error .message-progress {

    background: #dc2626;

}


.message-warning .message-progress {

    background: #f59e0b;

}


.message-info .message-progress {

    background: #2563eb;

}


.message-authorization .message-progress {

    background: #7c3aed;

}


/*
|--------------------------------------------------------------------------
| Progress Animation
|--------------------------------------------------------------------------
*/

@keyframes message-progress-animation {

    from {

        transform: scaleX(1);

    }

    to {

        transform: scaleX(0);

    }

}


/*
|--------------------------------------------------------------------------
| Enter / Leave Animation
|--------------------------------------------------------------------------
*/

.message-enter-active {

    animation: message-slide-in 0.35s ease-out;

}


.message-leave-active {

    animation: message-slide-out 0.3s ease-in;

}


@keyframes message-slide-in {

    from {

        opacity: 0;

        transform:
            translateX(80px)
            scale(0.95);

    }

    to {

        opacity: 1;

        transform:
            translateX(0)
            scale(1);

    }

}


@keyframes message-slide-out {

    from {

        opacity: 1;

        transform:
            translateX(0)
            scale(1);

    }

    to {

        opacity: 0;

        transform:
            translateX(80px)
            scale(0.95);

    }

}


/*
|--------------------------------------------------------------------------
| Mobile
|--------------------------------------------------------------------------
*/

@media (max-width: 576px) {

    .message-container {

        top: 15px;

        right: 15px;

        left: 15px;

    }


    .message-popup {

        width: 100%;

    }

}

</style>

