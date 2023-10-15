import {useMemo} from "react";

const currentPriceCP = useMemo(() => {
    let price = (parseFloat(entryPriceCP) + parseFloat(entryPriceCP) * parseFloat(margentCP)/100) + (parseFloat(entryPriceCP) + parseFloat(entryPriceCP) * parseFloat(margentCP)/100)*parseFloat(IVACP)/100;
    return price.toFixed(2);
}, [entryPriceCP, margentCP, IVACP])

const currentProfitCP = useMemo(() => {
    let profit = (parseFloat(currentPriceCP) - parseFloat(entryPriceCP)) * (1 - parseFloat(IVACP) / 100)
    return profit.toFixed(2);
}, [entryPriceCP, margentCP, currentPriceCP])


const currentMargentCPProfit = useMemo(() => {
    let withoutIVACP = parseFloat(IVACP) != 0 ? parseFloat(marketPriceCP) - parseFloat((parseFloat(marketPriceCP) * (parseFloat(IVACP) / 100)).toFixed(2)) : parseFloat(marketPriceCP)
    let margentCPProfit = ( withoutIVACP - parseFloat(entryPriceCP));
    return margentCPProfit.toFixed(2);
}, [entryPriceCP, marketPriceCP, IVACP])

const currentMargentCP = useMemo(() => {
    let withoutIVACP = parseFloat(IVACP) != 0 ? parseFloat(marketPriceCP) - parseFloat((parseFloat(marketPriceCP) * (parseFloat(IVACP) / 100)).toFixed(2)) : parseFloat(marketPriceCP)
    let margentCPProfit = ( withoutIVACP - parseFloat(entryPriceCP));
    let margentCP = parseFloat(margentCPProfit) / parseFloat(entryPriceCP) * 100
    return margentCP.toFixed(2);
}, [entryPriceCP, marketPriceCP, IVACP])