import $ from "jquery";
import apiUrls from "../constants/apiUrls";

const ajax = (options) => {
    return new Promise((resolve, reject) => {
        $.ajax(options).done(resolve).fail(reject);
    });
};

export default  {
    signUp: (user) => {
        return ajax({
            url: apiUrls.signUp(),
            type: "POST",
            data: user.toApiData()
        });
    }
}