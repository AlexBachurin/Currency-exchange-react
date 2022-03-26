import React, { useState } from 'react'
import styled from 'styled-components'
import Loading from './Loading';
const SingleValute = ({ code, curValue, FullName, change, handleCurrencyClick, clickedValute, oldRates, loading }) => {
    //state for display
    const [show, setShow] = useState(false);

    const changeVisibility = () => {
        setShow(!show);
    }
    return (
        <>
            <Wrapper onClick={() => {
                handleCurrencyClick(code);
                changeVisibility();
            }} data-tip={FullName} data-for='showTool'>
                <p>{code}</p>
                <p>{curValue}</p>
                <p>{change}%</p>
            </Wrapper>

            {/* conditional rendering if we clicked valute display it */}
            {loading && clickedValute === code ? <Loading /> : null}

            {clickedValute === code && !loading ? <InnerWrapper className={show ? `show` : `hide`}>
                <h2>info for past 10 days</h2>
                <li className='info'>
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
                            <p>{change}%</p>
                        </li>
                    )
                })}
            </InnerWrapper> :
                null}
        </>
    )
}

const Wrapper = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #000;
    padding: 0 10px;
    cursor: pointer;
    text-align: center;
    :hover {
        background: gray;
    }
    

`

const InnerWrapper = styled.ul`
    padding: 0;
    background: green;
    .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #000;
        padding: 0 10px;
        cursor: pointer;
        text-align: center;
    }
    

`

export default SingleValute