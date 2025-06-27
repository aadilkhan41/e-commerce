# 🛒 E-Commerce REST API Documentation

Welcome to the official documentation for the E-Commerce REST API, a robust and scalable backend built with Node.js, Express.js, and MongoDB. This API powers essential features of an online store, including user authentication, product management, shopping cart, wishlist, coupon handling, order placement, and product reviews. Whether you're integrating with a frontend or testing endpoints directly via Postman, this guide provides everything you need to get started and explore the complete API.

---

## 📦 Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Security:** bcrypt (for password hashing)
- **Tools:** Postman (for testing), dotenv, nodemon

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js installed
- MongoDB (local or Atlas)
- Postman (optional for testing)

## Base URL
The base URL for all API requests is: http://localhost:8080

## Users/Register
### Endpoints
- POST /api/v1/user/register

### Requests
{
    "firstName": "Aadil",
    "lastName": "Khan",
    "email": "aadil@example.com",
    "mobNo": "9876543210",
    "password": "NewPass456",
    "address": {
        "addressLine1": "123 Main Street",
        "addressLine2": "Apt 456",
        "landmark": "Near Park",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001"
    }
}

### Responses
{
    "succes": true,
    "message": "Register Successfully!"
}

---

## Users/Login
### Endpoints
- POST /api/v1/user/login

### Requests
{
    "email": "aadil@example.com",
    "password": "NewPass456"
}

### Responses
{
    "success": true,
    "message": "Logged in successfully.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWJhZjY1OWNkYjhkYTA3Y2NkYjBhMyIsImVtYWlsIjoiYWFkaWxAZXhhbXBsZS5jb20iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3NTA4NDA1ODUsImV4cCI6MTc1MDg0NDE4NX0.nq3R-zQWO8_GTbXx3r6Js56OPWOsLMXdfl5vr1jXxJk"
}

---

## Users/Logout
### Endpoints
- POST /api/v1/user/logout

### Requests
{
    "email": "aadil@example.com"
}

### Responses
{
    "success": true,
    "message": "Logged out successfully.",
}

---

## Users/ForgotPassword
### Endpoints
- POST /api/v1/user/forgot-password

### Requests
{
    "email": "aadil@example.com"
}

### Responses
{
    "success": true,
    "message": "OTP sent to your registered email."
}

---

## Users/ResetPassword
### Endpoints
- POST /api/v1/user/reset-password

### Requests
{
    "email": "aadil@example.com",
    "otp": 6793,
    "newPassword": "Aadilkhan3007"
}

### Responses
{
    "success": true,
    "message": "Password reset successfully."
}

---

## Users/ChangePassword
### Endpoints
- POST /api/v1/user/change-password

### Requests
{
    "email": "aadil@example.com",
    "oldPassword": "Aadilkhan3007",
    "newPassword": "NewPass456"
}

### Responses
{
    "success": true,
    "message": "Password changed successfully.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWJhZjY1OWNkYjhkYTA3Y2NkYjBhMyIsImVtYWlsIjoiYWFkaWxAZXhhbXBsZS5jb20iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3NTA4NDMwMDAsImV4cCI6MTc1MDg0NjYwMH0.pHI3clhzeZjveJ0pvs6SrYoo-icL37gm30zlQ229oKw"
}

---
---

## Product/Create
### Endpoints
- POST /api/v1/product/create

### Requests
{
    "title": "Wireless Mouse",
    "description": "A high precision wireless mouse with ergonomic design.",
    "price": 799,
    "discountPercentage": 10,
    "rating": 4.5,
    "stock": 150,
    "brand": "Logitech",
    "category": "Electronics",
    "thumbnail": "https://example.com/images/wireless-mouse-thumb.jpg",
    "images": [
        "https://images.meesho.com/images/products/441901814/pgxak_512.webp",
        "https://images.meesho.com/images/products/441901814/f5xfb_512.webp"
    ]
}

### Responses
{
    "success": true,
    "message": "Product created successfully",
    "productId": "685be7764d1e6052724ce587"
}

---

## Product/List
### Endpoints
- GET /api/v1/product/list

### Requests
?searchKey=wireless&pageNo=1

