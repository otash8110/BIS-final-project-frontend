import { createApp } from "vue";
import App from "./App.vue";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";

let token =
  "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbmlzdHJhdG9yQGxvY2FsaG9zdCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbmlzdHJhdG9yQGxvY2FsaG9zdCIsIlVzZXJJZCI6IjAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY3NDE2MjUwM30.aEknEZzoB7rGZtob3AxDCKOnReSAZdRGlW09W1H0eKEABaqWoyfnYoSHbwCxkh-3Hmvxgq8hBKS9srUIzD90lw";

let connection = new HubConnectionBuilder()
  .withUrl("https://localhost:7083/hub/demohub", {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
    accessTokenFactory: () => token,
  })
  .build();

connection.on("send", (data) => {
  console.log(data);
});

connection.start().then(() => {
  console.log("CONNECTED");
  connection.invoke("SendMessage", "Hello");
});

createApp(App).mount("#app");
