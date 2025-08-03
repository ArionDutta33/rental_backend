import axios from "axios";

export const getCoords = async (address: string) => {
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE_API_KEY}`
  );

  const results = res.data?.results;

  if (!results || results.length === 0) {
    console.error("Geocoding failed for address:", address);
    throw new Error("Invalid address or no geocoding results");
  }

  console.log("Geocode result:", results[0].geometry.location);
  return results[0].geometry.location;
};
