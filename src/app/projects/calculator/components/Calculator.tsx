"use client";

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useTheme } from '../../../context/ThemeContext';
import './Calculator.css';

export default function Calculator() {
  const { theme, toggleTheme } = useTheme();
  const [display, setDisplay] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [mode, setMode] = useState(0); // 0 for calculator, 1 for history
  const [fullExpression, setFullExpression] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(true);

  const isDisabled = 
    display === "Error" ||
    display === "Infinity" ||
    isNaN(Number(display)) ||
    fullExpression.endsWith("Error") ||
    fullExpression.endsWith("Infinity");

  const toggleMode = () => {
    setMode(mode === 0 ? 1 : 0);
  };

  // Handle clicking on a history item
  const handleHistoryItemClick = (historyItem: string) => {
    // Extract the result part (after the equals sign)
    const resultPart = historyItem.split('=')[1].trim();
    
    // Set the result as the current display value
    setDisplay(resultPart);
    setFullExpression("");
    setWaitingForOperand(false);
    
    // Switch back to calculator mode
    setMode(0);
  };

  const calculateResult = useCallback(() => {
    try {
      // Complete the expression with the current display value
      const completeExpression = fullExpression + display;
      
      if (completeExpression === "") {
        return;
      }

      // Using Function instead of eval for safer evaluation
      // This will automatically apply BODMAS rules
      const result = new Function('return ' + completeExpression)();
      
      // Add to history
      setResults(prev => [...prev, `${completeExpression} = ${result}`]);
      
      // Update display with result and reset full expression
      setDisplay(String(result));
      setFullExpression("");
      setWaitingForOperand(true);
    } catch {
      setDisplay("Error");
      setFullExpression("");
      setWaitingForOperand(true);
    }
  }, [display, fullExpression]);

  // Define appendToDisplay and appendToExpression as memoized callbacks
  const appendToDisplay = useCallback((value: string) => {
    if (waitingForOperand) {
      // Start a new number
      setDisplay(value);
      setWaitingForOperand(false);
    } else {
      // Continue building the current number
      setDisplay(prev => prev + value);
    }
  }, [waitingForOperand]);

  // Handle input of operators and building the full expression
  const appendToExpression = useCallback((value: string) => {
    if (/[+\-*/]/.test(value)) {
      // If display is not empty, append it to the full expression along with the operator
      if (display !== "") {
        setFullExpression(prev => prev + display + value);
        setDisplay(""); // Clear the display after adding to expression
        setWaitingForOperand(true);
      } else if (fullExpression !== "" && /[+\-*/]$/.test(fullExpression)) {
        // Replace the last operator if there's one already
        setFullExpression(prev => prev.slice(0, -1) + value);
      }
    }
  }, [display, fullExpression]);

  const clearDisplay = useCallback(() => {
    setDisplay("");
    setFullExpression("");
    setWaitingForOperand(true);
  }, []);

  const deleteLastCharacter = useCallback(() => {
    setDisplay(prev => prev.slice(0, -1));
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    const key = event.key;

    if (/[0-9]/.test(key)) {
      appendToDisplay(key);
    } else if (/[+\-*/]/.test(key)) {
      appendToExpression(key);
    } else if (key === "=" || key === "Enter") {
      event.preventDefault();
      calculateResult();
    } else if (key === "Escape") {
      event.preventDefault();
      clearDisplay();
    } else if (key === "Backspace") {
      event.preventDefault();
      deleteLastCharacter();
    }
  }, [isDisabled, appendToDisplay, appendToExpression, calculateResult, clearDisplay, deleteLastCharacter]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className={`calculator ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      {mode === 0 ? (
        <>
          {/* Calculator Display */}
          <div className={`display-container ${theme === 'dark' ? 'dark-display' : 'light-display'}`}>
            {/* Theme and History toggle buttons */}
            <div className="toggle-buttons">
              <Icon 
                icon="mdi:history" 
                onClick={toggleMode} 
                className={`calculator-toggle ${theme === 'dark' ? 'dark-icon' : 'light-icon'}`}
              />
              <Icon 
                icon={theme === 'dark' ? "mdi:weather-sunny" : "mdi:weather-night"} 
                onClick={toggleTheme} 
                className={`theme-toggle ${theme === 'dark' ? 'dark-icon' : 'light-icon'}`}
              />
            </div>
            <div className={`expression ${theme === 'dark' ? 'dark-text' : 'light-text'}`}>{fullExpression}</div>
            <div className="icon-and-display">
              <div className={`display ${theme === 'dark' ? 'dark-text' : 'light-text'}`}>{display}</div>
            </div>
          </div>

          {/* Calculator Buttons */}
          <div className={`buttons ${theme === 'dark' ? 'dark-buttons' : 'light-buttons'}`}>
            <button
              className={`number ${isDisabled ? 'disabled-number' : ''} ${theme === 'dark' ? 'dark-number' : 'light-number'}`}
              onClick={() => appendToDisplay('1')}
              disabled={isDisabled}
            >
              1
            </button>
            <button
              className={`number ${isDisabled ? 'disabled-number' : ''} ${theme === 'dark' ? 'dark-number' : 'light-number'}`}
              onClick={() => appendToDisplay('2')}
              disabled={isDisabled}
            >
              2
            </button>
            <button
              className={`number ${isDisabled ? 'disabled-number' : ''} ${theme === 'dark' ? 'dark-number' : 'light-number'}`}
              onClick={() => appendToDisplay('3')}
              disabled={isDisabled}
            >
              3
            </button>
            <button
              onClick={() => appendToExpression('+')}
              disabled={isDisabled}
              className={`operation ${isDisabled ? 'disabled-operator' : ''} ${theme === 'dark' ? 'dark-operation' : 'light-operation'}`}
            >
              +
            </button>
            <button
              className={`number ${isDisabled ? 'disabled-number' : ''} ${theme === 'dark' ? 'dark-number' : 'light-number'}`}
              onClick={() => appendToDisplay('4')}
              disabled={isDisabled}
            >
              4
            </button>
            <button
              className={`number ${isDisabled ? 'disabled-number' : ''} ${theme === 'dark' ? 'dark-number' : 'light-number'}`}
              onClick={() => appendToDisplay('5')}
              disabled={isDisabled}
            >
              5
            </button>
            <button
              className={`number ${isDisabled ? 'disabled-number' : ''} ${theme === 'dark' ? 'dark-number' : 'light-number'}`}
              onClick={() => appendToDisplay('6')}
              disabled={isDisabled}
            >
              6
            </button>
            <button
              onClick={() => appendToExpression('-')}
              disabled={isDisabled}
              className={`operation ${isDisabled ? 'disabled-operator' : ''} ${theme === 'dark' ? 'dark-operation' : 'light-operation'}`}
            >
              -
            </button>
            <button
              className={`number ${isDisabled ? 'disabled-number' : ''} ${theme === 'dark' ? 'dark-number' : 'light-number'}`}
              onClick={() => appendToDisplay('7')}
              disabled={isDisabled}
            >
              7
            </button>
            <button
              className={`number ${isDisabled ? 'disabled-number' : ''} ${theme === 'dark' ? 'dark-number' : 'light-number'}`}
              onClick={() => appendToDisplay('8')}
              disabled={isDisabled}
            >
              8
            </button>
            <button
              className={`number ${isDisabled ? 'disabled-number' : ''} ${theme === 'dark' ? 'dark-number' : 'light-number'}`}
              onClick={() => appendToDisplay('9')}
              disabled={isDisabled}
            >
              9
            </button>
            <button
              onClick={() => appendToExpression('*')}
              disabled={isDisabled}
              className={`operation ${isDisabled ? 'disabled-operator' : ''} ${theme === 'dark' ? 'dark-operation' : 'light-operation'}`}
            >
              *
            </button>
            <button
              className={`number ${isDisabled ? 'disabled-number' : ''} ${theme === 'dark' ? 'dark-number' : 'light-number'}`}
              onClick={() => appendToDisplay('0')}
              disabled={isDisabled}
            >
              0
            </button>
            <button 
              onClick={clearDisplay} 
              className={`cancel ${theme === 'dark' ? 'dark-cancel' : 'light-cancel'}`}
            >
              C
            </button>
            <button 
              onClick={calculateResult} 
              disabled={isDisabled} 
              className={`equals ${isDisabled ? 'disabled-equals' : ''} ${theme === 'dark' ? 'dark-equals' : 'light-equals'}`}
            >
              =
            </button>
            <button
              onClick={() => appendToExpression('/')}
              disabled={isDisabled}
              className={`operation ${isDisabled ? 'disabled-operator' : ''} ${theme === 'dark' ? 'dark-operation' : 'light-operation'}`}
            >
              /
            </button>
          </div>
        </>
      ) : (
        /* History View - replaces the entire calculator */
        <div className={`history ${theme === 'dark' ? 'dark-history' : 'light-history'}`}>
          {/* Toggle buttons */}
          <div className="toggle-buttons">
            <Icon 
              icon="mdi:history" 
              onClick={toggleMode} 
              className={`history-icon ${theme === 'dark' ? 'dark-icon' : 'light-icon'}`}
            />
            <Icon 
              icon={theme === 'dark' ? "mdi:weather-sunny" : "mdi:weather-night"} 
              onClick={toggleTheme} 
              className={`theme-toggle ${theme === 'dark' ? 'dark-icon' : 'light-icon'}`}
            />
          </div>
          <div className="history-list-container">
            {results.length > 0 ? (
              <ul className="history-list">
                {results.map((result, index) => (
                  <li 
                    key={index} 
                    onClick={() => handleHistoryItemClick(result)}
                    className={`history-item ${theme === 'dark' ? 'dark-history-item' : 'light-history-item'}`}
                  >
                    {result}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ 
                display: 'flex', 
                height: '100%', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <p style={{ textAlign: 'center', color: theme === 'dark' ? '#8892b0' : '#666' }}>No calculation history</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 