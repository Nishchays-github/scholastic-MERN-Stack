import axios from "axios";

// API Keys and URLs
const OLAMAPS_API_KEY = "1IyYo0305btp776JXy73Lydn3g4mKClKtn5sQa4S";
const APININJAS_API_KEY = "/grzDUcTJIzNo+ICUV/jfA==hVV7sqYupbVGQ72P";
const APININJAS_BASE_URL = "https://api.api-ninjas.com/v1/geocoding";
const IPSTACK_ACCESS_KEY = "6f61cc230baef3ff75bb1be0871bba1e";

/**
 * Get nearby schools based on latitude and longitude
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getNearbySchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  try {
    const url = `https://api.olamaps.io/places/v1/nearbysearch?location=${latitude},${longitude}&types=school&radius=10000&withCentroid=false&rankBy=popular&limit=50&api_key=${OLAMAPS_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching schools:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch school data" });
  }
};

/**
 * Get user's current location based on IP address
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getCurrentLocation = async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.ipstack.com/check?access_key=${IPSTACK_ACCESS_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching location:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Error fetching location data" });
  }
};

/**
 * Search for coordinates of a given location
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const searchLocationCoordinates = async (req, res) => {
    const { location } = req.body;
  
    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }
  
    // Check if the location is a pincode (numeric)
    const pincode = Number(location);
    if (!isNaN(pincode) && pincode.toString().length === 6) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`
        );
        
        if (!response.data || response.data.length === 0) {
          return res.status(404).json({ error: "No location found for this pincode" });
        }
        
        let x = response.data[0].lat,y = response.data[0].lon;
        return res.json({x,y});
      } catch (error) {
        console.error(
          "Error fetching coordinates:",
          error.response?.data || error.message
        );
        return res.status(500).json({ error: "Error fetching pincode coordinates" });
      }
    }
  
    // Handle non-pincode location search
    try {
      const response = await axios.get(APININJAS_BASE_URL, {
        params: { city: location, country: "India" },
        headers: { "X-Api-Key": APININJAS_API_KEY },
      });
      
      if (!response.data || response.data.length === 0) {
        return res.status(404).json({ error: "No location found" });
      }
      let x = response.data[0].latitude,y = response.data[0].longitude;
      return res.json({x,y});
    } catch (error) {
      console.error(
        "Error fetching coordinates:",
        error.response?.data || error.message
      );
      return res.status(500).json({ error: "Error fetching location coordinates" });
    }
  };
