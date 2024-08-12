# How To Work Tify Dynamic Form

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

## How it works

With the **useFetch** hook located in the **Hooks** folder, a request is sent to the data source using the `GET` method of the `fetch` function. This request is made according to the types located in the **FetchType** and **AppType** files in the `Types` folder. These types are suitable for the return (JSON) structure. In this way, type control is also performed.

```ts
import { FetchAction, MethodName, TFetch, TResponse } from '@/types/FetchType';

const useFetch = <R extends object>(
   url: string,
   method: MethodName = MethodName.GET,
   params: object | boolean = false,
   auth = false,
   loadOnStart = true,
) => {
   ...
}
```

The `useFetch` function starts working from the `Form.tsx` component in the `Pages` folder.

```ts
import useFetch from '@/hooks/useFetch';
import { TForm } from '@/types/FormType';

const [loading, error, form] = useFetch<TForm>('src/api/form.json');
````

The data obtained is written to the store with the **fetchReducer** function located in the **fetchReducer** file in the **reducer** folder. This process consists of three steps:

```ts
export const enum FetchAction {
   START = 'START',
   SUCCESS = 'SUCCESS',
   ERROR = 'ERROR',
}
```

```ts
export type TFetch<R extends object> = {
   error?: boolean | string;
   loading?: boolean;
   data?: R | unknown;
};
```

**START** In this stage, the `loading` value in the store, which is initially false, is set to true, and the result of the request is awaited.

**SUCCESS** If the data is successfully received as a result of the request, the `loading` value in the store is set to false, and the `data` value is also filled with the received data.

**ERROR** If an error occurs as a result of the request, the `loading` value is set to false and the error message received is transferred to the `error` value, which has an initial value of `false` in the store.

```ts
import { FetchAction, MethodName, TFetch, TResponse } from '@/types/FetchType';

const useFetch = <R extends object>(
   url: string,
   method: MethodName = MethodName.GET,
   params: object | boolean = false,
   auth = false,
   loadOnStart = true,
) => {
   const initFetchState = {
      loading: false,
      error: false,
      data: undefined,
   } satisfies TFetch<R>
   
   const [state, dispatch] = useReducer(fetchReducer, initFetchState);

   useEffect(() => {
      if (loadOnStart) {
         startFetch();
      }   
   }, []);
   ...
   ...
   return [state.loading, state.error, state.data as R, request];
}
```

After the request process is completed successfully, the `loading` and `error` checks are performed in the `Form.tsx` file, and the data is written to the required locations.

Each form element is derived from the `FormInput.tsx` component in the Components folder.

```tsx
const FormInput = (props: TFormElement) => {
   ...
}
```

In order to make changes quickly and efficiently on the form elements, a state is written using the `context` structure with the `useRef` hook provided by React, when the components are created with the incoming data.

```ts
import { isObject } from '@/utils/functions';

const Form = () => {

   const [loading, error, form] = useFetch<TForm>('src/api/form.json');

   const { create } = useContext(FormContext);
   isObject<TForm>(form) && create(form);
   ...
}
```

```ts
const initFormState: TForm = {
   formName: '',
   fields: [],
};

export const useFormContext = (initFormState: TForm) => {
   const formStore = useRef(initFormState);

   const create = useCallback((data: TForm) => {
      formStore.current = data;
   }, []);
   ...
   ...
}

export type UseFormContextReturnType = ReturnType<typeof useFormContext>;

const initFormContextState: UseFormContextReturnType = {
   create: (data: TForm) => {},
   get: () => initFormState,
   set: (value: setData) => {},
   subscribe: (callback: () => void) => () => false,
};

export const FormContext = createContext<UseFormContextReturnType>(initFormContextState);

const FormContextProvider = ({ children }: ChildrenType) => {
   return <FormContext.Provider value={useFormContext(initFormState)}>{children}</FormContext.Provider>;
};

