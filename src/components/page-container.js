import * as React from "react"
import { Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { navigate } from '@reach/router';
import Layout from './layout';
import SecurePage from "./secure-page";

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-20943582.okta.com/oauth2/default',
  clientId: '0oa2pqe5iik6wUL285d7',
  redirectUri: `http://localhost:8000/callback`,
});

const PageContainer = ({ secure, children }) => {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  const pageContent = secure ? <SecurePage>{children}</SecurePage> : children;

  return <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
    <Layout>
      {pageContent}
    </Layout>
  </Security>
}

export default PageContainer;