import * as Location from 'expo-location';

export interface LocationCoords {
  latitude: number;
  longitude: number;
  address?: string;
}

export async function getCurrentLocation(): Promise<LocationCoords | null> {
  try {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') {
      const permissionRes = await Location.requestForegroundPermissionsAsync();
      status = permissionRes.status;
    }

    if (status !== 'granted') {
      return {
        latitude: 0,
        longitude: 0,
        address: 'Location permission denied',
      };
    }

    let loc = null;
    try {
      loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
    } catch {
      // Fallback to last known position if current position times out
      try {
        loc = await Location.getLastKnownPositionAsync();
      } catch {
        loc = null;
      }
    }

    if (!loc) {
      return {
        latitude: 0,
        longitude: 0,
        address: 'Location unavailable',
      };
    }

    let address = 'Current Location';
    try {
      const rev = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (rev.length > 0) {
        const item = rev[0];
        const locality = item.name || item.street || item.subregion || item.district;
        const city = item.city || item.region || item.subregion;
        const parts = [locality, city].filter((p, i, arr) => Boolean(p) && arr.indexOf(p) === i);

        if (parts.length > 0) {
          address = parts.join(', ');
        } else {
          address = `${loc.coords.latitude.toFixed(3)}°, ${loc.coords.longitude.toFixed(3)}°`;
        }
      }
    } catch {
      address = `${loc.coords.latitude.toFixed(3)}°, ${loc.coords.longitude.toFixed(3)}°`;
    }

    return {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      address,
    };
  } catch (error) {
    console.warn('Error fetching location:', error);
    return {
      latitude: 0,
      longitude: 0,
      address: 'Location unavailable',
    };
  }
}
