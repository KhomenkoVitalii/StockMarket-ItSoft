import './Stock.scss';
import { beautyMarketCap } from '../../utils/utils';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import RoutesEnum from '../../routes/RoutesEnum';

const Stock = ({ data }) => {
    const navigate = useNavigate();

    const onMakeOrderButtHandler = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('symbol', data.symbol);

        navigate({ pathname: RoutesEnum.MAKE_ORDER, search: queryParams.toString() });
    }

    return (
        <div className="stock">
            <div className="stock_header">
                <p className="stock_header_text">{data.industry.name}</p>
                <p className="stock_header_text">{data.symbol}</p>
                <p className="stock_header_text">{data.name}</p>
            </div>
            <div className="stock_info">
                <p className="stock_info_text">Exchange: {data.exchange}</p>
                <p className="stock_info_text">Market cap: {beautyMarketCap(data.market_cap)}</p>
            </div>
            <div className='stock_order'>
                <Button variant="contained"
                    className='stock_order_submit'
                    onClick={onMakeOrderButtHandler}>
                    Make order
                </Button>
            </div>
        </div>
    )
}

export default Stock;