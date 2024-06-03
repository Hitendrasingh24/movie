import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  };

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        redirectNow();
      }
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (event) => {
    try {
      const user = await emailPasswordLogin(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      if (error.statusCode === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <ToastContainer />

    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
      <div className={styles.left}>
      <form className={styles.form_container} >
      <h1>Login to Your Account</h1>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={form.email}
            onChange={onFormInputChange}
            className={styles.input}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={form.password}
            onChange={onFormInputChange}
            className={styles.input}
          />
          <Button className={styles.green_btn} variant="contained"  onClick={onSubmit}>
            Login
          </Button>
          
        </form>
				</div>
        <div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
      </div> 
		</div>
  </div>
    </>
  );
};

export default Login;