```

Now it's time to make changes using the `useSyncExternalStore` hook, introduced with React 18.

This hook, which supports simultaneous access, takes a snapshot of the data (instant image). This only allows the form element being changed to be rendered. In addition, changes from different components are performed with the same performance and only those two form elements are rendered.

```ts
import { FormContext } from '@/context/FormContext';
import { setData, TForm } from '@/types/FormType';
import { useContext, useSyncExternalStore } from 'react';

const useForm = <T>(selector: (formStore: TForm) => T): [T, (value: setData) => void] => {
   const formStore = useContext(FormContext);

   if (!formStore) {
      const message = 'Store not found';
      throw new Error(message);
   }

   const state = useSyncExternalStore(formStore.subscribe, () => selector(formStore.get()));

   return [state, formStore.set];
};
```

When using the `useForm` hook, we use the data from useForm instead of the values of the incoming data.

```ts
const FormInput = (props: TFormElement) => {
   const { label, name, errorMessage, required, value, type, options, ...inputProps } = props;

   const [fieldValue, setForm] = useForm((store: TForm) => {
      const field = store.fields.find((field) => {
         return field.name === name;   
   });
   if (field !== undefined) return field.value;
});

```

So far, we have created all the form elements, placed their data appropriately, and been able to make simultaneous changes on them.

Now we can preview our form

Let's do this with the help of a `modal`.

First, let's create our modal. Here, a multiple but singular modal structure has been used.

Our modal will have three functions.

- Append
- Destroy
- Destroy All

First, let's create our types.

```ts
export const enum ModalAction {
   APPEND = 'APPEND',
   DESTROY = 'DESTROY',
   DESTROYALL = 'DESTROYALL',
}

export type TModal = {
   name: string;
   data?: object;
};

export type TModalState = { modals: TModal[] };
```

It's time to create the reducer.

```ts
import { ModalAction, TModalReducerAction, TModal, TModalState } from '@/types/ModalType';
import Logger, { LoggerType } from '@/utils/Logger';

const modalReducer = (state: TModalState, action: TModalReducerAction): TModalState => {
   switch (action.type) {
      case ModalAction.APPEND:
         ...
         return(...)
      }
      case ModalAction.DESTROY:
         ...
         return(...)
      case ModalAction.DESTROYALL:
         ...
         return(...)
      default: {
         const message = 'No action payload in reducer!!!';
         Logger.log(message, LoggerType.ERROR);
         return { ... };
      }
   }
};

export default modalReducer;
```

Let's create our context to access this modal from all pages.

```ts
import modalReducer from '@/reducer/modalReducer';
import { createContext, useCallback, useReducer } from 'react';
...

const initModalState: TModalState = { modals: [] };

export const useModalContext = (initModalState: TModalState) => {
   const [state, dispatch] = useReducer(modalReducer, initModalState);

   const getModal = (name: TModal['name']) => {
      ...
   };

   const append = useCallback((modal: TModal) => {
      ...
   }, []);

   const destroy = useCallback((name: TModal['name']) => {

   }, []);

   const destroyAll = useCallback(() => {
      
   }, []);

   return { getModal, state, append, destroy, destroyAll };
};

type UseModalContextReturnType = ReturnType<typeof useModalContext>;

const initModalContextState: UseModalContextReturnType = {
   getModal: (name: TModal['name']) => {
      return '';
   },
   state: initModalState,
   append: (modal: TModal) => {},
   destroy: (name: TModal['name']) => {},
   destroyAll: () => {},
};

export const ModalContext = createContext<UseModalContextReturnType>(initModalContextState);

const ModalContextProvider = ({ children }: ChildrenType) => {
   return <ModalContext.Provider value={useModalContext(initModalState)}>{children}</ModalContext.Provider>;
};

export default ModalContextProvider;
```

"Finally, let's implement our `useModal` hook.

```ts
import { useContext } from 'react';

const useModal = () => {
   const { getModal, state, append, destroy, destroyAll } = useContext(ModalContext);

   return { getModal, state, append, destroy, destroyAll };
};

export default useModal;
```

## License

This project is licensed under the MIT License.
