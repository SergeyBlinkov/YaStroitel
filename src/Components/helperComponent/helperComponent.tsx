import './helperComponentStyle.css'
import React from "react";
import styled from "styled-components";

export const toPeriod = (data:string) => {
    if(data.length > 0) {
        const splitArr = data.replace(/(,)/, '.').split(".")
        let finalResult = ""
        for (let i = 0; i < splitArr.length; i++)
            if (finalResult.length === 0) finalResult = `${splitArr[0]}.`
            else finalResult += splitArr[i]
        return +finalResult
    }
    else return 0
}

type ListOfBenefitAndLimitType = {benefits:string[],limitations:string[]}

export const ListOfBenefitAndLimit = ({benefits,limitations}:ListOfBenefitAndLimitType) => {
    const ItemComponent = ({info}:{info:string[]}) => {
        return <ul className={'ListOfBenefitAndLimit-group_item'}>{info.map(data => {
            return <div className={'ListOfBenefitAndLimit-group_item__items'} key={data}>
                <i className="fa-solid fa-angles-right"></i>
                <li>{data}</li>
            </div>
            }
        )}</ul>
    }
    return <div className={'ListOfBenefitAndLimit'}>
        <div className={'ListOfBenefitAndLimit-group'}>
            <span>Плюсы:</span>
            <ItemComponent info={benefits}/>
        </div>
        <div className={'ListOfBenefitAndLimit-group'}>
            <span>Минусы:</span>
            <ItemComponent info={limitations}/>
        </div>

    </div>
}

type H1StyleType = {
    primary?:boolean
}

export const H1Style = styled.h2<H1StyleType>`
  width:100%;
  margin: 0 auto;
  padding:25px;
  font-weight: 700;
  background: transparent;
  color: #E5DCCB;
  font-size: 30px;
  min-width: 1200px !important;
`
export const H2Style = styled.h2<H1StyleType>`
  width: 80%;
  align-self: center;
  margin: 0 auto;
  padding:25px;
  font-weight: 700;
  background: transparent;
  color: #E5DCCB;
  font-size: 35px;
  `