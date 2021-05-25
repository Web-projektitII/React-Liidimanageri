import React from "react";
import { Error } from "../components/AuthForms";

export function InputX({ register, name, ...rest }) {
  return <input name={name} ref={register} {...rest} />;
}

export function ErrorX({ errors }) {
    let message = errors ? errors: "Ei virhettä"
    console.log("error:",message)
    return <Error>{errors?.message}</Error>;
   }
   
