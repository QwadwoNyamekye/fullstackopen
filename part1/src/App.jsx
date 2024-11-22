import { useState } from "react";

const Button = ({ handleCount, text }) => {
  const buttonName = text;
  return <button onClick={handleCount}>{buttonName}</button>;
};

const StatisticLine = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {" "}
        {value} {text == "positive" && "%"}
      </td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad, count, all }) => {
  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine
        text="average"
        value={
          (count.good * good + count.neutral * neutral + count.bad * bad) / all
        }
      />
      <StatisticLine text="positive" value={(good / all) * 100} />
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const count = { good: 1, neutral: 0, bad: -1 };

  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <Button handleCount={() => setGood(good + 1)} text="good" />
      <Button handleCount={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleCount={() => setBad(bad + 1)} text="bad" />
      <br />
      <h1>statistics</h1>
      {good || neutral || bad ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          count={count}
          all={all}
        />
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

export default App;
