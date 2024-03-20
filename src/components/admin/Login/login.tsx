import "./login.scss";
import { cookies } from "next/headers";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import axios from "axios";

function LoginPage() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  let error: null | string = null;
  let loader: boolean = false;

  async function createInvoice(formData: FormData) {
    "use server";

    const emailEntry = formData.get("email");
    const passwordEntry = formData.get("password");

    const email =
      typeof emailEntry === "string" ? emailEntry.toLowerCase() : "";
    const password = typeof passwordEntry === "string" ? passwordEntry : "";

    const rawFormData = { email, password };

    await axios
      .post(`${baseURL}/api/auth/login`, rawFormData)
      .then((response) => {
        cookies().set("logIn", "true");
        cookies().set("id", response.data.id);
        cookies().set("email", response.data.email);
        cookies().set("role", response.data.role);
        cookies().set("token", response.data.token, { secure: true });
      })
      .catch((error) => {
        console.log("login", error.response.data.message);
      });
  }

  return (
    <>
      <div className="container-login-admin">
        {loader ? <div>loading...</div> : null}
        {error ? <div>{error}</div> : null}
        <div>
          <div>admin account</div>
          <div>name: preview@gmail.com</div>
          <div>Pass: 1234567</div>
        </div>
        <form action={createInvoice}>
          <input type="email" name="email" />
          <input type="password" name="password" />
          <MyBtn text={"Submit"} color={"primary"} />
        </form>
      </div>
    </>
  );
}

export default LoginPage;
