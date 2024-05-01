

const initialState = {
    PropertyType: '', 
    RoomType: '', 
    // Address: {},
    Street: '',
    flat: '',
    city:'',
    state:'',
    pincode:'',
    country:'',
    guests: '',
    beds: '',
    bathrooms: '',
    bedrooms: '',
    Amenities: [],
    ShortTitle: '',
    Description: '',
    Price: '',
    img_url1: '',
    img_url2: '',
    img_url3: '',
    img_url4: '',
    img_url5: '',
    hostEmail: '',
  };
  
  const ListingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_PROPERTY_TYPE': // Action type for updating PropertyType
      console.log('Updating PropertyType:', action.payload);
        return {
          ...state,
          PropertyType: action.payload,
        };
      case 'UPDATE_ROOM_TYPE': // Action type for updating RoomType
      console.log('Updating RoomType:', action.payload);
        return {
          ...state,
          RoomType: action.payload,
        };
        case 'UPDATE_STREET':
            console.log('Updating STREET:', action.payload);
            return {
                ...state,
                Street: action.payload,
            };
            case 'UPDATE_FLAT':
              console.log('Updating flat:', action.payload);
              return {
                  ...state,
                  flat: action.payload,
              };
              case 'UPDATE_CITY':
                console.log('Updating CITY:', action.payload);
                return {
                    ...state,
                    city: action.payload,
                };
                case 'UPDATE_PINCODE':
                  console.log('Updating PINCODE:', action.payload);
                  return {
                      ...state,
                      pincode: action.payload,
                  };
                  case 'UPDATE_COUNTRY':
                    console.log('Updating Country:', action.payload);
                    return {
                        ...state,
                        country: action.payload,
                    };
                    case 'UPDATE_STATE':
                      console.log('Updating State:', action.payload);
                      return {
                          ...state,
                          state: action.payload,
                      };
            case 'UPDATE_GUESTS':
                console.log('Updating Guests:', action.payload);
                return {
                  ...state,
                  guests: action.payload,
                };
              case 'UPDATE_BEDS':
                console.log('Updating Beds:', action.payload);
                return {
                  ...state,
                  beds: action.payload,
                };
              case 'UPDATE_BATHROOMS':
                console.log('Updating Bathrooms:', action.payload);
                return {
                  ...state,
                  bathrooms: action.payload,
                };
              case 'UPDATE_BEDROOMS':
                console.log('Updating Bedrooms:', action.payload);
                return {
                  ...state,
                  bedrooms: action.payload,
                };
                case 'UPDATE_AMENITIES':
                    console.log('Updating Amenities:', action.payload);
                    return {
                      ...state,
                      Amenities: action.payload,
                    };
                case 'UPDATE_SHORT_TITLE':
                    console.log('Updating ShortTitle:', action.payload);
                    return {
                        ...state,
                        ShortTitle: action.payload,
                    };
                case 'UPDATE_DESCRIPTION':
                    console.log('Updating Description:', action.payload);
                    return {
                        ...state,
                        Description: action.payload,
                    };
                    case 'UPDATE_PRICE':
                        console.log('Updating Price:', action.payload);
                        return {
                            ...state,
                            Price: action.payload,
                        };
                        case 'UPDATE_IMAGE_URL':
                            console.log(`Updating Image URL ${action.payload.index}:`, action.payload.url);
                            return {
                              ...state,
                              [`img_url${action.payload.index}`]: action.payload.url,
                            };
                            case 'UPDATE_HOST_EMAIL':
                                console.log('Updating HostEmail:', action.payload);
                            return {
                                ...state,
                                hostEmail: action.payload,
                            };

                      

      default:
        return state;
    }
  };
  
  export default ListingReducer;
  