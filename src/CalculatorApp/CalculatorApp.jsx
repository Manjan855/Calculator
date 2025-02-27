import React, { useState, useEffect } from "react";
import "./calculatorApp.css";

const Calculator = () => {
  // State to store the input expression
  const [input, setInput] = useState("");

  // useEffect to handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      // If the key is a number, operator, or special character, add it to the input
      if (/[0-9.+\-*/()%^]/.test(key)) {
        setInput((prev) => prev + key);
      }
      // If the key is "Enter", evaluate the expression
      else if (key === "Enter") {
        try {
          setInput(evaluateExpression(input).toString());
        } catch (error) {
          setInput("Error");
        }
      }
      // If the key is "Backspace", delete the last character
      else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      }
      // If the key is "Escape", clear the input
      else if (key === "Escape") {
        setInput("");
      }
    };

    // Add event listener for keydown events
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup: Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]); // Dependency array ensures the effect runs when `input` changes

  // Function to handle button clicks
  const handleClick = (value) => {
    // If "=" is clicked, evaluate the expression
    if (value === "=") {
      try {
        setInput(evaluateExpression(input).toString());
      } catch (error) {
        setInput("Error");
      }
    }
    // If "AC" is clicked, clear the input
    else if (value === "AC") {
      setInput("");
    }
    // If "DEL" is clicked, delete the last character
    else if (value === "DEL") {
      setInput(input.slice(0, -1));
    }
    // Otherwise, append the clicked value to the input
    else {
      setInput(input + value);
    }
  };

  // Function to evaluate the mathematical expression
  const evaluateExpression = (expr) => {
    try {
      // Replace trigonometric functions with their JavaScript equivalents
      expr = expr.replace(
        /sin\(([^)]+)\)/g,
        (_, angle) => `Math.sin(${Math.PI} * ${angle} / 180)`
      );
      expr = expr.replace(
        /cos\(([^)]+)\)/g,
        (_, angle) => `Math.cos(${Math.PI} * ${angle} / 180)`
      );
      expr = expr.replace(
        /tan\(([^)]+)\)/g,
        (_, angle) => `Math.tan(${Math.PI} * ${angle} / 180)`
      );

      // Replace square root with Math.sqrt
      expr = expr.replace(/sqrt\(([^)]+)\)/g, (_, num) => `Math.sqrt(${num})`);

      // Replace "^" with "**" for exponentiation
      expr = expr.replace(/\^/g, "**");

      // Replace "%" with "/100" for percentage
      expr = expr.replace(/%/g, "/100");

      // Evaluate the expression and return the result
      return eval(expr);
    } catch {
      // Return "Error" if evaluation fails
      return "Error";
    }
  };

  return (
    <div className="calculator">
      <h1 className="cal">CalculatorApp</h1>
      {/* Display the input or "0" if input is empty */}
      <div className="display">{input || "0"}</div>
      <div className="buttons">
        {/* Render buttons for operations and functions */}
        {["AC", "DEL", "/", "*", "sin(", "cos(", "tan(", "sqrt(",  "%"].map(
          (btn) => (
            <button key={btn} onClick={() => handleClick(btn)}>
              {btn}
            </button>
          )
        )}
        {/* Render buttons for numbers, decimal point, and equals sign */}
        {[7, 8, 9, "-", 4, 5, 6, "+", 1, 2, 3, ".", 0, ")", "="].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn.toString())}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
