const Notification = ({ errorMessage, status }) => {
  if (errorMessage === null) {
    return null;
  }
  return <div className={status}>{errorMessage}</div>;
};
export default Notification;
