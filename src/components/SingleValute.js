import React from 'react'
import styled from 'styled-components'

const SingleValute = ({ id, code, curValue, FullName, change, handleHover }) => {


    return (
        <Wrapper data-tip={FullName} data-for='showTool'>
            <p>{code}</p>
            {/* <p>{prevValue}</p> */}
            <p>{curValue}</p>
            <p>{change}%</p>
            {/* <Tooltip /> */}
            {/* <ReactTooltip id={id}>
               
            </ReactTooltip> */}
        </Wrapper>

    )
}

const Wrapper = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #000;
    cursor: pointer;
    :hover {
        background: gray;
    }

`

export default SingleValute