import React from "react";
import "./figureBehind.css";
import { IFirstLine, IFigureLine, IFigureBehind } from "./figureBehindType";

const FigureBehindItem = () => {
    return (
        <div className={"parent"}>
            <div className={"FigureBehindItem"}></div>
        </div>
    );
};
const FigureFirstLine = ({ amount }: IFirstLine) => {
    const width = window.innerWidth;
    const amountElements = Math.floor(width / 100);
    return (
        <div className={"FigureFirstLine"}>
            {Array.from(Array(amount ? amount : amountElements).keys()).map(
                (number) => (
                    <FigureBehindItem key={number} />
                )
            )}
        </div>
    );
};
const FigureLine = ({
                        amount,
                        isOdd,
                        fromTop,
                        fromTopNextLines
                    }: IFigureLine) => {
    return (
        <div
            className={isOdd ? "FigureLine" : "FigureLineDefault"}
            style={{ top: fromTopNextLines ? fromTopNextLines : fromTop }}
        >
            {amount &&
                Array.from(Array(amount).keys()).map((number) => (
                    <FigureBehindItem key={number} />
                ))}
        </div>
    );
};
function FigureBehind({ amount }: IFigureBehind) {
    let width = window.innerWidth;
    let height = window.outerHeight
    const amountElements = Math.floor(width / 100) + 6;
    const heightElements = Math.floor(height / 100);
    
    return (
        <div className={"FigureWrapper"}>
            <div className={"FigureBehind"}>
                <FigureFirstLine amount={amountElements}/>
                {Array.from(Array(amount ? amount : heightElements).keys()).map(
                    (numb) => {
                        return (
                            <FigureLine
                                key={numb}
                                amount={amountElements}
                                isOdd={numb % 2 === 0}
                                fromTop={(numb === 0 ? 25 : 50) * (numb + 1)}
                                fromTopNextLines={numb > 1 ? 25 + 75 * numb : undefined}
                            />
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default FigureBehind;
