import BackendUrls from "./BackendUrls"

export const createOrder = async (orderData, token) => {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Token ${token}`);

        const response = await fetch(BackendUrls.PLACE_ORDER, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                stock_symbol: orderData.stock,
                order_type: orderData.orderType,
                price: orderData.price,
                quantity: orderData.quantity
            })
        });

        if (response.ok) {
            const body = await response.json();
            return { status: 'ok', body: body };
        } else if (response.status === 401) {
            console.error(await response.json());
            return { status: 'failed', message: "Incorrect credentials were provided!" };
        } else {
            console.error(await response.json());
            return { status: 'failed', message: "Uncaught error was caught!" };
        }
    } catch (error) {
        console.error(error);
        return { status: 'failed', message: "Crucial error was caught, please try again later!" };
    }
};

export const getAllOrders = async (token) => {
    try {
        const headers = new Headers();
        headers.append('Authorization', `Token ${token}`);

        const response = await fetch(BackendUrls.ORDERS, {
            method: "GET",
            headers: headers
        });

        if (response.status == 200) {
            const body = await response.json();
            return { status: 'ok', body: body }
        } else if (response.status == 401) {
            return { status: 'failed', message: "Incorrect credentials were provided!" }
        } else {
            console.error(await response.json());
            return { status: 'failed', message: "Uncaught error was cached!" }
        }
    } catch (e) {
        console.error(e);
        return { status: 'failed', message: "Crucial error was cached, please, try again later!" }
    }
};