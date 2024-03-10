<div id="top"></div>

<br />
<div align="center"> 
  <a href="https://salla.dev"> 
    <img src="https://salla.dev/wp-content/uploads/2023/03/1-Light.png" alt="Logo"> 
  </a>
  <h1 align="center">Salla Apps Starter Kit</h1>
  <p align="center">
    An awesome starter template to create your Salla Apps today!
    <br />
    <a href="https://salla.dev/"><strong>Explore our blogs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/SallaApp/express-starter-kit/issues/new">Report Bug</a> · 
    <a href="https://github.com/SallaApp/express-starter-kit/discussions/new">Request Feature</a> . <a href="https://t.me/salladev">&lt;/Salla Developers&gt;</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
        <a href="#configure-authorization-modes-">Configure Authorization Modes</a>
        <ul>
            <li><a href="#easy-mode-">Easy Mode</a></li>
            <li><a href="#custom-mode-">Custom Mode</a></li>
        </ul>
    </li>
    <li>
        <a href="#authorization-service">Authorization Service</a>
        <ul>
            <li><a href="#refreshing-a-token">Refreshing a Token</a></li>
        </ul>
    </li>
    <li>
        <a href="#webhooks">Webhooks</a>
        <ul>
            <li><a href="#order-related-webhooksactions">Order Related Webhooks/Actions</a></li>
            <li><a href="#product-related-webhooksactions">Product Related Webhooks/Actions</a></li>
            <li><a href="#shipping-companies-related-webhooksactions">Shipping Companies Related Webhooks/Actions</a></li>
            <li><a href="#customer-related-webhooksactions">Customer Related Webhooks/Actions</a></li>
            <li><a href="#category-related-webhooksactions">Category Related Webhooks/Actions</a></li>
            <li><a href="#brand-related-webhooksactions">Brand Related Webhooks/Actions</a></li>
            <li><a href="#store-related-webhooksactions">Store Related Webhooks/Actions</a></li>
            <li><a href="#cart-related-webhooksactions">Cart Related Webhooks/Actions</a></li>
            <li><a href="#special-offer-webhooksactions">Special Offer Related Webhooks/Actions</a></li>
            <li><a href="#miscellaneous-related-webhooksactions">Miscellaneous Related Webhooks/Actions</a></li>
      </ul>
    </li>
    <li>
        <a href="#commands">Commands</a>
        <ul>
            <li><a href="#setup-command">Setup command</a></li>
            <li><a href="#create-new-webhookaction-command">Create new Webhook/Action command</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- Overview -->

## Overview