### Responses
{
    "success": true,
    "message": "Products List API",
    "totalItems": 1,
    "currentPage": 1,
    "pageSize": 5,
    "totalPages": 1,
    "results": [
        {
            "_id": "685be7764d1e6052724ce587",
            "title": "Wireless Mouse",
            "description": "A high precision wireless mouse with ergonomic design.",
            "price": 799,
            "discountPercentage": 10,
            "rating": 4.5,
            "stock": 150,
            "brand": "Logitech",
            "category": "Electronics",
            "thumbnail": "https://example.com/images/wireless-mouse-thumb.jpg",
            "images": [
                "https://images.meesho.com/images/products/441901814/pgxak_512.webp",
                "https://images.meesho.com/images/products/441901814/f5xfb_512.webp"
            ],
            "createdAt": "2025-06-25T12:11:34.357Z",
            "updatedAt": "2025-06-25T12:11:34.357Z",
            "__v": 0
        }
    ]
}

---

## Product/Delete
### Endpoints
- POST /api/v1/product/delete

### Requests
{
    "id": "685be7764d1e6052724ce587"
}

### Responses
{
    "success": true,
    "message": "Product deleted successfully",
    "deletedId": "685be7764d1e6052724ce587",
}

---

## Product/Update
### Endpoints
- POST /api/v1/product/update/:id

### Requests
{
    "title": "Updated Bluetooth Headphones",
    "description": "Noise-cancelling wireless headphones with long battery life.",
    "price": 2499,
    "stock": 30,
    "brand": "Sony",
    "category": "Audio",
    "thumbnail": "https://example.com/headphones-thumb.jpg",
    "images": [
        "https://example.com/headphones-1.jpg",
        "https://example.com/headphones-2.jpg"
    ]
}

### Responses
{
    "success": true,
    "message": "Product updated successfully",
    "product": {
        "_id": "685bec2594c4040773674bbb",
        "title": "Updated Bluetooth Headphones",
        "description": "Noise-cancelling wireless headphones with long battery life.",
        "price": 2499,
        "discountPercentage": 10,
        "rating": 4.5,
        "stock": 30,
        "brand": "Sony",
        "category": "Audio",
        "thumbnail": "https://example.com/headphones-thumb.jpg",
        "images": [
            "https://example.com/headphones-1.jpg",
            "https://example.com/headphones-2.jpg"
        ],
        "createdAt": "2025-06-25T12:31:33.121Z",
        "updatedAt": "2025-06-25T12:32:06.316Z",
        "__v": 0
    }
}

---

## Cart/Create, Cart/Update, Cart/Delete
### Endpoints
- POST /api/v1/cart/cud

### Requests
{
  "productId": "685be7764d1e6052724ce587",
  "qty": 3
}

{
  "productId": "685be7764d1e6052724ce587",
  "qty": 0
}

### Responses
{
    "success": true,
    "message": "Cart updated successfully"
}

{
    "success": true,
    "message": "Product removed. Cart is now empty and deleted."
}

---

## Cart/List
### Endpoints
- POST /api/v1/cart/list

### Requests
/api/v1/cart/list

### Responses
{
    "success": true,
    "message": "User cart API",
    "data": {
        "_id": "685c302d00851d2792f5f407",
        "products": [
            {
                "productId": {
                    "_id": "685be7764d1e6052724ce587",
                    "title": "Wireless Mouse",
                    "description": "A high precision wireless mouse with ergonomic design.",
                    "price": 799,
                    "discountPercentage": 10,
                    "rating": 4.5,
                    "stock": 150,
                    "brand": "Logitech",
                    "category": "Electronics",
                    "thumbnail": "https://example.com/images/wireless-mouse-thumb.jpg",
                    "images": [
                        "https://images.meesho.com/images/products/441901814/pgxak_512.webp",
                        "https://images.meesho.com/images/products/441901814/f5xfb_512.webp"
                    ],
                    "createdAt": "2025-06-25T12:11:34.357Z",
                    "updatedAt": "2025-06-25T12:11:34.357Z",
                    "__v": 0
                },
                "qty": 5,
                "_id": "685c302d00851d2792f5f408"
            },
            {
                "productId": {
                    "_id": "685bec2594c4040773674bbb",
                    "title": "Updated Bluetooth Headphones",
                    "description": "Noise-cancelling wireless headphones with long battery life.",
                    "price": 2499,
                    "discountPercentage": 10,
                    "rating": 4.5,
                    "stock": 30,
                    "brand": "Sony",
                    "category": "Audio",
                    "thumbnail": "https://example.com/headphones-thumb.jpg",
                    "images": [
                        "https://example.com/headphones-1.jpg",
                        "https://example.com/headphones-2.jpg"
                    ],
                    "createdAt": "2025-06-25T12:31:33.121Z",
                    "updatedAt": "2025-06-25T12:32:06.316Z",
                    "__v": 0
                },
                "qty": 1,
                "_id": "685c303700851d2792f5f40d"
            }
        ],
        "userId": "685baf659cdb8da07ccdb0a3",
        "createdAt": "2025-06-25T17:21:49.769Z",
        "updatedAt": "2025-06-25T17:21:59.394Z",
        "__v": 1
    }
}

