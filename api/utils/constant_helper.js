module.exports = {
    mongodb_uri: "mongodb://itax-api:itax-api@ds143892.mlab.com:43892/itax-api",
    invalid_auth: "Invalid Email or Password.",
    invalid_email: "Invalid Email.",
    existing_email: "Email is already registered. Please use another email.",
    invalid_password: "Invalid Password.",
    confirmation_expired: "This confirmation has already expired.",
    invalid_code: "Invalid Code.",
    confirmation_success: "Account confirmed.",
    confirmation_required: "Please confirm your account at your email.",

    // Error Messages
    MANDATORY_FIELD(field) { return `${field} is a required field.` }
}