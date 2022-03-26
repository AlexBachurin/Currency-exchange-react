import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import getPercentageDiff from './helpers/getPercentageDiff';
import SingleValute from './components/SingleValute';
import ReactTooltip from 'react-tooltip';
const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
function App() {
  //state for daily currencies list
  const [currencyList, setCurrencyList] = useState([]);
  //state for clicked currency name to display 10-day data
  const [clickedValute, setClickedValute] = useState('');

  //clicking on currency tab handler
  const handleCurrencyClick = (name) => {
    setClickedValute(name);
  }
  //get exchange rate data
  const getRates = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const valutes = data.Valute;
      //transform to array of objects
      const transformed = Object.entries(valutes).map(([name, obj]) => ({ name, ...obj }));
      //get needed values in final array
      const final = transformed.map(item => {
        const { id, name, Previous, Value, Name } = item;
        const change = getPercentageDiff(Value, Previous);
        return {
          id,
          code: name,
          prevValue: Previous,
          curValue: Value,
          FullName: Name,
          change
        }
      })
      console.log(final)
      setCurrencyList(final)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRates(url)
  }, [])

  //useEffect for tooltips
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [currencyList])
  return (
    <main>
      <Wrapper>
        <h1 className='title'>Currency exchange rates</h1>
        <ul className='valutes-list'>
          <li className='single-valute'>
            <p>Name</p>
            <p>Current value</p>
            <p>change %</p>
          </li>
          {currencyList.map((item) => {
            return (
              <SingleValute key={item.id} handleCurrencyClick={handleCurrencyClick} {...item} />
            )
          })}
        </ul>

        <ReactTooltip
          id='showTool'
          type='info'
        >
        </ReactTooltip>
      </Wrapper>
    </main>
  );
}

const Wrapper = styled.section`
    width: 90vw;
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    .title {
      text-align: center;
    }
    .valutes-list {
      padding: 0;
    }
    .single-valute {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #000;
      padding: 0 10px;
    }

`

export default App;
