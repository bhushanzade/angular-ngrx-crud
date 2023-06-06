import { UserProfileActionTypes, UserProfileActions } from "./profile.actions";
import { IUserProfile, UserProfile } from "./profile.state";

export function UserProfileReducer(state: IUserProfile = new UserProfile(), action: UserProfileActions): IUserProfile {
  switch (action.type) {
    case UserProfileActionTypes.USER_PROFILE_FETCH:
      return {
        ...state
      };

    case UserProfileActionTypes.USER_PROFILE_COMPLETE:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}