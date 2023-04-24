import React, {ReactChild, ReactNode, useMemo, useRef} from 'react';
import './RecommendationBlock.css'
import IconStorage from "../../../IconLibrary/IconLibrary";




type TRecommendationBlock = {children:JSX.Element | ReactChild | ReactNode,isShow:boolean}

const RecommendationBlock = ({children,isShow}:TRecommendationBlock) => {
    const showDelayedRef = useRef(false)
    const ref = useRef<HTMLDivElement | null>(null)
    useMemo(()=> {
        if(ref && ref.current === null) {
            showDelayedRef.current = isShow
        }
        else setTimeout(() => {
            showDelayedRef.current = isShow
        },1000)
    },[isShow])

    return <>{showDelayedRef && <div ref={ref} className={`RecommendationBlock ${isShow && 'RecommendationBlock-active'}`}>
            <IconStorage IconName={'InfoIcon'} className={'RecommendationBlock__svg'} />
            <h2 className={'RecommendationBlock__tittle'}>А вы знали?</h2>
            <dfn className={'RecommendationBlock__text'}>{children}</dfn>
        </div>}
        </>

};

export default RecommendationBlock;