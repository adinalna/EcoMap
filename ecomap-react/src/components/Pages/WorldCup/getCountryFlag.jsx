import getCountryCodes from "./getCountryCodes.jsx";
import flags from 'country-flag-icons/react/3x2';

export default function getCountryFlag(countryName) {
    const countryCode = getCountryCodes(countryName);
    const FlagComponent = flags[countryCode];

    if (!FlagComponent) {
        return <span>Flag not found</span>;
    }

    return <FlagComponent />;
}