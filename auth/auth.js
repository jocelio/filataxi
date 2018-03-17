/**
 * Created by jocelio on 18/02/18.
 */
import {AsyncStorage} from "react-native";

export const onSignOut = () => AsyncStorage.multiRemove(["userdata","access_token"]);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("access_token")
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};
