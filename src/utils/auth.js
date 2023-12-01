export const BASE_URL = "api.movies-exp.punyapl.nomoredomainsrocks.ru";

const checkServerResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res);
};

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            name,
        }),
    }).then((res) => checkServerResponse(res));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((res) => checkServerResponse(res))
        .then((data) => {
            if (data.jwt) {
                localStorage.setItem("token", data.jwt);
                return data;
            }
        });
};

export const getUser = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => checkServerResponse(res));
};