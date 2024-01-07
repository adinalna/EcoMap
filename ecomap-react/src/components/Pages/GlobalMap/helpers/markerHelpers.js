import pinRed from "../../../../../src/assets/PinRed.svg";
import pinBlue from "../../../../../src/assets/PinBlue.svg";

export const getPinIcon = (pickedUp) => (pickedUp ? pinBlue : pinRed);
