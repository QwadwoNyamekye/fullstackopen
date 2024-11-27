const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((value) => (
        <Part key={value.id} part={value.name} exercises={value.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        total of {parts.reduce((n, { exercises }) => n + exercises, 0)}{" "}
        exercises
      </b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
