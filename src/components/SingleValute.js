import React, { useState } from 'react'
import styled from 'styled-components'

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
            {loading && clickedValute === code ? <div>Loading...</div> : null}
            {clickedValute === code && !loading ? <InnerWrapper className={show ? `show` : `hide`}>
                {oldRates.map(item => {
                    const { date, name, value } = item;
                    return (
                        <li className='info'>
                            <p>{date}</p>
                            <p>{name}</p>
                            <p>{value}</p>
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