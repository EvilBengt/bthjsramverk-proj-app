import io from "socket.io-client";

const devSocketUrl = "http://192.168.2.163:8400";
const prodSocketUrl = "https://proj-socket.jsramverk.evilbengt.me";
let socketUrl;

if (window.location.origin.includes("localhost")) {
    socketUrl = devSocketUrl;
} else {
    socketUrl = prodSocketUrl;
}

let subscriber = undefined;

const socket = io(socketUrl);

socket.on("connect", () => {
    socket.on("fundUpdate", (funds) => {
        if (subscriber) {
            subscriber(funds);
        }
    });
});

const funds = {
    subscribe: f => {
        subscriber = f;
    },
    unsubscribe: f => {
        subscriber = undefined;
    }
};

export default funds;
