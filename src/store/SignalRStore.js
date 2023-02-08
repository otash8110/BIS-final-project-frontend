import { ConfigureSignalRHandlers } from "@/services/SignalRHandlers";
import * as signalR from "@microsoft/signalr";

const initialState = {
    connection: null,
    notifications: [],
}

export const signalr = {
    namespaced: true,
    state: initialState,
    actions: {
        createConnection({ commit }) {
            let connectionResult = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7083/demohub", {
                accessTokenFactory: () => {
                    let token = JSON.parse(localStorage.getItem('user')).accessToken;
                    return token;
                },
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();

            let configuredConnection = ConfigureSignalRHandlers(connectionResult);
            configuredConnection.start().then(() => {
                console.log("SIGNALR CONNECTED");
            })
            
            commit("setConnectionState", configuredConnection);
        },
    },
    mutations: {
        setConnectionState(state, connectionResult) {
            state.connection = connectionResult;
        },
        setNotificationMessage(state, message) {
            let notification = {
                showing: true,
                message,
              }
              state.notifications = [notification]
        }
    },
    getters: {
        GetNotifications(state) {
            return state.notifications
        }
    }
}