import React from 'react'
import styled from 'styled-components'

const Tooltip = () => {
    return (
        <Wrapper>im tooltip</Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 10px;
`

export default Tooltip