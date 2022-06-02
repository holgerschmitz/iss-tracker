import * as React from "react"
import { useInterval } from "../utils/use-interval";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import PageContainer from "../components/page-container";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export default function LocateISS() {
  const [serverResponse, setServerResponse] = React.useState([0,0]);
  
  async function updateISSPosition() {
    const response = await window.fetch(`/api/get-iss-position`, {
      method: `GET`,
      headers: {
        "content-type": "application/json",
      },
    }).then(response => response.json());
    console.log(response);
    setServerResponse(response)
  }

  useInterval(updateISSPosition, 5000);

  return (
    <PageContainer secure={true}>
    <div className="iss-map-container">
      <ComposableMap
        projection="geoOrthographic"
        projectionConfig={{
          rotate: [-serverResponse[0], -serverResponse[1], 0],
          scale: 300
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => <Geography 
              key={geo.rsmKey} 
              geography={geo} 
              fill="#EAEAEC"
              stroke="#888888"/>)
          }
        </Geographies>
          <Marker key={"ISS"} coordinates={serverResponse}>
            <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={-15}
              style={{ fontFamily: "system-ui", fill: "#333333" }}
            >
              ISS
            </text>
          </Marker>
      </ComposableMap>
    </div>
    </PageContainer>
  );
}

