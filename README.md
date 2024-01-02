# Simple PDF Invoice

🥳 Simple yet powerful node JS library that generates PDF invoice on the fly. 

## Installation: 

For npm users:

```bash
npm install ....
```

For yarn users:

```bash
yarn add ....
```

For pnpm users:

```bash
pnpm add ....
```

## Use:

Once installed, you can import either using `require` or `import`:

```js
const { PDFInvoice } = require('....');
```

or

```js
import { PDFInvoice } from '....';
```

## Payload: 

The payload is the data that you want to show on the invoice. It is an object with the following structure:

```js
const payload = {
    company: {
        name: "Festrol Corp.",
        address: "1711 W. El Segundo Blvd, Hawthorne, Canada - 90250",
        phone: "Tel: (+11) 245 543 903",
        email: "Mail: hello@festrol.io",
        website: "Web: https://www.festrolcorp.io"
    },
    customer: {
        name: "John Doe",
        address: "1234 Main Street, New York, NY 10001",
        phone: "Tel: (555) 555-5555",
        email: "Mail: joe@example.com",
    },
    invoice: {
        number: 1721,
        date: "25/12/2023", // Default is current date.
        dueDate: "25/12/2023", // Default is current date.
        status: "Paid!",
        currency: "€", // Default is "$"
    },
    items: [
        {
            name: "Cloud VPS Server - Starter Plan",
            quantity: 1,
            price: 400,
            tax: 0, // Specify tax in percentage. Default is 0.
        },
        {
            name: "Domain Registration - example.com",
            quantity: 1,
            price: 20,
            tax: 0, // Specify tax in percentage. Default is 0.
        },
        {
            name: "Maintenance Charge - Yearly",
            quantity: 1,
            price: 300,
            tax: 0, // Specify tax in percentage. Default is 0.
        },
    ],
    qr: {
        src: "https://www.festrolcorp.io",
        width: 100, // Default is 50.
    },
    note: {
        text: "Thank you for your business.",
        italic: false, // Default is true.
    }
};
```

Let's understand each of the fields in the payload:

- `Company:` This is the information about your company. `name` is the required field. All other fields are optional.

- `Customer:` This is the information about your customer. `name` is the required field. All other fields are optional.

- `Invoice:` This is the information about the invoice. `number` is required field. If `date` & `dueDate` are not provided, then current date will be used. If `status` is not provided, then label `Due` will be used.

- `Items:` This is the list of items that you want to show on the invoice. `name`, `quantity` & `price` are required fields.

For example: 

```js
const pdf = path.join(__dirname, '/invoices/invoice.pdf');
```


## Generate PDF:

Once you have the payload ready, you can generate the PDF using the following code:

```js
const { PDFInvoice } = require('....');

const handleInvoice = async(): Promise<void> => {
    
    const payload = {
        // Prepare payload.
    };

    /**
    * Create the invoice.
    */
    const invoice = new PDFInvoice(payload);
  
    await invoice.create()
    .then((res)=> { console.log("Invoice created here: " + res) })
    .catch((err)=> { console.log(err) });  
}
```

If PDF is created successfully, then the **path to the PDF file** will be returned.

## Note: 

This library is still in heavy development stage. This library is not production ready yet. Use it at your own risk.
