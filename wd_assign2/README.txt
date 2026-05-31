COS10005 Assignment 2 - Rob's Table
Student: Rob (103699388)

Website Structure
/wd_assign2/
├── assets/                                 # Shared data folder.
│   ├── links.json                          # JSON data for the navigation menu.
│   └── restaurants.json                    # JSON data for all restaurant listings.
├── css/                                    # Stylesheet folder.
│   ├── bill.css                            # Specific styles for the bill estimator.
│   ├── desktop.css                         # Global desktop layout and design.
│   ├── mobile.css                          # Global mobile responsiveness.
│   ├── register.css                        # Specific styles for the registration form.
│   ├── reservation.css                     # Specific styles for the reservation form.
│   └── restaurants-list.css                # Specific styles for restaurant cards.
├── images/                                 # Graphic assets folder.
│   ├── ember-room.svg                      # Ember Room restaurant icon.
│   ├── green-fork.svg                      # Green Fork restaurant icon.
│   ├── harbour-lantern.svg                 # Harbour Lantern restaurant icon.
│   ├── html5-validator-badge-blue.png      # W3C validator badge.
│   ├── logo.svg                            # Rob's Table primary logo.
│   ├── miso-moon.svg                       # Miso Moon restaurant icon.
│   ├── olive-courtyard.svg                 # Olive Courtyard restaurant icon.
│   └── spice-trail.svg                     # Spice Trail restaurant icon.
├── js/                                     # JavaScript logic folder.
│   ├── bill.js                             # Logic for the bill estimator page.
│   ├── content.js                          # Logic to inject header, nav, and footer.
│   ├── register.js                         # Logic for registration form validation.
│   ├── reservation.js                      # Logic for reservation form and data.
│   ├── restaurants-list.js                 # Logic to display restaurant listings.
│   └── restaurants-recommend.js            # Logic for restaurant recommendation filters.
├── bill.html                               # Estimated bill calculator bonus page.
├── index.html                              # Home page introducing Rob's Table.
├── README.txt                              # This documentation file.
├── recommend.html                          # Filter restaurants by preference and budget.
├── register.html                           # Registration form with JavaScript validation.
├── reservation.html                        # Reservation form with logic and validation.
└── restaurants.html                        # Displays restaurant listings.

GitHub Repository
https://github.com/r3ndl3r/COS10005/tree/main/wd_assign2

Live Sites
https://r3ndl3r.github.io/COS10005/wd_assign2/
https://mercury.swin.edu.au/cos10005/s103699388/wd_assign2/

JavaScript Logic
- content.js injects the shared header, navigation, and footer into each page.
- restaurants-list.js loads restaurant data from assets/restaurants.json and displays restaurant cards.
- restaurants-recommend.js (modified restaurants-list.js) loads the same restaurant data and filters restaurants based on dietary preference, budget, and dining purpose.
- register.js validates the registration form before submission. It checks username, email, phone number, password strength, confirm password, gender, dietary preference and country.
- reservation.js loads restaurant data into the reservation dropdown, updates the deposit amount, shows voucher or card fields based on payment method, copies the email address into the billing email field when selected and validates the form before submission.
- bill.js calculates an estimated bill using the selected restaurant's average price, number of people, and deposit amount.

Known Issues or Limitations
- This is a read only website.
- Registration does not create a real account or store user data.
- Reservation payment details are fake and are only checked for format.
- Bill totals are estimates only and do not include drinks, service fees, discounts or real menu selections.
- A conscious decision was made not to combine all styles and functionality into a single .css or .js file. This was done to improve maintainability and make the code logic easier to understand and mark for the assignment.

References/Resources
- Google Fonts: Roboto.
- CSS gradient generated using cssgradient.io.
- Restaurant names, descriptions, logo SVG and restaurant SVG images are original and self generated.
- JSON object edited and formatted using using https://jsoneditoronline.org.
