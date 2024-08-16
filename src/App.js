import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { Block } from './components/Block';

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PLN');
  const [fromPrice, setFromPrice] = useState(1); // Змінив початкове значення на 1
  const [toPrice, setToPrice] = useState(0);
  const ratesRef = useRef({});

  useEffect(() => {
    const getCurrency = async () => {
      try {
        const response = await fetch(
          'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
        );
        const data = await response.json();
        const ratesObject = data.reduce((acc, currency) => {
          acc[currency.cc] = currency.rate;
          return acc;
        }, {});

        ratesObject['UAH'] = 1; // Додамо гривню як базову валюту
        ratesRef.current = ratesObject;
        onChangeFromPrice(1);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    getCurrency();
  }, []);

  const onChangeFromPrice = (value) => {
    if (ratesRef.current[fromCurrency] && ratesRef.current[toCurrency]) {
      const priceInUAH = value * ratesRef.current[fromCurrency];
      const result = priceInUAH / ratesRef.current[toCurrency];
      setFromPrice(value);
      setToPrice(result.toFixed(3));
    }
  };

  const onChangeToPrice = (value) => {
    if (ratesRef.current[fromCurrency] && ratesRef.current[toCurrency]) {
      const priceInUAH = value * ratesRef.current[toCurrency];
      const result = priceInUAH / ratesRef.current[fromCurrency];
      setToPrice(value);
      setFromPrice(result.toFixed(3));
    }
  };

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      onChangeFromPrice(fromPrice);
    }
  }, [fromCurrency]);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      onChangeToPrice(toPrice);
    }
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
