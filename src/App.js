import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import getPercentageDiff from './helpers/getPercentageDiff';
import addZeroToNum from './helpers/addZeroToNum';
import SingleValute from './components/SingleValute';
import ReactTooltip from 'react-tooltip';
import { getYear, getDate, getMonth, subDays } from 'date-fns'
const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
const base = 'RUB'
function App() {
  //state for daily currencies list
  const [currencyList, setCurrencyList] = useState([]);
  //state for clicked currency name to display 10-day data
  const [clickedValute, setClickedValute] = useState('');
  //list for holding old rates
  const [oldRates, setOldRates] = useState([]);
  //loading
  const [loading, setLoading] = useState(false);

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
      setCurrencyList(final)
    } catch (error) {
    }
  }
  //fetch past days rates
  const fetchOldRates = async () => {
    //setup loading wait for fetch fully complete
    setLoading(true);
    for (let i = 1; i <= 10; i++) {
      const day = subDays(new Date(), i);
      const month = getMonth(day) + 1;
      const date = getDate(day);
      const year = getYear(day);
      try {
        const res = await fetch(`https://www.cbr-xml-daily.ru/archive/${year}/${addZeroToNum(month)}/${addZeroToNum(date)}/daily_json.js`);
        if (res.ok) {
          const data = await res.json();
          const valutes = data.Valute;
          //transform to array of objects
          const transformed = Object.entries(valutes).map(([name, obj]) => ({ name, ...obj }));
          //filter by neeeded valute name
          const filtered = transformed.filter(item => item.name === clickedValute);
          //get value of this valute
          const value = filtered[0].Value;
          //name 
          const name = filtered[0].name;
          //create new object to store data
          const change = getPercentageDiff(filtered[0].Value, filtered[0].Previous);
          const newObj = {
            date: `${addZeroToNum(month)}.${addZeroToNum(date)}`,
            value,
            name,
            change
          }
          setOldRates(oldList => {
            return [...oldList, newObj]
          });
        }
        else {
          const newObj = {
            date: day,
            value: '???? ?????????????????????? ???? ?????????????? ????????',
            name: clickedValute
          }
          setOldRates(oldList => {
            return [...oldList, { newObj }]
          })
          // continue
        }
      } catch (error) {
        console.log(error)
      }
    }
    //disable load after loop
    setLoading(false);
  }
  //get rates on load
  useEffect(() => {
    getRates(url)
  }, [])

  //useEffect for tooltips
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [currencyList])

  useEffect(() => {
    //only attempt to fetch if we have something in clickedValute state
    if (clickedValute) {
      //reset array on every valute change
      setOldRates([]);
      fetchOldRates();
    }
    //eslint-disable-next-line
  }, [clickedValute])

  return (
    <main>
      <Wrapper>
        <h1 className='title'>Currency exchange rates</h1>
        <h2 className='subtitle'>for {base}</h2>
        <ul className='valutes-list'>
          <li className='single-valute'>
            <p>Name</p>
            <p>Current value</p>
            <p>change %</p>
          </li>
          {currencyList.map((item) => {
            return (
              <SingleValute key={item.id} handleCurrencyClick={handleCurrencyClick} {...item} clickedValute={clickedValute} oldRates={oldRates} loading={loading} />
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
    padding: 40px 0;
    text-align: center;
    .subtitle {
      padding-top: 10px;
    }
    .valutes-list {
      padding: 0;
      background: #cee8f0;
      border-radius: 10px;
    }
    .single-valute {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      padding: 0 10px;
      text-transform: capitalize;
      font-size: 18px;
      font-weight: bold;
    }

`

export default App;
