import React, { useState } from 'react'
import styled from 'styled-components'
import { getYear, getDate, getMonth, subDays } from 'date-fns'

const SingleValute = ({ code, curValue, FullName, change, handleCurrencyClick, clickedValute }) => {
    //state for display
    const [show, setShow] = useState(false);

    const changeVisibility = () => {
        setShow(!show);
    }
    const today = getDate(new Date());
    // const day10 = subDays(new Date(), 10);
    // console.log(day10)
    // const month = getMonth(day10) + 1;
    // console.log(month)
    // const date = getDate(day10);
    // console.log(date);
    // const year = getYear(day10);
    // console.log(year)
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
            {show ? <InnerWrapper>
                <li className='info'>
                    <p>{today}</p>
                    <p>{code}</p>
                    <p>{curValue}</p>
                    <p>{change}%</p>
                </li>
                <li className='info'>
                    <p>{today}</p>
                    <p>{code}</p>
                    <p>{curValue}</p>
                    <p>{change}%</p>
                </li>
                <li className='info'>
                    <p>{today}</p>
                    <p>{code}</p>
                    <p>{curValue}</p>
                    <p>{change}%</p>
                </li>
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