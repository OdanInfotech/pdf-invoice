# Simple PDF Invoice

🥳 Simple yet powerful node JS library that generates PDF invoice on the fly. 

## Example

Simply send a required data to generate the invoice.

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
        date: "25/12/2023",
        dueDate: "25/12/2023",
        status: "Paid!",
    },
    items: [
        {
            name: "Cloud VPS Server - Starter Plan",
            quantity: 1,
            price: 400,
        },
        {
            name: "Domain Registration - example.com",
            quantity: 1,
            price: 20,
        },
        {
            name: "Maintenance Charge - Yearly",
            quantity: 1,
            price: 300,
        },
    ],
    currency: "$",
    path: path.join(__dirname, '/invoice.pdf'),
};
```

Work in progress...

