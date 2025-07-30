import axios from "axios";
export const getCoords = async (address: string) => {
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
  );
  console.log(res.data.results[0].geometry.location);
  return res.data.results[0].geometry.location;
};