---

## Coupon/Create
### Endpoints
- POST /api/v1/coupon/create

### Requests
{
    "code": "SAVE20",
    "startDate": "2025-06-25T00:00:00.000Z",
    "endDate": "2025-07-01T00:00:00.000Z",
    "discountPercentage": 20,
    "minOrderValue": 500,
    "maxDiscountValue": 200
}

### Responses
{
    "success": true,
    "message": "Coupon created successfully"
}

---

## Coupon/Update
### Endpoints
- POST /api/v1/coupon/update/:id

### Requests
/api/v1/coupon/update/685c3433cb3969366c30c3ed
{
    "code": "FESTIVE50",
    "startDate": "2025-07-01T00:00:00.000Z",
    "endDate": "2025-07-10T00:00:00.000Z",
    "discountPercentage": 50,
    "minOrderValue": 1000,
    "maxDiscountValue": 300
}

### Responses
{
    "success": true,
    "message": "Coupon updated successfully",
    "data": {
        "_id": "685c3433cb3969366c30c3ed",
        "code": "FESTIVE50",
        "startDate": "2025-07-01T00:00:00.000Z",
        "endDate": "2025-07-10T00:00:00.000Z",
        "discountPercentage": 50,
        "minOrderValue": 1000,
        "maxDiscountValue": 300,
        "__v": 0
    }
}

---

## Coupon/List
### Endpoints
- GET /api/v1/coupon/list

### Requests
/api/v1/coupon/list

### Responses
{
    "success": true,
    "message": "Coupon list",
    "data": [
        {
            "_id": "685c3433cb3969366c30c3ed",
            "code": "FESTIVE50",
            "startDate": "2025-07-01T00:00:00.000Z",
            "endDate": "2025-07-10T00:00:00.000Z",
            "discountPercentage": 50,
            "minOrderValue": 1000,
            "maxDiscountValue": 300,
            "__v": 0
        }
    ]
}

---

## Coupon/Delete
### Endpoints
- POST /api/v1/coupon/delete

### Requests
/api/v1/coupon/delete/685c3433cb3969366c30c3ed

### Responses
{
    "success": true,
    "message": "Coupon deleted successfully",
    "deletedId": "685c3433cb3969366c30c3ed"
}

---

## Order/Place Order
### Endpoints
- POST /api/v1/order/place-order

### Requests
{
    "paymentMode": "COD",
    "coupon": "SAVE20"
}

### Responses
{
    "success": true,
    "message": "Order placed successfully"
}

---

## Order/Cancel Order
### Endpoints
- POST /api/v1/order/cancel-order/:id

### Requests
/api/v1/order/cancel-order/685c40162966df7409e56278

### Responses
{
    "success": true,
    "message": "Order cancelled and stock restored"
}

---

## Wishlist/Add
### Endpoints
- POST /api/v1/wishlist/add

### Requests
{
    "productId": "685bec2594c4040773674bbb"
}

### Responses
{
    "success": true,
    "message": "Product added to wishlist",
    "data": {
        "_id": "685c4a07b32fadf90eb97fc3",
        "userId": "685baf659cdb8da07ccdb0a3",
        "products": [
            "685be7764d1e6052724ce587",
            "685bec2594c4040773674bbb"
        ],
        "createdAt": "2025-06-25T19:12:07.767Z",
        "updatedAt": "2025-06-25T19:13:54.896Z",
        "__v": 1
    }
}

---

## Wishlist/List
### Endpoints
- GET /api/v1/wishlist/list

### Requests
/api/v1/wishlist/list

