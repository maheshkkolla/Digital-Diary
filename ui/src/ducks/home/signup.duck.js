import api from "../../utils/api";
import User from "../../models/User";

const initialState = {

};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default: return state;
    }
};

const onSignUp = (user) => {
    return (dispatch) => {
        api.signUp(user).then((cu) => {
            const createdUser = new User(cu);
            // dispatch.onLogin(createdUser)
        });
    }
};

const actions = { onSignUp };


export {reducer, actions};