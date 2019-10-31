import api from "./api";
import auth from "./auth";

const account = {
    invest: (fundName, amount, callback) => {
        api.post("/account/invest", {
            fundName: fundName,
            amount: amount
        }, {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": auth.token.get()
        })(res => {
            callback(res.ok);
        });
    },
    sell: (fundName, amount, callback) => {
        api.post("/account/sell", {
            fundName: fundName,
            amount: amount
        }, {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": auth.token.get()
        })(res => {
            callback(res.ok);
        });
    },
    deposit: (amount, callback) => {
        api.post("/account/deposit", {
            amount: amount
        }, {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": auth.token.get()
        })(res => {
            callback(res.ok);
        });
    }
};

export default account;
