import store from "../store";

export const ConfigureSignalRHandlers = function(signalRConnection) {


    signalRConnection.on("ReceiveNotification", ReceiveNotification);

    return signalRConnection;
}

function ReceiveNotification(data) {
    store.commit("setNotificationMessage", data);
}