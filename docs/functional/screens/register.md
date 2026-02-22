# Screen Spec: Register
Route: `/{locale}/register`

Fields:
- Email
- Password
- AddressLine1, Suburb, Postcode
- PreferredLocale (dropdown: en-AU, hi-IN, zh-Hans, fr-FR)

Submit:
- POST /api/auth/register (PascalCase JSON).
