const generateWhatsAppMessage =
(user, cart, total) => {

let message =
`Hello,

I would like to place an order.

Customer Name:
${user.fullName}

Email:
${user.email}

Mobile:
${user.mobileNumber}

Alternative Mobile:
${user.alternateMobileNumber}

Address:
${user.address},
${user.city},
${user.state},
${user.pincode},
${user.country}

Products:

`;

cart.forEach((item, index) => {

const price =
item.product.discountPrice ||
item.product.price;

message +=
`${index + 1}. ${item.product.name}

Size:
${item.size || "-"}

Color:
${item.color || "-"}

Quantity:
${item.quantity}

Price:
₹${price}

--------------------------------

`;

});

message +=
`Total Amount:
₹${total}

Thank You.`;

return message;

};

module.exports =
generateWhatsAppMessage;