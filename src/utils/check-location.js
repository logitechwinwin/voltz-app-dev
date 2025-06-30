// Haversine formula to calculate the distance between two coordinates (lat/lon)
function haversine(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    const toRadians = (degrees) => degrees * Math.PI / 180;

    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    // Haversine formula
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dlon / 2) * Math.sin(dlon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Earth's radius in meters
    const R = 6371000; // meters
    const distance = R * c; // Distance in meters

    return distance;
}

// Function to check if the user is within a given radius from the office
export function isWithinRadius(latOffice, lonOffice, latUser, lonUser, radius = 50) {
    const distance = haversine(latOffice, lonOffice, latUser, lonUser);
    return distance <= radius; // True if the user is within the radius
}

// Example usage:

// const latOffice = 40.748817;  // Latitude of the office
// const lonOffice = -73.985428; // Longitude of the office

// const latUser = 40.749000;    // Latitude of the user
// const lonUser = -73.985000;   // Longitude of the user

// Check if the user is within 50 meters of the office
// const isInside = isWithinRadius(latOffice, lonOffice, latUser, lonUser, 50);
// Will print `true` if the user is within 50 meters, otherwise `false`
