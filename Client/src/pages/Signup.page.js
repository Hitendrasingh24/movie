import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import styles from "./styles.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { emailPasswordSignup } = useContext(UserContext);
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

  const onSubmit = async () => {
    try {
      const user = await emailPasswordSignup(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.login_container}>
    <div className={styles.login_form_container}>
    <div className={styles.left}>
    <form className={styles.form_container} >
    <h1>Sign up new Account</h1>
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
          Signup
        </Button>
        
      </form>
      </div>
      <div className={styles.right}>
        <h1>Already have an Account ?</h1>
        <Link to="/login">
          <button type="button" className={styles.white_btn}>
            Sing Up
          </button>
        </Link>
    </div> 
  </div>
</div>
  );
};

export default Signup;