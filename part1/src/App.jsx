const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.excercises}
    </p>
  );
};

const Content = (props) => {
  let part = props.part.parts;
  return (
    <div>
      <Part part={part[0].name} excercises={part[0].excercises} />
      <Part part={part[1].name} excercises={part[1].excercises} />
      <Part part={part[2].name} excercises={part[2].excercises} />
    </div>
  );
};

const Total = (props) => {
  let total = props.total.parts;
  return (
    <p>
      Number of excercises{" "}
      {total[0].excercises + total[1].excercises + total[2].excercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", excercises: 10 },
      { name: "Using props to pass data", excercises: 7 },
      { name: "State of a component", excercises: 14 },
    ],
  };
  return (
    <div>
      <Header course={course} />
      <Content part={course} />
      <Total total={course} />
    </div>
  );
};

export default App;
