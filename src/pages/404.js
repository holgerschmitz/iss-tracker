import * as React from "react"

import PageContainer from "../components/page-container"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <PageContainer>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </PageContainer>
)

export default NotFoundPage
