import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Loading from './Loading';
const SingleValute = ({ code, curValue, FullName, change, handleCurrencyClick, clickedValute, oldRates, loading }) => {
    //state for display
    const [show, setShow] = useState(false);

    const changeVisibility = () => {
        setShow(!show);
    }

    //useEffect to set show to false if we clicked in another li
    useEffect(() => {
        if (clickedValute !== code) {
            setShow(false);
        }
        //eslint-disable-next-line
    }, [clickedValute])
    return (
        <>
            <Wrapper onClick={() => {
                handleCurrencyClick(code);
                changeVisibility();
            }} data-tip={FullName} data-for='showTool' className={clickedValute === code && show ? 'active' : null}>
                <p className='code'>{code}</p>
                <p>{curValue}</p>
                <p className={change > 0 ? 'positive' : 'negative'}>{change}%</p>
            </Wrapper>

            {/* conditional rendering if we clicked valute display it */}
            {loading && clickedValute === code ? <Loading /> : <InnerWrapper className={show && clickedValute === code ? `show` : `hide`}>
                <h2 className='info-title'>info for the past 10 days</h2>
                <div className="underline"></div>
                <li className='info info-header'>
                    <p>date</p>
                    <p>value</p>
                    <p>change</p>
                </li>
                {oldRates.map(item => {
                    const { date, value, change } = item;
                    return (
                        <li key={date + value + change} className='info'>
                            <p>{date}</p>
                            <p>{value}</p>
                            <p className={change > 0 ? 'positive' : 'negative'}>{change}%</p>
                        </li>
                    )
                })}
            </InnerWrapper>}
        </>
    )
}

const Wrapper = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 0 10px;
    cursor: pointer;
    text-align: center;
    color: #000;
    .code {
        font-size: 18px;
        font-weight: bold;
    }
    :hover {
        background: #7997a1;
    }
    

`

const InnerWrapper = styled.ul`
    padding: 0;
    background:#9cc2cf;
    .info-title {
        padding-top: 25px;
        text-transform: capitalize;
        font-size: 22px;
        text-align: center;
    }
    .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        padding: 0 10px;
        text-align: center;
        color: #191919;
        text-transform: capitalize;
        

    }
    .info-header {
        font-size: 18px;
        font-weight: bold;
    }
    

`

export default SingleValute