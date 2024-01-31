import BackendUrls from "./BackendUrls"

export const createOrder = async (orderData) => {
    try {
        const response = await fetch(BackendUrls.PLACE_ORDER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to create order');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error creating order:', error.message);
        throw error;
    }
};

export const getAllOrders = async () => {
    const token = localStorage.getItem('user')?.token;

    try {
        const headers = new Headers();
        headers.append('Authorization', `Token ${token}`);

        const response = await fetch(BackendUrls.GET_ORDERS, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch orders');
        }

        const ordersData = await response.json();
        return ordersData;
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        throw error;
    }
};



export const getOrderById = async (orderId) => {
    try {
        const response = await fetch(`${BackendUrls.GET_ORDER}${orderId}/`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch order');
        }

        const orderData = await response.json();
        return orderData;
    } catch (error) {
        console.error(`Error fetching order with ID ${orderId}:`, error.message);
        throw error;
    }
};