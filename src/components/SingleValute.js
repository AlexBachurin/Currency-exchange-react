import React from 'react'
import styled from 'styled-components'
import { getYear, getDate, getMonth, subDays } from 'date-fns'

const SingleValute = ({ code, curValue, FullName, change, handleCurrencyClick }) => {

    // const day10 = subDays(new Date(), 10);
    // console.log(day10)
    // const month = getMonth(day10) + 1;
    // console.log(month)
    // const date = getDate(day10);
    // console.log(date);
    // const year = getYear(day10);
    // console.log(year)
    return (
        <Wrapper onClick={() => handleCurrencyClick(code)} data-tip={FullName} data-for='showTool'>
            <p>{code}</p>
            <p>{curValue}</p>
            <p>{change}%</p>
        </Wrapper>

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

export default SingleValute