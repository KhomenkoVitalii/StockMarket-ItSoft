import BackendUrls from "./BackendUrls"

export const login = async (email, password) => {
    try {
        const response = await fetch(BackendUrls.LOGIN, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        if (response.status == 200) {
            const body = await response.json();
            return { status: 'ok', body: body }
        } else if (response.status == 401) {
            return { status: 'failed', message: "Incorrect credentials were provided!" }
        } else {
            console.log(await response.json());
            return { status: 'failed', message: "Uncaught error was cached!" }
        }
    } catch (e) {
        console.error("Can't authorize client!");
        console.error(e);
        return { status: 'failed', message: "Crucial error was cached, please, try again later!" }
    }
};


export const register = async (data) => {
    console.log(data);
    try {
        const response = await fetch(BackendUrls.REGISTER, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': data.email,
                'password': data.password,
                'username': data.username,
                'first_name': data.firstName,
                'last_name': data.lastName,
                'phone_number': data.phoneNumber,
                'birthday': data.birthday
            })
        });

        const body = await response.json()
        console.log(body);
        if (response.status == 201) {
            return { status: 'ok', body }
        } else if (response.status == 400) {
            return { status: 'failed', message: "Incorrect data were provided!" }
        } else {
            return { status: 'failed', message: "Uncaught error was cached!" }
        }
    } catch (e) {
        console.error("Can't register client!");
        console.error(e);
        return { status: 'failed', message: "Crucial error was cached, please, try again later!" }
    } Phj
};