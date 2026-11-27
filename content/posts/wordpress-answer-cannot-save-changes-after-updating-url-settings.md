---
title: "Wordpress Answer: Cannot Save Changes After Updating URL Settings"
slug: "wordpress-answer-cannot-save-changes-after-updating-url-settings"
date: "2019-03-21"
excerpt: "## Original question: [Cannot Save Changes After Updating URL Settings](http://Wordpress.StackExchange.com/q/332250) * * * ## My answer: This indicates that the SSL certificate was not installed correctly, or that the server is not configur"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Cannot Save Changes After Updating URL Settings](http://Wordpress.StackExchange.com/q/332250)

* * *

## My answer:

This indicates that the SSL certificate was not installed correctly, or that the server is not configured to accept SSL connections.

It is not an error with the certificate per se, but rather with the server setup / installation of that certificate. The web browser is failing to even connect to the server over HTTPS, much less read and verify the certificate.

I would suggest you reinstall the SSL certificate, paying close attention to how it is configured. Also read up on your hosts documentation if there is anything you need to do to enable SSL connections for the server. There may be a setting you can do yourself, or it may be something they need to do on their end.

In the meantime, to get access to your wp-admin again, if you have access to your database, go into your WordPress table called wp\_options. Change site\_url and home\_url back to http. They will likely be the first two rows in that table.