This is a starter App to create ExpressJS application equipped with the required auth processes and webhooks/actions that help you to create your Salla App which works with the [Salla APIs](https://docs.salla.dev/). Your App later can be published to the [Salla App Store](https://apps.salla.sa/) and be available for installation to any of Salla [Merchants Stores](https://s.salla.sa/).

What can you use this starter App for?

- Create a Salla App from scratch, e.g. chatbot app or shipping service app, or any amazing app from your idea.
- Modify/Customize any of your previous Apps in order to take the advantages given by this starter App.
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

The starter App comes with an easy _1-command step_ that does the complete setup for your starter App. To be ready, you will need some prerequisites which will be listed hereafter.

### Prerequisites

- Create a Partner account at [Salla Partner Portal](https://salla.partners/)
- Create your App in [Salla Partner Portal](https://salla.dev/blog/create-your-first-app-on-salla-developer-portal/)

  > From your App dashboard at [Salla Partner Portal](https://salla.partners/), you will be able to get your App's _Client ID, Client Secret Key and Webhook Secret Key_ which you will use later duraing the setup process.

- For EpxressJS compatibility : ` NodeJS >= 12.x.x, Node Package Manager and it support any Database [MySQL,MongoDB,PostgreSQL]`

That is all!

### Installation

The installation process is straightforward as you will see in the below steps.

1. In your MySql Database: **create a database** with any name for example `express`.
2. Install [Salla CLI](https://github.com/SallaApp/Salla-CLI) via [NPM](https://www.npmjs.com/): `npm install @salla.sa/cli -g` where you will be able to run the `salla` binary commands such as `salla app create` and `salla app create-webhook <event.name>`
<!-- 3. [Salla CLI](https://github.com/SallaApp/Salla-CLI): to run the `salla` binary commands such as `salla app create` and `salla app create-webhook <event.name>` -->

<!-- > The step will ask you to select the authorization mode for your App, which can be [Easy or Custom mode.](#auth-modes)
> In case you selected the _Custom_ mode for your App authorization, you will need to enter the **same callback Url you already entered in your App dashboard at the [Salla Partner Portal](https://salla.partners/)** -->

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

With [Salla CLI](https://github.com/SallaApp/Salla-CLI) installed, **run** the following command to create your Express starter app project: `salla app create` and follow on-screen instructions.

List of existing apps assocaited to your account will be displayed as well as an option to create your app on [Salla Partners Portal](https://salla.partners/). Afterwards, you will be presented with easy-to fill in information to create your app.

![Salla App Create Command](https://i.ibb.co/92tKgZz/Clean-Shot-2021-12-27-at-21-31-15.gif)

<p align="right">(<a href="#top">back to top</a>)</p>

**Important Note:**

> If you are using [Easy mode.](#auth-modes.easy) the access token will push to the action ([`app.store.authorize`](Actions/app/store.authorize.js)) via webhook
>
> If you are using [Custom mode.](#auth-modes.custom) the browser will redirect you again to the [`store.authorize.js file`](Actions/app/store.authorize.js).

#### Output URLs <span id='output-urls'>

| URL                | Description                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Local App Url      | The local link for your App\.                                                                                            |
| Remote App Url     | The online link to your App\. It will be always synced with the local Url                                                |
| Webhook Url        | The Url link that connects your App with any action that may happen at the Merchant store, e\.g\. \ncreate new product\. |
| OAuth Callback Url | The App entry page where the access token is generated; Note that this Url is available only for the `Custom` mode auth. |

<p align="right">(<a href="#top">back to top</a>)</p>

## Configure Authorization Modes <span id='auth-modes'>

While creating your App in the [Salla Partners Portal](https://salla.partners/), you will see that Salla provids two methods for the OAuth protocol, which are the `Easy Mode` and the `Custom Mode`.

> During the setup process, the default _OAuth protocol_ will be set to the `Easy Mode`, which can be configured from the file [`.env`](.env).
> All of the setup's values/keys are stored in the `.env` file as we can see in the below image.

![salla-express-starter-kit](./assets/project-env.png)

#### Easy Mode <span id='auth-modes.easy'>

This mode is the default mode for the authorization, which means that the `access token` is generated automatically at Salla's side back to you.
You may refer to the class [`StoreAuthorize`](Actions/app/store.authorize.js) which is defined inside [`Actions/app/store.authorize.js`](Actions/app/store.authorize.js) to get more details on how to receive and manage the `access token`

#### Custom Mode <span id='auth-modes.custom'>

A callback Url is the Url that is triggered when the App has been granted authorization. This should be a valid Url to which the merchant's browser is redirected. In this mode, you will need to set a custom callback url from the App dashboard at the [Salla Partner Portal](https://salla.partners/). This callback url will redirect the merchants who are interested in using your app into your App entry page where the access token is generated.

> The custom url will redirect the merchant to the [Store Dashboard](https://s.salla.sa/apps) in order to access the Store where he needs your App to be installed.

<br />
    
## Authorization Service
    
This project comes with a simple singleton authorization service to help you with managing the access and refresh tokens

```javascript
const express = require("express");
const passport = require("passport");
const SallaAPIFactory = require("@salla.sa/passport-strategy");
const app = express();

const port = 8081;

// we initialize our Salla API
const SallaAPI = new SallaAPIFactory({
  clientID: "CLIENT_ID", // The client ID assigned to you by Salla in Salla Partner Portal
  clientSecret: "CLIENT_SECRET", // The client password assigned to you by Salla in Salla Partner Portal
  callbackURL: "http://localhost:8081/oauth/callback", // the /oauth/callback in your service
});

// Use the Salla Strategy within Passport.
passport.use(SallaAPI.getPassportStrategy());

// save token and user data to your selected database
SallaAPI.onAuth((accessToken, refreshToken, expiresin, user) => {
  /*
accessToken
refreshToken
expires*in
user
\*/
});

//when your user login to your application you can retrieve the access token and use
//it to access the Salla APIs from SallaAPI.setAccessToken .

SallaAPI.setAccessToken(
  ACCESS_TOKEN_FROM_DATABASE,
  REFRESH_TOKEN_FROM_DATABASE,
  EXPIRES_IN_FROM_DATABASE,
  USER_PROFILE_FROM_DATABASE
);

// we set salla express middleware
app.use((req, res, next) => SallaAPI.setExpressVerify(req, res, next));

// GET /
// render the index page

app.get("/", function (req, res) {
  res.send({ user: req.user });
});

// GET /oauth/redirect
// Use passport.authenticate() as route middleware to authenticate the
// request. The first step in salla authentication will involve redirecting
// the user to accounts.salla.sa. After authorization, salla will redirect the user
// back to this application at /oauth/callback
app.get("/oauth/redirect", passport.authenticate("salla"));

// GET /oauth/callback
// Use passport.authenticate() as route middleware to authenticate the
// request. If authentication fails, the user will be redirected back to the
// login page. Otherwise, the primary route function function will be called,
// which, in this example, will redirect the user to the home page.
app.get(
  "/oauth/callback",
  passport.authenticate("salla", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.listen(port, function () {
  console.log("App is listening on port " + port);
});
```

### Refreshing a Token

Access tokens expire after one week. Once expired, you will have to refresh a user’s access token. you can easily request a new access token via the current refresh token for any user like this

```javascript
const SallaAPI = require("@salla.sa/passport-strategy");

SallaAPI.requestNewAccessToken(SallaAPI.getRefreshToken())
  .then(({ accessToken, newRefreshToken }) => {
    // save new access token and refresh token to your database
  })
  .catch((err) => res.send(err));
```

<br />
    
<!-- Webhooks -->
## Webhooks
[Webhooks](https://docs.salla.dev/docs/merchant/ZG9jOjI0NTE3NDg1-webhook) simplify the communication between your App and [Salla APIs](https://docs.salla.dev/). In this way, you will be notified whenever your app receives payload/data from the Salla APIs. These webhooks are triggered along with many actions such as an order or product being created, a customer logs in, a coupon is applied, and much more.

### Create new Webhook/Action command

Salla already defined a list of the webhooks/actions that are triggered automatically. The predefined webhooks/actions can be found in the folder [`app/Actions`](https://github.com/SallaApp/express-starter-kit/tree/master/Actions).

Run the following command to create your webhook event:

```bash
salla app create-webhook <event.name>
```

![Salla App Create-Webhook Command](https://i.ibb.co/yBstbgx/Clean-Shot-2021-12-27-at-16-16-47.gif)

<hr>

> You may find the supported [Webhook events](https://docs.salla.dev/doc-421119/?nav=1#list-of-salla-store-events) as follows:

#### Order Related Webhooks/Actions

| **Action Name**                                                             | **Description**                                                            |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [order.created](Actions/order/created.js)                                     | This indicates a singular order has been created                             |
| [order.updated](Actions/order/updated.js)                                     | Details, data and/or content of a specific order have been refreshed updated |
| [order.status.updated](Actions/order/status.updated.js)                       | Whenever there is an order status update, this is triggered                  |
| [order.cancelled](Actions/order/cancelled.js)                                 | This happens when an order is cancelled                                      |
| [order.refunded](Actions/order/refunded.js)                                   | The refund action to refund the whole order is triggered.                    |
| [order.deleted](Actions/order/deleted.js)                                     | This indicates an order has been deleted                                     |
| [order.products.updated](Actions/order/products.updated.js)                   | Order products is updated                                                    |
| [order.payment.updated](Actions/order/payment.updated.js)                     | A payment method has been updated                                            |
| [order.coupon.updated](Actions/order/coupon.updated.js)                       | This is triggered whenever a Coupon is updated                               |
| [order.total.price.updated](Actions/order/total.price.updated.js)             | A total price of an order has been updated                                   |
| [order.shipment.creating](Actions/order/shipment.creating.js)                 | This indicates a new shipment is being created                               |
| [order.shipment.created](Actions/order/shipment.created.js)                   | This indicates a new shipment has been created                               |
| [order.shipment.cancelled](Actions/order/shipment.cancelled.js)               | This indicates a an order shipment has been cancelled                        |
| [order.shipment.return.creating](Actions/order/shipment.return.creating.js)   | This is triggered when a returned order shipment is being created            |
| [order.shipment.return.created](Actions/order/shipment.return.created.js)     | This is triggered when a returned order shipment has been created            |
| [order.shipment.return.cancelled](Actions/order/shipment.return.cancelled.js) | This is triggered when a returned order shipment has been cancelled          |
| [order.shipping.address.updated](Actions/order/shipping.address.updated.js)   | Occurs when an Order shipping address is updated                             |

<p align="right">(<a href="#top">back to top</a>)</p>

#### Product Related Webhooks/Actions

| **Action Name**                                       | **Description**                                                                    |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [product.created](Actions/product/created.js)           | A new product is created. Payload of the new product are to accompanying the product |
| [product.updated](Actions/product/updated.js)           | Add/Modify details of a product                                                      |
| [product.deleted](Actions/product/deleted.js)           | Delete a product along with all its variants and images                              |
| [product.available](Actions/product/available.js)       | Flags a product as stock available                                                   |
| [product.quantity.low](Actions/product/quantity.low.js) | Shows warnings whenever a stock is of low quantity                                   |

<p align="right">(<a href="#top">back to top</a>)</p>

#### Shipping Companies Related Webhooks/Actions

| **Action Name**                                               | **Description**                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [shipping.zone.created](Actions/shipping/zone.created.js)       | This is triggered when a shipping zone has been created for a custom shipping company |
| [shipping.zone.updated](Actions/shipping/zone.updated.js)       | This is triggered when a shipping zone has been updated for a custom shipping company |
| [shipping.company.created](Actions/shipping/company.created.js) | This is triggered when a custom shipping company has been created                     |
| [shipping.company.updated](Actions/shipping/company.updated.js) | This is triggered when a custom shipping company has been updated                     |
| [shipping.company.deleted](Actions/shipping/company.deleted.js) | This is triggered when a custom shipping company has been deleted                     |

<p align="right">(<a href="#top">back to top</a>)</p>

#### Customer Related Webhooks/Actions

| **Action Name**                                       | **Description**                        |
| ------------------------------------------------------- | ---------------------------------------- |
| [customer.created](Actions/customer/created.js)         | Create a new customer record             |
| [customer.updated](Actions/customer/updated.js)         | Update details for a customer            |
| [customer.login](Actions/customer/login.js)             | Triggered whenever a customer log in     |
| [customer.otp.request](Actions/customer/otp.created.js) | One-Time Password request for a customer |

<p align="right">(<a href="#top">back to top</a>)</p>

#### Category Related Webhooks/Actions

| **Action Name**                               | **Description**                                   |
| ----------------------------------------------- | --------------------------------------------------- |
| [category.created](Actions/category/created.js) | Creates a new category for products to be put under |
| [category.updated](Actions/category/updated.js) | Add new or reform existing category details         |

<p align="right">(<a href="#top">back to top</a>)</p>

#### Brand Related Webhooks/Actions

| **Action Name**                         | **Description**                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| [brand.created](Actions/brand/created.js) | Creates a new Brand.                                                                 |
| [brand.updated](Actions/brand/updated.js) | Triggered when Information about a sepcific Brand is updated/refurbished/streamlined |
| [brand.deleted](Actions/brand/deleted.js) | An existing brand is then deleted and removed from a store                           |

<p align="right">(<a href="#top">back to top</a>)</p>

#### Store Related Webhooks/Actions

| **Action Name**                                             | **Description**                  |
| ------------------------------------------------------------- | ---------------------------------- |
| [store.branch.created](Actions/store/branch.created.js)       | Creates a new store.               |
| [store.branch.updated](Actions/store/branch.updated.js)       | Updates an existing branch         |
| [store.branch.setDefault](Actions/store/branch.setDefault.js) | Sets for default a specific branch |
| [store.branch.activated](Actions/store/branch.activated.js)   | Activates a disabled branch        |
| [store.branch.deleted](Actions/store/branch.deleted.js)       | Deletes a branch                   |
| [storetax.created](Actions/store/tax.created.js)              | Creats a new Store Tax             |

<p align="right">(<a href="#top">back to top</a>)</p>

#### Cart Related Webhooks/Actions

| **Action Name**                                        | **Description**                               |
| -------------------------------------------------------- | ----------------------------------------------- |
| [abandoned.cart](Actions/abandoned/cart.js)              | Outputs a list of abandoned carts               |
| [coupon.applied](Actions/Miscellaneous/CouponApplied.js) | Creates a discount code in the form of a coupon |

<p align="right">(<a href="#top">back to top</a>)</p>

#### Special Offer Related Webhooks/Actions

| ** Action Name **                                       | ** Description **           |
| ------------------------------------------------------- | --------------------------- |
| [specialoffer.created](Actions/specialoffer/created.js) | Creates a new special offer |
| [specialoffer.updated](Actions/specialoffer/updated.js) | Updates a special offer     |

<p align="right">(<a href="#top">back to top</a>)</p>

#### Miscellaneous Related Webhooks/Actions

| **Action Name**                       | **Description**               |
| --------------------------------------- | ------------------------------- |
| [review.added](Actions/review/added.js) | A product review has been added |

<p align="right">(<a href="#top">back to top</a>)</p>

## Support

The team is always here to help you. Happen to face an issue? Want to report a bug? You can submit one here on Github using the [Issue Tracker](https://github.com/SallaApp/Salla-CLI/issues/new). If you still have any questions, please contact us by joining the Global Developer Community on [Telegram](https://t.me/salladev) or via [Support Email](mailto:support@salla.dev).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.
Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request.
You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Security

If you discover any security-related issues, please email security@salla.sa instead of using the issue tracker.

## Credits

- [Salla](https://github.com/sallaApp)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
