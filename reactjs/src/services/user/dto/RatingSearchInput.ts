export interface RatingSearchInput {
    placeId: string | null;
    UserId: number;
    DrinkOptionId: string | null;
    BeanTypeId: string| null;
    PlaceRating: number;

    Id : number;
    IsDrinkRatioChanged : boolean;
    IsBlendComponentsChanged: boolean;
    IsDifferentServingTemp: boolean;
    IsDifferentBarista: boolean;
    OtherReason: boolean;

  }