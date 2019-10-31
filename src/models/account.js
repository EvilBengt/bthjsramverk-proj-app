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
            if (res.ok) {
                callback(true);
            }
        }, () => {
            callback(false);
        });
    }
};

export default account;
