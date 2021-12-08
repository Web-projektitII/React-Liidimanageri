import React, { useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/omnia_logo.png";
import { Card, Logo, Error, Button } from "../components/AuthForms";
import { ErrorX } from "../components/Formfields";
import { useForm } from "react-hook-form";
//import { FormGroup, Form, Input, Label, FormText } from 'reactstrap';
import { Form, Input } from 'reactstrap';


function Signup(props) {
  const [isSignedUp, setSignedUp] = useState(false);
  const [isError, setIsError] = useState(false);
   /* Huom. lomakkeen validoinnin jälkeen oletuksena on siirtyminen onChange-
     validointiin, mikä olisi häiritsevää jokaisen merkin kirjoittamisen yhteydessä */
  const { register, watch, errors, handleSubmit } = useForm({reValidateMode: 'onBlur'});
  const password = useRef({});
  password.current = watch("password", "");
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
    axios.post(url,data)
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
          innerRef={register({required:"Pakollinen kenttä"})}
          placeholder="email"/>
        <ErrorX errors={errors.email} />
        <Input
          name="username"
          type="text" 
          innerRef={register({required:"Pakollinen kenttä", minLength:{value:3,message:"Username must be at least 3 characters"}, maxLength: 30})}  
          placeholder="username"/>
        <ErrorX errors={errors.username} />
        <Input 
          name="password" 
          type="password" 
          innerRef={register({required:"Pakollinen kenttä", minLength:{value:8,message:"Password must be at least 8 characters"}})}
          placeholder="password" />
        <ErrorX errors={errors.password} />
        <Input 
          name="password2" 
          type="password" 
          innerRef={register({
            validate: value => value === password.current || "The passwords do not match"
            })}
          placeholder="password again" />
        <ErrorX errors={errors.password2} />  
        {/* <Button onClick={postSignup}>Sign Up</Button> */}
        <Button type="submit">Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
      { isError && <Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Signup;

