
export interface GetSearchOutputResults {
    address_components?: GeocoderAddressComponent[];
    adr_address?: string;
    aspects?: PlaceAspectRating[];
    formatted_address?: string;
    formatted_phone_number?: string;
    geometry?: PlaceGeometry;
    html_attributions?: string[];
    icon?: string;
    id?: string;
    international_phone_number?: string;
    name: string;
    opening_hours?: OpeningHours;
    permanently_closed?: boolean;
    photos?: PlacePhoto[];
    place_id?: string;
    price_level?: number;
    rating?: number;
    reviews?: PlaceReview[];
    types?: string[];
    url?: string;
    utc_offset?: number;
    vicinity?: string;
    website?: string;
  }
  

  export interface GeocoderAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

export interface PlaceAspectRating {
    rating: number;
    type: string;
}


export interface PlaceGeometry {
    location: LatLng;
    viewport: LatLngBounds;
}
export interface LatLngBounds {
    east: number;
    north: number;
    south: number;
    west: number;
}
export interface LatLng {
    /**
     * Latitude in degrees. Values will be clamped to the range [-90, 90]. This
     * means that if the value specified is less than -90, it will be set to
     * -90. And if the value is greater than 90, it will be set to 90.
     */
    lat: number;
    /**
     * Longitude in degrees. Values outside the range [-180, 180] will be
     * wrapped so that they fall within the range. For example, a value of -190
     * will be converted to 170. A value of 190 will be converted to -170. This
     * reflects the fact that longitudes wrap around the globe.
     */
    lng: number;
}
export interface OpeningHours {
    open_now: boolean;
    periods: OpeningPeriod[];
    weekday_text: string[];
}

export interface PlacePhoto {
    height: number;
    html_attributions: string[];
    width: number;
    getUrl(opts: PhotoOptions): string;
}
export interface PlaceReview {
    aspects: PlaceAspectRating[];
    author_name: string;
    author_url: string;
    language: string;
    text: string;
}

export interface OpeningPeriod {
    open: OpeningHoursTime;
    close?: OpeningHoursTime;
}
export interface PhotoOptions {
    maxHeight?: number;
    maxWidth?: number;
}

export interface OpeningHoursTime {
    day: number;
    hours: number;
    minutes: number;
    nextDate: number;
    time: string;
}


