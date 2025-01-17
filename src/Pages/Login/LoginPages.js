import "./LoginStyles.css"; // Import your CSS file
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { setUserSession } from "../../Auth/AuthService";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const loginAPIUrl = "LOGIN API URL HERE";

const Login = (props) => {
  const userRef = useRef();
  const passwordRef = useRef();

  const [userid, setUserid] = useState("");
  const [pwd, setPwd] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    userRef.current.focus();
    const rememberMeValue = localStorage.getItem("rememberMe") === "true";
    if (rememberMeValue) {
      const savedUserId = localStorage.getItem("userId");
      setUserid(savedUserId || "");
      setRememberMe(true);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (userid.trim() === "" || pwd.trim() === "") {
      Swal.fire({
        icon: "error",
        text: "ユーザーIDやパスワードは必要です。",
        timer: 3000,
        timerProgressBar: true,
        confirmButtonColor: "#5270ff",
      });
      return;
    }

    const requestConfig = {
      headers: {
        "x-api-key": "API KEY HERE",
      },
    };

    const requestBody = {
      userID: userid,
      password: pwd,
    };

    axios
      .post(loginAPIUrl, requestBody, requestConfig)
      .then((resp) => {
        setUserSession(resp.data.user, resp.data.token);
        if (rememberMe) {
          localStorage.setItem("userId", userid);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("userId");
          localStorage.removeItem("rememberMe");
        }
        Swal.fire({
          icon: "success",
          text: "ログイン成功",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        props.history.push("/dashboard");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
            timer: 3000,
            timerProgressBar: true,
            confirmButtonColor: "#5270ff",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "只今、サーバーはメンテナンス中です。",
            timer: 3000,
            timerProgressBar: true,
            confirmButtonColor: "#5270ff",
          });
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="box box1"></div>
      <section className="login-section">
        <form className="login-form" onSubmit={submitHandler}>
          <h1>ログイン</h1>
          <label htmlFor="userid">ユーザーID :</label>
          <input
            type="text"
            id="userid"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => {
              setUserid(e.target.value);
            }}
            value={userid}
            required
          />
          <label htmlFor="password">パスワード :</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              ref={passwordRef}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
              required
            />
            <div className="password-toggle-container">
              <IconButton
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </div>
          </div>
          <label className="checkbox-remember" htmlFor="rememberMe">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            次回からユーザーIDの入力を省略
          </label>
          <button className="login-button">ログイン</button>
        </form>

        {/* <p>
          <span className="line">
            put router link here
            <a href="#">新しいアカウントを作成</a>
          </span>
        </p> */}
      </section>
    </div>
  );
};

export default Login;
