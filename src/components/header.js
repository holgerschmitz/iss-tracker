import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { useOktaAuth } from "@okta/okta-react"

const Header = ({ siteTitle }) => {
  const { oktaAuth } = useOktaAuth();

  const handleLogout = () => oktaAuth.signOut({
    postLogoutRedirectUri: "http://localhost:8000/"
  });

  const [authenticated, setAuthenticated] = React.useState(false);

  oktaAuth.isAuthenticated().then((auth) => setAuthenticated(auth));

  return <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      { authenticated ? <button onClick={handleLogout}>Logout</button> : '' }
      
    </div>
  </header>;
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
