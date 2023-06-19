

export interface Restaurant 
{
    address_components: AddressComponent[];
    adr_address: string;
    business_status: string;
    current_opening_hours: OpeningHours;
    formatted_address: string;
    formatted_phone_number: string;
    geometry: Geometry;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    international_phone_number: string;
    name: string;
    opening_hours: OpeningHours;
    photos: string[];
    place_id: string;
    plus_code: PlusCode;
    price_level: number;
    rating: number;
    reference: string;
    reviews: Review[];
    types: string[];
    url: string;
    user_ratings_total: number;
    utc_offset: number;
    utc_offset_minutes: number;
    vicinity: string;
    website: string;
  }
  
  interface AddressComponent 
  {
    long_name: string;
    short_name: string;
    types: string[];
  }
  
  interface OpeningHours 
  {
    open_now: boolean;
    periods: OpeningHoursPeriod[];
    weekday_text: string[];
  }
  
  interface OpeningHoursPeriod 
  {
    close: OpeningHoursTime;
    open: OpeningHoursTime;
  }
  
  interface OpeningHoursTime 
  {
    date: string;
    day: number;
    time: string;
  }
  
  interface Geometry 
  {
    location: Location;
    viewport: Viewport;
  }
  
  interface Location 
  {
    lat: number;
    lng: number;
  }
  
  interface Viewport 
  {
    south: number;
    west: number;
    north: number;
    east: number;
  }
  
  interface Photo 
  {
    height: number;
    html_attributions: string[];
    width: number;
  }
  
  interface PlusCode 
  {
    compound_code: string;
    global_code: string;
  }
  
  interface Review 
  {
    author_name: string;
    author_url: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }


/*
export interface Restaurant {
      address_components: 
      {
        long_name: string;
        short_name: string;
        types: string[];
      }[];

      adr_address: string;

      business_status: string;

      current_opening_hours: 
      {
        open_now: boolean;
        periods: 
        {
          close: 
          {
            date: string;
            day: number;
            time: string;
          };
          open: 
          {
            date: string;
            day: number;
            time: string;
          };
        }[];
        weekday_text: string[];
      };

      formatted_address: string;

      formatted_phone_number: string;

      geometry: 
      {
        location: 
        {
          lat: number;
          lng: number;
        };
        viewport: 
        {
          northeast: 
          {
            lat: number;
            lng: number;
          };
          southwest: 
          {
            lat: number;
            lng: number;
          };
        };
      };

      icon: string;

      icon_background_color: string;

      icon_mask_base_uri: string;

      international_phone_number: string;

      name: string;
      opening_hours: 
      {
        open_now: boolean;
        periods: 
        {
          close: 
          {
            day: number;
            time: string;
          };
          open: 
          {
            day: number;
            time: string;
          };
        }[];
        weekday_text: string[];
      };

      photos: 
      {
        height: number;
        html_attributions: string[];
        photo_reference: string;
        width: number;
      }[];
  }
  
*/