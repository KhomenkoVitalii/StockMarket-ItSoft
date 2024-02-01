import BackendUrls from "./BackendUrls"

export const getAllStocks = async (token) => {
    try {
        const headers = new Headers();
        headers.append('Authorization', `Token ${token}`);

        const response = await fetch(BackendUrls.STOCKS, {
            method: "GET",
            headers: headers
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
        console.error(e);
        return { status: 'failed', message: "Crucial error was cached, please, try again later!" }
    }
}
