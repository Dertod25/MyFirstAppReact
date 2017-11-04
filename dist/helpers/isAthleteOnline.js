'use strict';

export default function isAthleteOnline(athlete, onlineList) {
  return onlineList[athlete.id] === undefined ? athlete.isOnline : onlineList[athlete.id];
}
