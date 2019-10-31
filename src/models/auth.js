import api from "./api";

let token = undefined;
let tokenSubscribers = [];

const auth = {
    token: {
        set: newToken => {
            token = newToken;
            tokenSubscribers.forEach(sub => {
                sub(token ? true : false);
            });
            console.log(token);
        },
        isSet: () => token ? true : false,
        get: () => token,
        subscribe: f => {
            tokenSubscribers.push(f);
        }
    },
    login: (email, password) => {
        api.post("/auth/login", {
            email: email,
            password: password
        }, {
            "Content-Type": "application/x-www-form-urlencoded"
        })(res => {
            if (res.ok) {
                res.json().then(json => {
                    auth.token.set(json.data.token);
                })
            } else {
                auth.token.set(undefined);
            }
        });
    },
    register: (email, password) => {
        api.post("/auth/register", {
            email: email,
            password: password
        }, {
            "Content-Type": "application/x-www-form-urlencoded"
        })(res => {
            if (res.ok) {
                auth.login(email, password);
            }
        });
    }
};

export default auth;
