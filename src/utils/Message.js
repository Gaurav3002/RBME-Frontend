let messageHandler = null;


/*
|--------------------------------------------------------------------------
| Register Message Popup
|--------------------------------------------------------------------------
*/

function register(handler) {

    messageHandler = handler;

}


/*
|--------------------------------------------------------------------------
| Unregister Message Popup
|--------------------------------------------------------------------------
*/

function unregister() {

    messageHandler = null;

}


/*
|--------------------------------------------------------------------------
| Show Message
|--------------------------------------------------------------------------
*/

function show(type, message, title = null, duration = 3000) {

    if (!messageHandler) {

        console.warn(
            "MessagePopup is not registered."
        );

        return;

    }


    messageHandler({

        type: type,

        message: message,

        title: title,

        duration: duration

    });

}


/*
|--------------------------------------------------------------------------
| Success
|--------------------------------------------------------------------------
*/

function success(
    message,
    title = "Success",
    duration = 3000
) {

    show(
        "success",
        message,
        title,
        duration
    );

}


/*
|--------------------------------------------------------------------------
| Error
|--------------------------------------------------------------------------
*/

function error(
    message,
    title = "Failed",
    duration = 3000
) {

    show(
        "error",
        message,
        title,
        duration
    );

}


/*
|--------------------------------------------------------------------------
| Warning
|--------------------------------------------------------------------------
*/

function warning(
    message,
    title = "Warning",
    duration = 3000
) {

    show(
        "warning",
        message,
        title,
        duration
    );

}


/*
|--------------------------------------------------------------------------
| Information
|--------------------------------------------------------------------------
*/

function info(
    message,
    title = "Information",
    duration = 3000
) {

    show(
        "info",
        message,
        title,
        duration
    );

}


export default {

    register,

    unregister,

    success,

    error,

    warning,

    info

};