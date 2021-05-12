import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/omnia_logo.png";
import { Card, Logo, Error, Button } from "../components/AuthForms";
import { ErrorX } from "../components/Formfields";
import { useForm } from "react-hook-form";
import { FormGroup, Form, Input, Label, FormText } from 'reactstrap';


function Signup(props) {
  const [isSignedUp, setSignedUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  /* Huom. lomakkeen validoinnin jälkeen oletuksena on siirtyminen onChange-
     validointiin, mikä olisi häiritsevää jokaisen merkin kirjoittamisen yhteydessä */
  /*const { register, errors, handleSubmit } = useForm({reValidateMode: 'onBlur'});*/
  const { register, errors, handleSubmit } = useForm({reValidateMode: 'onChange'});

  /* const onSubmit = data => console.log(data); */

  if (isSignedUp) {
    return <Redirect to={{ pathname: "/login" }} />;
  }


  function postSignup(data) {
    /* axios.post("http://localhost/testit/react_testi.php", { */
    /* var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password); */
    console.log("data:",data)
    const url = "http://localhost:5000/auth/signup"
    /* const url = "http://localhost/testit/response_json.php" */
    /*Huom. jos lähetetään muuttujista, niiden tulee päivittyä,
      jos lähetään react-hook-form-data, näin ei välttämättä ole.*/
    axios.post(url, 
      /*{email,
      username,
      password,
      password2}*/
      data
      )
      .then(result => {
      if (result.status === 200 && result.data === "OK") {
        setSignedUp(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }
  /*Huom. Styled Components ei kelpaa nykymuodossaan Form-komponentiksi. Reactstrap Input-kentässä
    tulee olla innerRef, Styled Component Input-kentässä ref.*/
  return (
    <Card>
      <Logo src={logoImg} />
      <Form onSubmit={handleSubmit(data => postSignup(data))}>
        <Input 
          name="email" 
          type="email" 
          /*value={email}
          onChange={e => {
            setEmail(e.target.value);
            }}*/
          innerRef={register()}
          placeholder="email"/>
        {/*}  
        <Input 
          type="text" 
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            }} 
          placeholder="username"/>
          */}  
        <Input
          name="username"
          type="text" 
          /* value={username}
          onChange={e => {
            setUsername(e.target.value);
            }} */
          /* '^[A-Za-z][A-Za-z0-9_.]*$' */  
          innerRef={register({ required: true, minLength:{value:3,message: "Username must be at least 3 characters"}, maxLength: 30})}  
          placeholder="username"/>
        <ErrorX errors={errors.username} />

        <Input 
          name="password" 
          type="password" 
          /*value={password}
          onChange={e => {
            setPassword(e.target.value);
            }}*/
          innerRef={register()}
          placeholder="password" />
        <Input 
          name="password2" 
          type="password" 
          /*value={password2}
          onChange={e => {
            setPassword2(e.target.value);
            }}*/
          innerRef={register()}
          placeholder="password again" />
        {/* <Button onClick={postSignup}>Sign Up</Button> */}
        <Button type="submit">Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
      { isError && <Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Signup;

