export interface DirectionsResult {
    geocoded_waypoints: DirectionsGeocodedWaypoint[];
    routes: DirectionsRoute[];
}

/**
 * A single geocoded waypoint.
 */
export interface DirectionsGeocodedWaypoint {
    partial_match: boolean;
    place_id: string;
    types: string[];
}

/**
 * A single route containing a set of legs in a DirectionsResult.
 * Note that though this object is "JSON-like," it is not strictly JSON,
 * as it directly and indirectly includes LatLng objects.
 */
export interface DirectionsRoute {
    /** The bounds for this route. */
   // bounds: LatLngBounds;
    /** Copyrights text to be displayed for this route. */
    copyrights: string;
    /**
     * The total fare for the whole transit trip. Only applicable to transit
     * requests.
     */
   // fare: TransitFare;
    /**
     * An array of DirectionsLegs, each of which contains information about the
     * steps of which it is composed. There will be one leg for each stopover
     * waypoint or destination specified. So a route with no stopover waypoints
     * will contain one DirectionsLeg and a route with one stopover waypoint
     * will contain two.
     */
    legs: DirectionsLeg[];
    /**
     * An array of LatLngs representing the entire course of this route. The
     * path is simplified in order to make it suitable in contexts where a small
     * number of vertices is required (such as Static Maps API URLs).
     */
  //  overview_path: LatLng[];
    /**
     * An encoded polyline representation of the route in overview_path.
     * This polyline is an approximate (smoothed) path of the resulting
     * directions.
     */
    overview_polyline: string;
    /** Warnings to be displayed when showing these directions. */
    warnings: string[];
    /**
     * If optimizeWaypoints was set to true, this field will contain the
     * re-ordered permutation of the input waypoints. For example, if the input
     * was: Origin: Los Angeles Waypoints: Dallas, Bangor, Phoenix Destination:
     * New York and the optimized output was ordered as follows: Origin: Los
     * Angeles Waypoints: Phoenix, Dallas, Bangor Destination: New York then
     * this field will be an Array containing the values [2, 0, 1]. Note that
     * the numbering of waypoints is zero-based. If any of the input waypoints
     * has stopover set to false, this field will be empty, since route
     * optimization is not available for such queries.
     */
    waypoint_order: number[];
}

export interface DirectionsLeg {
    arrival_time: Time;
    departure_time: Time;
    distance: Distance;
    duration: Duration;
    duration_in_traffic: Duration;
    end_address: string;
   // end_location: LatLng;
    start_address: string;
    //start_location: LatLng;
    steps: DirectionsStep[];
   // via_waypoints: LatLng[];
}

export interface DirectionsStep {
    distance: Distance;
    duration: Duration;
   // end_location: LatLng;
    instructions: string;
  //  path: LatLng[];
   // start_location: LatLng;
    steps: DirectionsStep;
   // transit: TransitDetails;
   // travel_mode: TravelMode;
}

export interface Distance {
    text: string;
    value: number;
}

export interface Duration {
    text: string;
    value: number;
}

export interface Time {
    text: string;
    time_zone: string;
    value: Date;
}



