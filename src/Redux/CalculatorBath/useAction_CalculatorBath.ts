import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {makeFillSeam, fillMetres, resultCost, tileSize, antiWaterPrice, toiletInstallation,
    bathInstallation
    , additionalItemAngle, additionalItemHole, bathRoomSink, showerInstallation, dryWallBathScreen,
    deletePriceFromCalculatorReducer, boxInstallation, wallInstallation, additionalItemLinearMetres,
    tileAmount, setNumberTile} from '../CalculatorBathSlice'


const AllActions = {
    makeFillSeam, fillMetres, resultCost, tileSize, antiWaterPrice, toiletInstallation,
    bathInstallation
    , additionalItemAngle, additionalItemHole, bathRoomSink, showerInstallation, dryWallBathScreen,
    deletePriceFromCalculatorReducer, boxInstallation, wallInstallation, additionalItemLinearMetres,
    tileAmount, setNumberTile
};

const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(AllActions, dispatch);
};

export default useActions;