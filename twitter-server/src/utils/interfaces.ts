interface JWTUser{
    id:number
    email:string
  }
  interface MyContext{
    user?:JWTUser
  }

  interface GoogleTokenResult{

    iss?:string;
    nbf?:number;
    aud?:string;
    sub?:string;
    email:string;
    email_verified:boolean;
    azp?:string;
    name?:string;
    picture?:string;
    given_name:string;
    family_name?:string;
    iat?:number;
    exp?:number;
    jti?:string;
    alg?:string;
    kid?:string;
    typ?:string
}
  export {JWTUser,MyContext,GoogleTokenResult}