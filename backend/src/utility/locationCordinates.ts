import axios from "axios";

export async function getLocationCoordinates(
  pickupAddress: string
) {
  try {
    const address = `${pickupAddress}, Jaipur, Rajasthan, India`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1&countrycodes=in`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "bus_guardian/1.0",
      },
    });

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return location;
    }
    return null;
  } catch (error) {
    console.log("error in fetching location codinates", error);
    return null;
  }
}
