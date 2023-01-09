# How To Work Tify Dynamik Form

---

## Installation

First, clone the repossitory

```sh
git clone https://github.com/keskinkaan/tify-dynamic-form.git
```

After installing the dependencies the following `yarn` scripts become available:

- `dev`: starts the application in development mode on [http://localhost:3001](http://localhost:3001)
- `build`: bundles the application for production into the build folder
- `lint`: lint files with [Eslint](https://eslint.org/) based on [eslint-config-react-app](https://github.com/facebook/create-react-app/blob/main/packages/eslint-config-react-app/README.md) React style guide
- `format`: formats the code with [Prettier](https://prettier.io/) and [Eslint](https://eslint.org/) within the `src` folder

---

## Usege

The following form elements come dynamically from a data source.

It can be used from a data source such as Mongo, PostgreSQL, MSSQL, MySQL, Redis, or it can come from a fixed JSON file.

- Text
- Number
- Date
- Select
- Radio
- Checkbox
- File

The Schema of the form components should conform to the following JSON structure.

```json
{
   "success": 1,
   "results": {
      "formName": "Form Name",
      "fields": [
         {
            "type": "text",
            "name": "name",
            "label": "Name",
            "placeholder": "Name",
            "value": "",
            "required": true,
            "errorMessage": "Name should be 3-16 characters and shouldn't include any special character!",
            "pattern": "^[A-Za-z]{3,16}$"
         },
         {
            "type": "text",
            "name": "surname",
            "label": "Surname",
            "placeholder": "Surname",
            "value": "",
            "required": true,
            "errorMessage": "Surname should be 3-16 characters and shouldn't include any special character!",
            "pattern": "^[A-Za-z]{3,16}$"
         },
         {
            "type": "date",
            "name": "dateOfBirth",
            "label": "Date of birth",
            "placeholder": "01.01.2022",
            "value": "1977-10-17",
            "required": true,
            "errorMessage": "Date of birth should be a valid date!",
            "pattern": "^(?:(?:31(/)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(/)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(/)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(/)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"
         },
         {
            "type": "number",
            "name": "age",
            "label": "Age",
            "placeholder": "18",
            "value": "",
            "required": true,
            "errorMessage": "You must be over 18 years old!",
            "pattern": "^(?:1[7-9]|[2-9][0-9]){2,}$",
            "min": "18", 
            "max": "99"
         },
         {
            "type": "select",
            "name": "city",
            "label": "City",
            "value": "",
            "required": true,
            "errorMessage": "Plase select a city!",
            "options": ["Adana", "Ankara", "İstanbul"]
         },
         {
            "type": "radio",
            "name": "martialStatus",
            "label": "Marital Status",
            "value": "",
            "required": true,
            "errorMessage": "Plase select your martial status!",
            "options": ["Single", "Married"]
         },
         {
            "type": "checkbox",
            "name": "hobbies",
            "label": "Hobbies",
            "required": false,
            "value": ["Movie", "Music"],
            "options": ["Music", "Movie", "Cooking"]
         },
         {
            "type": "file",
            "name": "profilePicture",
            "label": "Profile Picture",
            "value": "",
            "required": true,
            "errorMessage": "Profile picture shold be *jpg, *png!"
         }
      ]
   }
}
```

Required fields to be sent in the scheme;

- type
- name
- label
- value
- requaried (true or false) - If required is true, it must be sent in the **errorMessage** field.
