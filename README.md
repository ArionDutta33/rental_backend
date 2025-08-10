# 2EasyRent

2EasyRent is a house rental platform where users can register as **hosts** to list their homes or as **guests** to browse and book houses. The platform offers seamless user experience with role-based authentication, fast pagination using Redis, and media management via Cloudinary.

---

## Features

- **User Roles:** Hosts can list and manage their homes; guests can browse and book houses.
- **House Listings:** Hosts can create, update, and delete property listings with images.
- **Booking System:** Guests can book houses for specified dates with availability checks.
- **Role-Based Authentication:** Secure access control with JWT-based role authorization.
- **Pagination with Redis:** Efficient and scalable pagination for large listings.
- **Image Uploads:** House images handled and optimized via Cloudinary.
- **Notifications:** Email confirmations and updates (todo).
- **Responsive UI:** Works well on desktop and mobile devices.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Caching & Pagination:** Redis
- **Authentication:** JWT with Role-Based Access Control
- **Image Storage:** Cloudinary
- **Deployment:** Docker (todo)

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB instance (local or cloud)
- Redis server running


### Installation

```bash
git clone https://github.com/yourusername/2easyrent.git
cd 2easyrent
npm install
