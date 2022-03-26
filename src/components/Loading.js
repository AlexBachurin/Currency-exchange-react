import React from 'react'
import styled from 'styled-components'

const Loading = () => {
    return (
        <Wrapper>
            <img src="https://res.cloudinary.com/dljezd6qv/image/upload/v1648314521/giphy-loading_un0hcn.gif" alt="loading" />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    min-height: 300px;
    display: grid;
    place-items: center;
    width: 300px;
    margin: 0 auto;
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }

`
export default Loading