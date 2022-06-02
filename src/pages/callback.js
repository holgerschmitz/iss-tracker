import * as React from "react"
import { LoginCallback } from "@okta/okta-react";
import PageContainer from "../components/page-container";

const Callback = () => {
    return <PageContainer>
        <LoginCallback/>
        <p>Logging you in ...</p>
    </PageContainer>
}

export default Callback;