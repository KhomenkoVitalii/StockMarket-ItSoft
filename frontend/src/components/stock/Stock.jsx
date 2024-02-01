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
        <div className="stockBlock">
            <div className="stockBlockHeader">
                <p className="stockBlockHeaderText">{data.industry.name}</p>
                <p className="stockBlockHeaderText">{data.symbol}</p>
                <p className="stockBlockHeaderText">{data.name}</p>
            </div>
            <div className="stockBlockInfo">
                <p className="stockBlockInfoText">Exchange: {data.exchange}</p>
                <p className="stockBlockInfoText">Market cap: {beautyMarketCap(data.market_cap)}</p>
            </div>
            <div className='makeOrderButtWrapper'>
                <Button variant="contained"
                    className='button'
                    onClick={onMakeOrderButtHandler}>
                    Make order
                </Button>
            </div>
        </div>
    )
}

export default Stock;