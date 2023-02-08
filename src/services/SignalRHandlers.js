import store from "../store";

export const ConfigureSignalRHandlers = function(signalRConnection) {
    signalRConnection.on("UserRegistrationApproveNotification", ReceiveNotification)

    return signalRConnection;
}

function ReceiveNotification(data) {
    console.log(data);
    store.commit("signalr/setNotificationMessage", data);
}