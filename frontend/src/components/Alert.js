const Alert = ({ message }) => {
  return (
    message && (
      <div className="alert alert-success" role="alert">
        {message}
      </div>
    )
  );
};

export default Alert;
