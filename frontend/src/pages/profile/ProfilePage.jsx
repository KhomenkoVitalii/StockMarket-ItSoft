import { useContext, useEffect, useState } from "react"
import Transaction from "../../components/transaction/Transaction";
import { AppContext } from "../../context/AppContext";
import { getUserTransactions } from "../../services/transactionServices";
import './ProfilePage.scss';

const ProfilePage = () => {
    const [data, setData] = useState(null);
    const { state } = useContext(AppContext);

    useEffect(() => {
        if (state.user?.is_login === false) {
            navigate(RoutesEnum.LOGIN);
        }

        if (state.user?.token) {
            getUserTransactions(state.user.token).then((data) => {
                setData(data.body);
            });
        }
    }, [state]);

    return (
        <div className="transactionsBlock">
            <h1 className="title">My transactions:</h1>
            {(data && data.length > 0) ? data.map((item, index) => (
                <Transaction data={item} key={index} />
            )) : (null)}
        </div>
    )
}

export default ProfilePage;