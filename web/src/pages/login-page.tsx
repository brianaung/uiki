const LoginPage = () => {
  return (
    <>
      <section>
        <h2>Login</h2>
        <form onSubmit={() => console.log("submit")}>
          <div>
            <input name="username" />
          </div>
          <div>
            <input name="password" />
          </div>
          <div>
            <input type="submit" value="Save" />
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
