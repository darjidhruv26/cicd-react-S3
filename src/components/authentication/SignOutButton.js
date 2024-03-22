import React from "react";
import { useMsal } from "@azure/msal-react";

const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    }
    return (
        <a className="logout pointer" onClick={handleLogout}>
        <img
          src={window.location.origin + "/images/logout.svg"}
          alt="logout"
        />
        Logout
      </a>
    )
}

export default SignOutButton;