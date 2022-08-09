

export const toPeriod = (data:string) => {
    const splitArr = data.replace(/(,)/, '.').split(".")
    let finalResult = ""
    for (let i = 0; i < splitArr.length; i++)
        if (finalResult.length === 0) finalResult = `${splitArr[0]}.`
        else finalResult += splitArr[i]
    return +finalResult
}