### Responses
{
    "success": true,
    "data": {
        "_id": "685c4a07b32fadf90eb97fc3",
        "userId": "685baf659cdb8da07ccdb0a3",
        "products": [
            {
                "_id": "685be7764d1e6052724ce587",
                "title": "Wireless Mouse",
                "description": "A high precision wireless mouse with ergonomic design.",
                "price": 799,
                "discountPercentage": 10,
                "rating": 4.5,
                "stock": 150,
                "brand": "Logitech",
                "category": "Electronics",
                "thumbnail": "https://example.com/images/wireless-mouse-thumb.jpg",
                "images": [
                    "https://images.meesho.com/images/products/441901814/pgxak_512.webp",
                    "https://images.meesho.com/images/products/441901814/f5xfb_512.webp"
                ],
                "createdAt": "2025-06-25T12:11:34.357Z",
                "updatedAt": "2025-06-25T18:35:37.114Z",
                "__v": 0
            },
            {
                "_id": "685bec2594c4040773674bbb",
                "title": "Updated Bluetooth Headphones",
                "description": "Noise-cancelling wireless headphones with long battery life.",
                "price": 2499,
                "discountPercentage": 10,
                "rating": 4.5,
                "stock": 30,
                "brand": "Sony",
                "category": "Audio",
                "thumbnail": "https://example.com/headphones-thumb.jpg",
                "images": [
                    "https://example.com/headphones-1.jpg",
                    "https://example.com/headphones-2.jpg"
                ],
                "createdAt": "2025-06-25T12:31:33.121Z",
                "updatedAt": "2025-06-25T18:35:37.157Z",
                "__v": 0
            }
        ],
        "createdAt": "2025-06-25T19:12:07.767Z",
        "updatedAt": "2025-06-25T19:13:54.896Z",
        "__v": 1
    }
}

---

## Wishlist/Remove
### Endpoints
- POST /api/v1/remove/:productId

### Requests
{{base_url}}/api/v1/wishlist/remove/685bec2594c4040773674bbb

### Responses
{
    "success": true,
    "message": "Product removed from wishlist",
    "data": {
        "_id": "685c4a07b32fadf90eb97fc3",
        "userId": "685baf659cdb8da07ccdb0a3",
        "products": [
            "685be7764d1e6052724ce587"
        ],
        "createdAt": "2025-06-25T19:12:07.767Z",
        "updatedAt": "2025-06-25T19:35:43.488Z",
        "__v": 2
    }
}

---

## Wishlist/Clear
### Endpoints
- POST /api/v1/wishlist/clear

### Requests
/api/v1/wishlist/clear

### Responses
{
    "success": true,
    "message": "Wishlist cleared"
}

---
---

## Blog/Create-Update
### Endpoints
- POST /api/v1/blog/create-update

### Requests
{
  "productId": "685be7764d1e6052724ce587",
  "rating": 4,
  "comment": "Excellent product!"
}

### Responses
{
    "success": true,
    "message": "Review added",
    "data": {
        "userId": "685baf659cdb8da07ccdb0a3",
        "productId": "685be7764d1e6052724ce587",
        "rating": 4,
        "comment": "Excellent product!",
        "_id": "685c567cc064c4ca254c5d2e",
        "createdAt": "2025-06-25T20:05:16.371Z",
        "updatedAt": "2025-06-25T20:05:16.371Z",
        "__v": 0
    }
}

---

## Blog/List
### Endpoints
- GET /api/v1/blog/list/:productId

### Requests
/api/v1/blog/list/685be7764d1e6052724ce587

### Responses
{
    "success": true,
    "data": [
        {
            "_id": "685c567cc064c4ca254c5d2e",
            "userId": {
                "_id": "685baf659cdb8da07ccdb0a3"
            },
            "productId": "685be7764d1e6052724ce587",
            "rating": 4,
            "comment": "Excellent product!",
            "createdAt": "2025-06-25T20:05:16.371Z",
            "updatedAt": "2025-06-25T20:05:16.371Z",
            "__v": 0
        }
    ]
}

---

## Blog/Delete
### Endpoints
- POST /api/v1/blog/delete/:id

### Requests
/api/v1/blog/delete/685c567cc064c4ca254c5d2e

### Responses
{
    "success": true,
    "message": "Review deleted"
}

---