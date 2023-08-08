"use client";

import GoogleMapReact from "google-map-react";

interface MapProps {
  latlng?: number[];
}

const Map: React.FC<MapProps> = ({ latlng = [10, 10] }) => {
  return (
    <div style={{ height: "40vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        center={{
          lat: latlng[0],
          lng: latlng[1],
        }}
        defaultZoom={11}
      >
        <div className="text-lg">⬇</div>
      </GoogleMapReact>
    </div>
  );
};

export default Map;
